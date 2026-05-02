export default function Analytics() {
  return (
    <main className="flex-1 md:ml-[260px] p-container-margin overflow-y-auto bg-[#282A3A]">
      {/* Page Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-lg gap-4">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-xs">Advanced Analytics</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Comprehensive breakdown of power usage and demand metrics.</p>
        </div>
        <div className="flex flex-wrap gap-sm">
          {/* Date Range Filter */}
          <div className="flex items-center bg-[#1E1F29] border border-white/10 rounded-DEFAULT px-3 py-2 hover:border-[#BBAB8C] transition-colors relative">
            <span className="material-symbols-outlined text-outline-variant mr-2 text-[18px]" data-icon="calendar_month">calendar_month</span>
            <select className="bg-transparent text-on-surface font-label-sm text-label-sm border-none focus:ring-0 p-0 cursor-pointer appearance-none pr-6">
              <option value="7d">Last 7 Days</option>
              <option value="30d" selected>Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="ytd">Year to Date</option>
            </select>
            <span className="material-symbols-outlined text-outline-variant absolute right-3 pointer-events-none text-[16px]" data-icon="arrow_drop_down">arrow_drop_down</span>
          </div>
          {/* Asset Group Filter */}
          <div className="flex items-center bg-[#1E1F29] border border-white/10 rounded-DEFAULT px-3 py-2 hover:border-[#BBAB8C] transition-colors relative">
            <span className="material-symbols-outlined text-outline-variant mr-2 text-[18px]" data-icon="account_tree">account_tree</span>
            <select className="bg-transparent text-on-surface font-label-sm text-label-sm border-none focus:ring-0 p-0 cursor-pointer appearance-none pr-6">
              <option value="all">All Asset Groups</option>
              <option value="alpha">Sector Alpha</option>
              <option value="beta">Sector Beta</option>
              <option value="gamma">Sector Gamma</option>
            </select>
            <span className="material-symbols-outlined text-outline-variant absolute right-3 pointer-events-none text-[16px]" data-icon="arrow_drop_down">arrow_drop_down</span>
          </div>
          <button className="bg-[#BBAB8C] text-[#282A3A] font-label-sm text-label-sm px-4 py-2 rounded-DEFAULT hover:bg-[#a59577] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]" data-icon="download">download</span>
            Export Report
          </button>
        </div>
      </div>
      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* KPI Row */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-gutter mb-sm">
          {/* KPI Card 1 */}
          <div className="bg-[#BBAB8C] rounded-lg p-md flex flex-col justify-between h-[120px]">
            <span className="font-label-sm text-label-sm text-[#282A3A] uppercase opacity-80">Total Power Draw</span>
            <div className="flex items-baseline gap-2">
              <span className="font-kpi-value text-kpi-value text-[#282A3A]">1,452</span>
              <span className="font-label-sm text-label-sm text-[#282A3A]">MW/h</span>
            </div>
          </div>
          {/* KPI Card 2 */}
          <div className="bg-[#323546] border border-white/10 rounded-lg p-md flex flex-col justify-between h-[120px]">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Peak Demand Limit</span>
            <div className="flex items-baseline gap-2">
              <span className="font-kpi-value text-kpi-value text-primary-container">87.4</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">%</span>
            </div>
          </div>
          {/* KPI Card 3 */}
          <div className="bg-[#323546] border border-white/10 rounded-lg p-md flex flex-col justify-between h-[120px]">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Grid Efficiency</span>
            <div className="flex items-baseline gap-2">
              <span className="font-kpi-value text-kpi-value text-primary-container">94.2</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">%</span>
            </div>
          </div>
          {/* KPI Card 4 */}
          <div className="bg-[#323546] border border-white/10 rounded-lg p-md flex flex-col justify-between h-[120px]">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Anomalies Detected</span>
            <div className="flex items-baseline gap-2">
              <span className="font-kpi-value text-kpi-value text-error">3</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Events</span>
            </div>
          </div>
        </div>
        {/* Main Chart Area */}
        <div className="col-span-12 lg:col-span-8 bg-[#323546] border border-white/10 rounded-lg p-md flex flex-col">
          <div className="flex justify-between items-center mb-md">
            <h2 className="font-h2 text-h2 text-on-surface">Historical Power Usage</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#BBAB8C]"></div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Actual Draw</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#776B5D]"></div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Predicted Baseline</span>
              </div>
            </div>
          </div>
          {/* Faux Chart Area */}
          <div className="flex-1 min-h-[300px] relative w-full flex items-end">
            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-right pr-2 w-12 font-data-tabular text-data-tabular text-on-surface-variant">
              <span>1500</span>
              <span>1000</span>
              <span>500</span>
              <span>0</span>
            </div>
            {/* Grid Lines */}
            <div className="absolute left-12 right-0 top-2 bottom-6 flex flex-col justify-between pointer-events-none">
              <div className="border-t border-white/5 w-full"></div>
              <div className="border-t border-white/5 w-full"></div>
              <div className="border-t border-white/5 w-full"></div>
              <div className="border-t border-white/5 w-full"></div>
            </div>
            {/* Chart Content (Simplified visual representation) */}
            <div className="absolute left-12 right-0 top-2 bottom-6 flex items-end overflow-hidden">
              {/* Background gradient for area chart */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#776B5D]/20 to-transparent bottom-0 h-[60%] w-full clip-path-chart opacity-50"></div>
              {/* SVG for precise lines */}
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                {/* Predicted (Muted Bronze) */}
                <polyline fill="none" points="0,60 10,55 20,65 30,50 40,55 50,40 60,45 70,30 80,40 90,20 100,25" stroke="#776B5D" strokeDasharray="2,2" strokeWidth="1.5"></polyline>
                {/* Actual (Sage-tan) */}
                <polyline fill="none" points="0,65 10,58 20,70 30,52 40,60 50,38 60,48 70,25 80,45 90,15 100,20" stroke="#BBAB8C" strokeWidth="2"></polyline>
              </svg>
            </div>
            {/* X-Axis Labels */}
            <div className="absolute left-12 right-0 bottom-0 flex justify-between font-data-tabular text-data-tabular text-on-surface-variant h-6 items-end">
              <span>00:00</span>
              <span>04:00</span>
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
            </div>
          </div>
        </div>
        {/* Secondary Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          {/* Energy Source Breakdown */}
          <div className="bg-[#323546] border border-white/10 rounded-lg p-md flex-1">
            <h2 className="font-h2 text-h2 text-on-surface mb-md">Energy Source Distribution</h2>
            <div className="flex flex-col gap-4">
              {/* Bar 1 */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-label-sm text-label-sm text-on-surface">Grid Primary</span>
                  <span className="font-data-tabular text-data-tabular text-primary-container">65%</span>
                </div>
                <div className="w-full bg-[#1E1F29] rounded-full h-2">
                  <div className="bg-[#BBAB8C] h-2 rounded-full" style={{width: "65%"}}></div>
                </div>
              </div>
              {/* Bar 2 */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-label-sm text-label-sm text-on-surface">Solar Array</span>
                  <span className="font-data-tabular text-data-tabular text-primary-container">22%</span>
                </div>
                <div className="w-full bg-[#1E1F29] rounded-full h-2">
                  <div className="bg-[#776B5D] h-2 rounded-full" style={{width: "22%"}}></div>
                </div>
              </div>
              {/* Bar 3 */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-label-sm text-label-sm text-on-surface">Backup Turbines</span>
                  <span className="font-data-tabular text-data-tabular text-primary-container">13%</span>
                </div>
                <div className="w-full bg-[#1E1F29] rounded-full h-2">
                  <div className="bg-outline-variant h-2 rounded-full" style={{width: "13%"}}></div>
                </div>
              </div>
            </div>
          </div>
          {/* Peak Demand Scatter/Heatmap simplified */}
          <div className="bg-[#323546] border border-white/10 rounded-lg p-md flex-1 flex flex-col">
            <h2 className="font-h2 text-h2 text-on-surface mb-sm">Peak Demand Density</h2>
            <div className="flex-1 grid grid-cols-4 grid-rows-3 gap-1">
              {/* Heatmap cells (simulated data density) */}
              <div className="bg-[#BBAB8C]/10 rounded-sm"></div>
              <div className="bg-[#BBAB8C]/30 rounded-sm"></div>
              <div className="bg-[#BBAB8C]/80 rounded-sm"></div>
              <div className="bg-[#BBAB8C]/20 rounded-sm"></div>
              <div className="bg-[#BBAB8C]/50 rounded-sm"></div>
              <div className="bg-[#BBAB8C]/90 rounded-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px] text-surface-container" data-icon="warning">warning</span>
              </div>
              <div className="bg-[#BBAB8C]/40 rounded-sm"></div>
              <div className="bg-[#BBAB8C]/10 rounded-sm"></div>
              <div className="bg-[#BBAB8C]/20 rounded-sm"></div>
              <div className="bg-[#BBAB8C]/60 rounded-sm"></div>
              <div className="bg-[#BBAB8C]/30 rounded-sm"></div>
              <div className="bg-[#BBAB8C]/5 rounded-sm"></div>
            </div>
            <div className="flex justify-between mt-2 font-label-sm text-label-sm text-on-surface-variant">
              <span>Low Density</span>
              <span>High Density</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
