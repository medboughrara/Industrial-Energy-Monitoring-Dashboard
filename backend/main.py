import asyncio
import json
import logging
from datetime import datetime

import pandas as pd
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PCI_CONSTANT = 9.082 # thermie/Nm3
THERMIE_TO_KWH = 1.163
CO2_FACTOR = 0.202 # kg CO2

def process_data(file_path: str) -> list:
    try:
        df = pd.read_csv(file_path)
        
        # Clean NaN values
        df = df.fillna(0)
        
        time_col = "Time"
        gas_col = "Débit du gaz naturel moteur en Nm3/h"
        power_col = "Puissance électrique nette"
        
        if gas_col not in df.columns or power_col not in df.columns:
            logger.warning("Expected columns not found in CSV. Using default or index.")
            
        processed_data = []
        for index, row in df.iterrows():
            timestamp = row.get(time_col, str(datetime.now()))
            gas_flow = float(row.get(gas_col, 0))
            net_power = float(row.get(power_col, 0))
            
            # Efficiency (\eta): (Net Power) / (Gas Flow * 9.082 * 1.163) * 100
            energy_input_kwh = gas_flow * PCI_CONSTANT * THERMIE_TO_KWH
            efficiency = (net_power / energy_input_kwh * 100) if energy_input_kwh > 0 else 0
            
            # CO2 Emissions: (Gas Flow * 9.082 * 1.163) * 0.202
            co2 = energy_input_kwh * CO2_FACTOR
            
            anomaly = False
            if gas_flow > 0 and net_power == 0:
                anomaly = True
            elif efficiency < 35 and energy_input_kwh > 0:
                anomaly = True
                
            processed_data.append({
                "timestamp": str(timestamp),
                "net_power": net_power,
                "gas_flow": gas_flow,
                "efficiency": efficiency,
                "co2": co2,
                "anomaly": anomaly
            })
            
        return processed_data
    except Exception as e:
        logger.error(f"Error reading CSV: {e}")
        return []

data_cache = process_data("data.csv")

@app.websocket("/ws/stream")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("Client connected to websocket")
    try:
        index = 0
        while True:
            if not data_cache:
                await websocket.send_json({"error": "No data available in CSV."})
                await asyncio.sleep(2)
                continue
                
            payload = data_cache[index % len(data_cache)]
            await websocket.send_json(payload)
            
            index += 1
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        logger.info("Client disconnected")
    except Exception as e:
        logger.error(f"Websocket error: {e}")
