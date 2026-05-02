import { useState } from 'react';
import { Wind, Snowflake, Flame, Settings } from 'lucide-react';

const ASSETS = [
  {
    id: 'comp-1',
    name: 'BOGE SF150',
    type: 'Compresseur 1 (Principal)',
    category: 'Air',
    status: 'Active',
    efficiency: '39%',
    lastMaint: '2024-01-10',
    icon: Wind,
    color: '#BBAB8C',
    specs: { Manufacturer: 'BOGE', InstallDate: '2015-05-12', Location: 'Compresseur Room', Firmware: 'v2.1' }
  },
  {
    id: 'comp-2',
    name: 'BOGE S150',
    type: 'Compresseur 2 (Secours)',
    category: 'Air',
    status: 'Warning',
    efficiency: '0%',
    lastMaint: '2023-11-20',
    icon: Wind,
    color: '#d3c4b3',
    specs: { Manufacturer: 'BOGE', InstallDate: '2015-05-12', Location: 'Compresseur Room', Firmware: 'v2.1' }
  },
  {
    id: 'geg-abs',
    name: 'THERMAX TAC L5 E1',
    type: 'GEG ABS TRI (Absorption)',
    category: 'Cooling',
    status: 'Active',
    efficiency: '805.4 kW',
    lastMaint: '2024-02-15',
    icon: Snowflake,
    color: '#BBAB8C',
    specs: { Manufacturer: 'THERMAX', InstallDate: '2023-01-01', Location: 'Zone Alpha', Firmware: 'v5.0' }
  },
  {
    id: 'geg-1',
    name: 'Carrier 30XA0402',
    type: 'GEG1 Alpha',
    category: 'Cooling',
    status: 'Active',
    efficiency: '391 kW',
    lastMaint: '2023-10-05',
    icon: Snowflake,
    color: '#BBAB8C',
    specs: { Manufacturer: 'Carrier', InstallDate: '2017-06-18', Location: 'Zone Alpha', Firmware: 'v3.2' }
  },
  {
    id: 'geg-2',
    name: 'Carrier 30XB0400',
    type: 'GEG1 Beta',
    category: 'Cooling',
    status: 'Active',
    efficiency: '393 kW',
    lastMaint: '2023-12-01',
    icon: Snowflake,
    color: '#BBAB8C',
    specs: { Manufacturer: 'Carrier', InstallDate: '2019-03-22', Location: 'Zone Beta', Firmware: 'v3.4' }
  },
  {
    id: 'chaudiere-1',
    name: 'CHAPPEE XR408',
    type: 'Chaufferie Alpha',
    category: 'Heating',
    status: 'Active',
    efficiency: '348 kW',
    lastMaint: '2023-09-10',
    icon: Flame,
    color: '#BBAB8C',
    specs: { Manufacturer: 'CHAPPEE', InstallDate: '1988-08-01', Location: 'Chaufferie Alpha', Firmware: 'N/A' }
  },
  {
    id: 'chaudiere-2',
    name: 'VIADRUS G700',
    type: 'Chaufferie Beta',
    category: 'Heating',
    status: 'Active',
    efficiency: '400 kW',
    lastMaint: '2024-01-20',
    icon: Flame,
    color: '#BBAB8C',
    specs: { Manufacturer: 'VIADRUS', InstallDate: '2019-11-11', Location: 'Chaufferie Beta', Firmware: 'N/A' }
  }
];

