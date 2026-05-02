import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ComposedChart
} from 'recharts';
import { AlertTriangle, Zap, Wind, Percent, Factory } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_BACKEND_URL || 'ws://localhost:8000/ws/stream';
    
    let ws;
    let reconnectInterval;

    const connect = () => {
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setIsConnected(true);
        console.log('Connected to WebSocket');
      };

      ws.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        
        if (payload.error) {
          console.error('WebSocket Error:', payload.error);
          return;
        }

        // Update main data array
        setData(prevData => {
          const newData = [...prevData, payload];
          // Keep only the last 30 data points as requested
          if (newData.length > 30) {
            newData.shift();
          }
          return newData;
        });

        // Handle anomalies
        if (payload.anomaly) {
          setAnomalies(prev => {
            const newAnomalies = [{
              id: Date.now(),
              timestamp: payload.timestamp,
              message: `Anomaly detected! Gas Flow: ${payload.gas_flow.toFixed(2)}, Net Power: ${payload.net_power.toFixed(2)}, Efficiency: ${payload.efficiency.toFixed(2)}%`
            }, ...prev];
            // Keep last 50 anomalies max to prevent memory issues
            return newAnomalies.slice(0, 50);
          });
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        console.log('WebSocket disconnected. Reconnecting in 3s...');
        reconnectInterval = setTimeout(connect, 3000);
      };

      ws.onerror = (err) => {
        console.error('WebSocket encountered error: ', err, 'Closing socket');
        ws.close();
      };
    };

    connect();

    return () => {
      clearTimeout(reconnectInterval);
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const currentData = data.length > 0 ? data[data.length - 1] : null;

  return (
    <main className="flex-1 md:ml-[260px] p-container-margin overflow-y-auto bg-[#282A3A]">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-xs">Real-time Data</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Live telemetry from Plant Alpha-7</p>
        </div>
        <div className="flex items-center gap-2 bg-[#1E1F29] px-4 py-2 rounded-full border border-white/10">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-sm font-medium text-white/90 uppercase tracking-wider">
            {isConnected ? 'Live' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard 
          title="Net Power" 
          value={currentData?.net_power?.toFixed(2) || '0.00'} 
          unit="kW"
          icon={<Zap className="w-6 h-6 text-[#282A3A]" />}
        />
        <KpiCard 
          title="Gas Flow" 
          value={currentData?.gas_flow?.toFixed(2) || '0.00'} 
          unit="Nm³/h"
          icon={<Wind className="w-6 h-6 text-[#282A3A]" />}
        />
        <KpiCard 
          title="Efficiency" 
          value={currentData?.efficiency?.toFixed(2) || '0.00'} 
          unit="%"
          icon={<Percent className="w-6 h-6 text-[#282A3A]" />}
        />
        <KpiCard 
          title="CO2 Emissions" 
          value={currentData?.co2?.toFixed(2) || '0.00'} 
          unit="kg/h"
          icon={<AlertTriangle className="w-6 h-6 text-[#282A3A]" />}
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-[#323546] rounded-xl p-6 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            Historical Trace (Last 30 periods)
          </h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#776B5D" opacity={0.3} />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="#776B5D" 
                  tickFormatter={(val) => {
                    const d = new Date(val);
                    return isNaN(d) ? val.split(' ')[1] || val : `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
                  }}
                />
                <YAxis yAxisId="left" stroke="#BBAB8C" />
                <YAxis yAxisId="right" orientation="right" stroke="#776B5D" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#282A3A', border: '1px solid #776B5D', color: '#fff' }}
                  itemStyle={{ color: '#BBAB8C' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="net_power" 
                  name="Net Power (kW)" 
                  stroke="#BBAB8C" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#282A3A', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="gas_flow" 
                  name="Gas Flow (Nm³/h)" 
                  stroke="#776B5D" 
                  strokeWidth={3}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Anomaly Log Section */}
        <div className="bg-[#323546] rounded-xl p-6 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)] flex flex-col h-[400px]">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2 shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Anomaly Log
          </h2>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {anomalies.length === 0 ? (
              <div className="text-muted text-center py-8">
                No anomalies detected yet.
              </div>
            ) : (
              anomalies.map((anomaly) => (
                <div 
                  key={anomaly.id} 
                  className="p-4 rounded-lg bg-red-900/20 border border-red-500/30 text-sm"
                >
                  <div className="text-red-400 font-mono text-xs mb-1">
                    {anomaly.timestamp}
                  </div>
                  <div className="text-white/90">
                    {anomaly.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function KpiCard({ title, value, unit, icon }) {
  return (
    <div className="bg-[#BBAB8C] rounded-xl p-6 flex items-center justify-between shadow-lg transform transition-transform hover:scale-105 duration-300">
      <div>
        <p className="text-[#282A3A]/70 font-bold text-sm uppercase tracking-wider mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-[#282A3A]">{value}</span>
          <span className="text-[#282A3A]/80 font-semibold">{unit}</span>
        </div>
      </div>
      <div className="bg-white/30 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
}
