# Industrial Energy Monitoring Dashboard

A real-time industrial energy monitoring dashboard built with **FastAPI**, **React (Vite)**, **Tailwind CSS**, and **Recharts**. This system simulates high-frequency data streams from gas-powered engines, calculates efficiency and emissions metrics in real-time, and provides an interactive visual interface with anomaly detection, along with comprehensive analytics, asset management, and compliance tracking.

## 🚀 Quick Start

Ensure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   git clone https://github.com/medboughrara/Industrial-Energy-Monitoring-Dashboard.git
   cd Industrial-Energy-Monitoring-Dashboard
   ```
2. **Launch the stack**:
   ```bash
   docker-compose up --build
   ```
3. **Access the Dashboard**:
   - **Frontend UI**: [http://localhost:5173](http://localhost:5173)
   - **Backend API**: [http://localhost:8000](http://localhost:8000)
   - **WebSocket Stream**: `ws://localhost:8000/ws/stream`

---

## 🛠 Tech Stack

- **Backend**: FastAPI (Python 3.11), Pandas, WebSockets
- **Frontend**: React 18, Vite, React Router DOM, Tailwind CSS (w/ Container Queries & Forms)
- **Data Visualization**: Recharts
- **Infrastructure**: Docker & Docker Compose
- **Typography & Icons**: Inter Font, Material Symbols Outlined, Lucide React

---

## 📊 Features

### 1. Multi-Page Architecture
- **Real-Time Dashboard**: Live telemetry streams showing KPIs and real-time historical traces.
- **Advanced Analytics**: Comprehensive breakdown of power usage, energy source distribution, and peak demand mapping.
- **Asset Registry**: View and manage industrial assets like gas turbines, transformers, and solar arrays.
- **Regulatory Compliance**: Tracking system for environmental standards, safety protocols, and audit scheduling.

### 2. Real-time Streaming
The backend simulates a live engine data stream by iterating through a horizontally pivoted CSV (`data.csv`). It emits updates every 2 seconds via WebSockets.

### 3. Live Calculations
For every data point, the system calculates:
- **Efficiency ($\eta$)**: Based on Net Power vs. Gas Flow energy input.
- **CO2 Emissions**: Calculated using thermal constants (PCI 9.082 thermie/Nm³).

### 4. Anomaly Detection
The system automatically flags anomalies in the stream:
- **Low Efficiency**: Flags if efficiency drops below 35% while the engine is running.
- **Idle Power**: Flags if gas is flowing but net power output is zero.

### 5. Premium UI/UX
- **Dark Mode Architecture**: Built on a `#282A3A` (Dark Charcoal) and `#151311` foundation.
- **KPI Row**: Instant visibility of Net Power, Gas Flow, Efficiency, and CO2.
- **Historical Trace**: A moving-window line chart showing the last 30 data points.
- **Live Logging**: A dedicated anomaly log for critical system events.

---

## 📂 Project Structure

```text
.
├── backend/
│   ├── Dockerfile
│   ├── main.py            # FastAPI & WebSocket logic
│   ├── requirements.txt
│   └── data.csv           # Source time-series data
├── dashboard_front/       # Original Static HTML Mockups
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components (Layout, etc.)
│   │   ├── pages/         # React Views (Dashboard, Analytics, Assets, Compliance)
│   │   ├── App.jsx        # Routing root
│   │   ├── index.css      # Tailwind & Global styles
│   │   └── main.jsx       # Entry point
│   ├── Dockerfile
│   ├── package.json
│   └── tailwind.config.js # Custom design system tokens
└── docker-compose.yml
```

---

## 🧪 Data Context & Math

The dashboard uses the following constants for industrial calculations:
- **PCI Constant**: 9.082 thermie/Nm³
- **Conversion**: 1 thermie = 1.163 kWh
- **CO2 Factor**: 0.202 kg CO2 / kWh

**Efficiency Formula**:
$$\eta = \frac{Net Power (kW)}{Gas Flow (Nm^3/h) \times 9.082 \times 1.163} \times 100$$

---

## 🎨 Design System

| Element | Color Code | Description |
| :--- | :--- | :--- |
| **Background** | `#282A3A` / `#151311` | Dark Charcoal / Deep Surface |
| **Accents** | `#BBAB8C` | Sage/Tan (Cards & Highlights) |
| **Secondary** | `#776B5D` | Muted Bronze (Charts & Lines) |
| **Text** | `#e7e1dd` / `#F8F9FA` | Off-white (Text & Icons) |

---

## 📝 License

Distributed under the MIT License.