export default function Assets() {
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);

  return (
    <main className="flex-1 md:ml-[260px] flex h-[calc(100vh-64px)] overflow-hidden bg-[#282A3A]">
      {/* Asset Grid List */}
      <div className="flex-1 overflow-y-auto p-container-margin border-r border-white/10 custom-scrollbar">
        <div className="flex justify-between items-center mb-lg">
          <h1 className="font-h1 text-h1 text-on-surface">Asset Registry</h1>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-3 py-1.5 bg-[#323546] border border-white/10 rounded text-sm hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-xs px-3 py-1.5 bg-primary-container text-on-primary-container font-medium rounded text-sm hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-sm">add</span>
              New Asset
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-md">
          {ASSETS.map((asset) => {
            const Icon = asset.icon;
            return (
              <div 
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className={`bg-[#323546] border ${selectedAsset.id === asset.id ? 'border-[#BBAB8C] bg-white/5' : 'border-white/10'} rounded-lg p-sm cursor-pointer hover:bg-white/5 transition-colors group`}
              >
                <div className="flex gap-sm">
                  <div className="w-20 h-20 bg-[#282A3A] rounded border border-white/10 overflow-hidden flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Icon size={40} color={asset.color} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-h2 text-h2 text-on-surface truncate">{asset.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        asset.status === 'Active' 
                          ? 'bg-primary-container/10 text-primary-container border border-primary-container/20' 
                          : 'bg-[#d3c4b3]/10 text-[#d3c4b3] border border-[#d3c4b3]/20'
                      }`}>
                        {asset.status}
                      </span>
                    </div>
                    <p className="text-label-sm font-label-sm text-outline-variant mt-1 truncate">{asset.type}</p>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <div className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">Power/Eff.</div>
                        <div className="font-kpi-value text-xl text-[#BBAB8C]">{asset.efficiency}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">Last Maint.</div>
                        <div className="font-data-tabular text-data-tabular text-on-surface-variant">{asset.lastMaint}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Sidebar (Right) */}
      <aside className="w-[360px] bg-[#323546] border-l border-white/10 flex flex-col h-full overflow-hidden shrink-0">
        <div className="p-container-margin border-b border-white/10 shrink-0">
          <div className="flex justify-between items-start mb-4">
            <div className="w-16 h-16 bg-[#282A3A] rounded border border-[#BBAB8C] overflow-hidden flex items-center justify-center">
              <selectedAsset.icon size={32} color={selectedAsset.color} />
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 text-outline-variant hover:text-on-surface transition-colors" title="Edit Asset">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
          <h2 className="font-h1 text-h1 text-on-surface mb-1">{selectedAsset.name}</h2>
          <p className="font-body-md text-body-md text-outline-variant">{selectedAsset.type}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-[#BBAB8C]/10 border border-[#BBAB8C]/20 rounded-full">
            <span className={`w-2 h-2 rounded-full ${selectedAsset.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
            <span className="font-label-sm text-label-sm text-[#BBAB8C] uppercase tracking-widest">{selectedAsset.status}</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-container-margin space-y-lg custom-scrollbar">
          {/* KPI Bento Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#282A3A] p-3 rounded border border-white/5 flex flex-col justify-center">
              <span className="font-label-sm text-label-sm text-outline-variant uppercase mb-1">Category</span>
              <span className="font-kpi-value text-lg text-on-surface">{selectedAsset.category}</span>
            </div>
            <div className="bg-[#BBAB8C] p-3 rounded border border-[#BBAB8C] flex flex-col justify-center">
              <span className="font-label-sm text-label-sm text-[#282A3A] uppercase mb-1">Efficiency/Power</span>
              <span className="font-kpi-value text-lg text-[#282A3A]">{selectedAsset.efficiency}</span>
            </div>
          </div>
          {/* Properties Table */}
          <div>
            <h4 className="font-label-sm text-label-sm text-outline-variant uppercase tracking-wider mb-sm">Asset Specifications</h4>
            <div className="bg-[#282A3A] border border-white/5 rounded divide-y divide-white/5">
              {Object.entries(selectedAsset.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 px-3">
                  <span className="font-body-md text-sm text-outline-variant">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-data-tabular text-sm text-on-surface truncate ml-2">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-container-margin border-t border-white/10 shrink-0 flex gap-sm">
          <button className="flex-1 bg-transparent border border-[#776B5D] text-[#776B5D] font-medium py-2 rounded text-sm hover:bg-[#776B5D]/10 transition-colors">
            View Logs
          </button>
          <button className="flex-1 bg-primary-container text-[#282A3A] font-medium py-2 rounded text-sm hover:opacity-90 transition-opacity">
            Diagnostics
          </button>
        </div>
      </aside>
    </main>
  );
}
