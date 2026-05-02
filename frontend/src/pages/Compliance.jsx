export default function Compliance() {
  return (
    <main className="flex-1 md:ml-[260px] p-container-margin bg-background min-h-[calc(100vh-64px)] overflow-y-auto">
      {/* Page Header */}
      <div className="mb-lg flex justify-between items-end">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-xs">Regulatory Compliance Tracker</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Monitoring environmental standards and safety protocols for Plant Alpha-7.</p>
        </div>
        <button className="bg-primary-container text-on-primary-container px-4 py-2 rounded font-label-sm text-label-sm flex items-center gap-2 hover:bg-primary-fixed transition-colors border border-primary-container">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export Full Report
        </button>
      </div>
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Compliance Score Gauge Card */}
        <div className="lg:col-span-4 bg-[#323546] rounded-lg border border-white/10 p-md flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-start mb-lg">
            <h2 className="font-h2 text-h2 text-on-surface">Overall Compliance</h2>
            <span className="material-symbols-outlined text-outline">verified_user</span>
          </div>
          <div className="relative flex justify-center items-center py-xl">
            {/* Simulated SVG Gauge */}
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="none" r="45" stroke="#282A3A" strokeDasharray="283" strokeDashoffset="0" strokeWidth="10"></circle>
              <circle className="transition-all duration-1000 ease-out" cx="50" cy="50" fill="none" r="45" stroke="#BBAB8C" strokeDasharray="283" strokeDashoffset="22" strokeLinecap="round" strokeWidth="10"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <span className="font-display-md text-display-md text-primary-container">92<span className="text-h2">%</span></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Status: Optimal</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-xs mt-auto">
            <div className="bg-[#282A3A] p-sm rounded border border-white/5">
              <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Environmental</div>
              <div className="font-h2 text-h2 text-primary-container">95%</div>
            </div>
            <div className="bg-[#282A3A] p-sm rounded border border-white/5">
              <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Safety Protocols</div>
              <div className="font-h2 text-h2 text-primary-container">88%</div>
            </div>
          </div>
        </div>
        {/* Upcoming Audits */}
        <div className="lg:col-span-8 bg-[#323546] rounded-lg border border-white/10 p-md shadow-[0_4px_24px_rgba(0,0,0,0.2)] flex flex-col">
          <div className="flex justify-between items-center mb-md pb-xs border-b border-white/10">
            <h2 className="font-h2 text-h2 text-on-surface">Upcoming Audits</h2>
            <a className="font-label-sm text-label-sm text-primary-container hover:text-primary transition-colors flex items-center gap-1" href="#">View Schedule <span className="material-symbols-outlined text-[16px]">arrow_forward</span></a>
          </div>
          <div className="flex flex-col gap-sm flex-1 overflow-y-auto">
            {/* Audit Item */}
            <div className="flex items-center justify-between p-sm bg-[#282A3A] rounded border border-white/5 hover:border-primary-container/30 transition-colors">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded bg-surface-container-high border border-outline-variant flex items-center justify-center flex-shrink-0">
                  <span className="font-h2 text-h2 text-on-surface">14</span>
                </div>
                <div>
                  <div className="font-body-md text-body-md text-on-surface font-semibold mb-0.5">EPA Emissions Certification</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">event</span> Oct 14, 2023
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="material-symbols-outlined text-[14px]">location_on</span> Sector 4 Cooling Towers
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-secondary-container/50 text-secondary border border-secondary/20 font-label-sm text-label-sm">In 3 Days</span>
            </div>
            {/* Audit Item */}
            <div className="flex items-center justify-between p-sm bg-[#282A3A] rounded border border-white/5 hover:border-primary-container/30 transition-colors">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded bg-surface-container-high border border-outline-variant flex items-center justify-center flex-shrink-0">
                  <span className="font-h2 text-h2 text-on-surface">22</span>
                </div>
                <div>
                  <div className="font-body-md text-body-md text-on-surface font-semibold mb-0.5">OSHA General Industry Safety</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">event</span> Oct 22, 2023
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="material-symbols-outlined text-[14px]">groups</span> Plant-wide
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-surface-container-high text-on-surface-variant border border-outline-variant font-label-sm text-label-sm">Preparation</span>
            </div>
            {/* Audit Item */}
            <div className="flex items-center justify-between p-sm bg-[#282A3A] rounded border border-white/5 hover:border-primary-container/30 transition-colors">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded bg-surface-container-high border border-outline-variant flex items-center justify-center flex-shrink-0">
                  <span className="font-h2 text-h2 text-on-surface">05</span>
                </div>
                <div>
                  <div className="font-body-md text-body-md text-on-surface font-semibold mb-0.5">Internal Waste Management Review</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">event</span> Nov 05, 2023
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="material-symbols-outlined text-[14px]">recycling</span> Treatment Facility B
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-surface-container-high text-on-surface-variant border border-outline-variant font-label-sm text-label-sm">Scheduled</span>
            </div>
          </div>
        </div>
        {/* Regulatory Checklist Bento Box */}
        <div className="lg:col-span-12 bg-[#323546] rounded-lg border border-white/10 p-md mt-sm shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          <div className="mb-md flex justify-between items-center pb-xs border-b border-white/10">
            <h2 className="font-h2 text-h2 text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container">rule</span>
              Q4 Regulatory Requirements Checklist
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {/* Compliant Item */}
            <div className="bg-[#282A3A] p-md rounded border border-l-4 border-l-[#776B5D] border-y-white/5 border-r-white/5 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[64px] text-primary-container">water_drop</span>
              </div>
              <div className="flex items-start justify-between mb-sm relative z-10">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-surface-container text-outline">Environmental</span>
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-[#BBAB8C]">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span> Compliant
                </span>
              </div>
              <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-2 relative z-10">Effluent Discharge Limits</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-4 relative z-10 line-clamp-2">Monthly water quality testing meets all ISO 14001 standards for heavy metal concentrations.</p>
              <div className="mt-auto pt-sm border-t border-white/5 font-label-sm text-label-sm text-outline flex justify-between relative z-10">
                <span>Last Checked: Sep 30</span>
                <span>ID: ENV-401</span>
              </div>
            </div>
            {/* Pending Item */}
            <div className="bg-[#282A3A] p-md rounded border border-l-4 border-l-[#d3c4b3] border-y-white/5 border-r-white/5 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[64px] text-secondary">engineering</span>
              </div>
              <div className="flex items-start justify-between mb-sm relative z-10">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-surface-container text-outline">Safety</span>
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-secondary">
                  <span className="material-symbols-outlined text-[16px]">pending</span> Pending
                </span>
              </div>
              <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-2 relative z-10">Crane Load Testing Certification</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-4 relative z-10 line-clamp-2">Annual load testing for Zone A overhead cranes. Contractor scheduled for next week.</p>
              <div className="mt-auto pt-sm border-t border-white/5 font-label-sm text-label-sm text-outline flex justify-between relative z-10">
                <span>Due: Oct 15</span>
                <span>ID: SAF-112</span>
              </div>
            </div>
            {/* Action Required Item */}
            <div className="bg-[#282A3A] p-md rounded border border-l-4 border-l-[#E63946] border-y-white/5 border-r-white/5 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[64px] text-[#E63946]">warning</span>
              </div>
              <div className="flex items-start justify-between mb-sm relative z-10">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-surface-container text-outline">Equipment</span>
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-[#E63946]">
                  <span className="material-symbols-outlined text-[16px]">error</span> Action Required
                </span>
              </div>
              <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-2 relative z-10">Pressure Valve Recalibration</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-4 relative z-10 line-clamp-2">3 valves in Secondary Coolant loop showing 2% deviation from baseline. Requires immediate recalibration.</p>
              <div className="mt-auto pt-sm border-t border-white/5 font-label-sm text-label-sm text-outline flex justify-between relative z-10">
                <span className="text-[#E63946]">Overdue by 2 days</span>
                <span>ID: MNT-890</span>
              </div>
            </div>
          </div>
        </div>
        {/* Recent Inspections Table */}
        <div className="lg:col-span-12 bg-[#323546] rounded-lg border border-white/10 mt-sm shadow-[0_4px_24px_rgba(0,0,0,0.2)] overflow-hidden">
          <div className="p-md border-b border-white/10 flex justify-between items-center bg-[#282A3A]">
            <h2 className="font-h2 text-h2 text-on-surface">Recent Safety Inspections</h2>
            <div className="flex gap-2">
              <button className="p-1.5 rounded border border-outline-variant text-outline hover:text-on-surface hover:border-primary-container transition-colors"><span className="material-symbols-outlined text-[18px]">filter_list</span></button>
              <button className="p-1.5 rounded border border-outline-variant text-outline hover:text-on-surface hover:border-primary-container transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#282A3A]/50 border-b border-white/10">
                  <th className="p-sm font-label-sm text-label-sm text-outline uppercase tracking-wider pl-md">Date</th>
                  <th className="p-sm font-label-sm text-label-sm text-outline uppercase tracking-wider">Inspection Type</th>
                  <th className="p-sm font-label-sm text-label-sm text-outline uppercase tracking-wider">Inspector</th>
                  <th className="p-sm font-label-sm text-label-sm text-outline uppercase tracking-wider">Result</th>
                  <th className="p-sm font-label-sm text-label-sm text-outline uppercase tracking-wider pr-md text-right">Report</th>
                </tr>
              </thead>
              <tbody className="font-data-tabular text-data-tabular text-on-surface-variant divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-sm pl-md">2023-09-28</td>
                  <td className="p-sm text-on-surface">Fire Suppression Systems</td>
                  <td className="p-sm">J. Mitchell (External)</td>
                  <td className="p-sm"><span className="inline-flex items-center gap-1 text-[#BBAB8C]"><span className="w-2 h-2 rounded-full bg-[#BBAB8C]"></span> Pass</span></td>
                  <td className="p-sm pr-md text-right">
                    <button className="text-primary-container hover:text-primary transition-colors flex items-center justify-end w-full gap-1">
                      <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                      <span className="sr-only">Download PDF</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-sm pl-md">2023-09-15</td>
                  <td className="p-sm text-on-surface">Hazardous Material Storage</td>
                  <td className="p-sm">S. Rahman (Internal)</td>
                  <td className="p-sm"><span className="inline-flex items-center gap-1 text-secondary"><span className="w-2 h-2 rounded-full bg-secondary"></span> Pass w/ Notes</span></td>
                  <td className="p-sm pr-md text-right">
                    <button className="text-primary-container hover:text-primary transition-colors flex items-center justify-end w-full gap-1">
                      <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-sm pl-md">2023-08-30</td>
                  <td className="p-sm text-on-surface">High-Voltage Gear Zone C</td>
                  <td className="p-sm">T. Vance (Internal)</td>
                  <td className="p-sm"><span className="inline-flex items-center gap-1 text-[#BBAB8C]"><span className="w-2 h-2 rounded-full bg-[#BBAB8C]"></span> Pass</span></td>
                  <td className="p-sm pr-md text-right">
                    <button className="text-primary-container hover:text-primary transition-colors flex items-center justify-end w-full gap-1">
                      <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-sm pl-md">2023-08-12</td>
                  <td className="p-sm text-on-surface">Emergency Walkways &amp; Exits</td>
                  <td className="p-sm">L. Chen (Internal)</td>
                  <td className="p-sm"><span className="inline-flex items-center gap-1 text-[#BBAB8C]"><span className="w-2 h-2 rounded-full bg-[#BBAB8C]"></span> Pass</span></td>
                  <td className="p-sm pr-md text-right">
                    <button className="text-primary-container hover:text-primary transition-colors flex items-center justify-end w-full gap-1">
                      <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
