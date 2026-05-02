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
        
        processed_data = []
        for index, row in df.iterrows():
            # Use index as a mock timestamp if no time col is present, or just current time
            timestamp = str(datetime.now())
            
            # Requested features
            input_energy_kw = float(row.get("feature_input_energy_kw", 0))
            output_energy_kw = float(row.get("feature_output_energy_kw", 0))
            energy_delta_kw = float(row.get("feature_energy_delta_kw", 0))
            total_efficiency_pct = float(row.get("feature_total_efficiency_pct", 0))
            anomaly = bool(row.get("anomalie", 0))
            
            # Specific raw data columns requested
            gas_flow = float(row.get("Consommation gaz | Débit du gaz naturel moteur en Nm3/h", 0))
            net_power = float(row.get("Energie Moteur | Puissance électrique Brute en KW", 0))
            hw_power = float(row.get("Energymeter eau chaude récupéré | Puissance en KW", 0))
            cw_power = float(row.get("Energymeter eau glacée | Puissance en KW", 0))
            
            processed_data.append({
                "timestamp": str(timestamp),
                "feature_input_energy_kw": input_energy_kw,
                "feature_output_energy_kw": output_energy_kw,
                "feature_energy_delta_kw": energy_delta_kw,
                "feature_total_efficiency_pct": total_efficiency_pct,
                "anomaly": anomaly,
                "gas_flow": gas_flow,
                "net_power": net_power,
                "hw_power": hw_power,
                "cw_power": cw_power
            })
            
        return processed_data
    except Exception as e:
        logger.error(f"Error reading CSV: {e}")
        return []

data_cache = process_data("anomaly_detection_results.csv")

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
                
            payload = dict(data_cache[index % len(data_cache)])
            # Update the timestamp to the CURRENT time of sending
            payload["timestamp"] = str(datetime.now())
            
            await websocket.send_json(payload)
            
            index += 1
            # Small time delay between sending values
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        logger.info("Client disconnected")
    except Exception as e:
        logger.error(f"Websocket error: {e}")
