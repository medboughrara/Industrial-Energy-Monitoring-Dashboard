export default function Assets() {
  return (
    <main className="flex-1 md:ml-[260px] flex h-[calc(100vh-64px)] overflow-hidden bg-[#282A3A]">
      {/* Asset Grid List */}
      <div className="flex-1 overflow-y-auto p-container-margin border-r border-white/10">
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
          {/* Asset Card 1: Active */}
          <div className="bg-[#323546] border border-[#BBAB8C] rounded-lg p-sm cursor-pointer hover:bg-white/5 transition-colors group">
            <div className="flex gap-sm">
              <div className="w-20 h-20 bg-[#282A3A] rounded border border-white/10 overflow-hidden flex-shrink-0">
                <img alt="Gas Turbine Alpha" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdMTNE8NJz9n-QXeezA5sOZQSdV73i6WxxV_Yed2_7fymzcvLh-X_70AHNRKbmXCuYG9nDyqfKS0HvPEkxgjkKwBqcqyJQwTOWed8GEKPHaU-NNp9EFadSf_n8yjxgfAazcgqTKIu76CAOlimuQZ15F6Ly026hqn43nhN_iphNjCjQGDzNqD3hpDY-gOl6FxjBu1_s3sbM7ASMDf_Y6WY0lpXge3r6eOm22O6WmKrBapA6_zqauIfWOFfChbQl9mA4GyuAxWF8eCs"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-h2 text-h2 text-on-surface truncate">TRB-01 Alpha</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary-container text-on-primary-container border border-primary-container/20">Active</span>
                </div>
                <p className="text-label-sm font-label-sm text-outline-variant mt-1">Heavy Duty Gas Turbine</p>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">Efficiency</div>
                    <div className="font-kpi-value text-xl text-[#BBAB8C]">94.2%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">Last Maint.</div>
                    <div className="font-data-tabular text-data-tabular text-on-surface-variant">2023-10-12</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Asset Card 2: Warning */}
          <div className="bg-[#323546] border border-white/10 rounded-lg p-sm cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex gap-sm">
              <div className="w-20 h-20 bg-[#282A3A] rounded border border-white/10 overflow-hidden flex-shrink-0">
                <img alt="Main Transformer" className="w-full h-full object-cover grayscale opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyaskIChbqzaF_gUngwzbLbU6cy4vzjOui9_6diDI-SFb-Tf2lGWoUwjWeQJmXXSfrBjhLSk7lmxh00lQjc3PJnvlOv3O3YniMAQ4ojWFdmgdmHH_qdGLDYkZUzk9E2BpxVvMf6Yp_mHvXKb9ppabsvq26vSupKUS-WZLZSm5Pcfh4HWmF7I_jmvotMEqBi_ymgoX2mQecBeU6SugyfJz17ehszsFvedXsDB9etJyv64U5IBfNAp_1Hjpmn0YlrWeJ-qgtW0MeDtg"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-h2 text-h2 text-on-surface truncate">XFM-Main-South</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#d3c4b3]/10 text-[#d3c4b3] border border-[#d3c4b3]/20">Warning</span>
                </div>
                <p className="text-label-sm font-label-sm text-outline-variant mt-1">Step-up Transformer</p>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">Efficiency</div>
                    <div className="font-kpi-value text-xl text-[#d3c4b3]">88.7%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">Last Maint.</div>
                    <div className="font-data-tabular text-data-tabular text-on-surface-variant">2023-08-05</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Asset Card 3: Down */}
          <div className="bg-[#323546] border border-error/30 rounded-lg p-sm cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex gap-sm">
              <div className="w-20 h-20 bg-[#282A3A] rounded border border-white/10 overflow-hidden flex-shrink-0 relative">
                <div className="absolute inset-0 bg-error/20 z-10 mix-blend-overlay"></div>
                <img alt="Solar Array Block B" className="w-full h-full object-cover grayscale opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGUIQE0GnSxjtDwzRYazpKKKSStedPm7GfZ0-3HrHuLPhCW3SWq1qQsIAxaHbd2BmmX22QRkaI2y6E2Ce_3ODIHcPZ-n88aR8Ll3SZ_7sXpKdqivyloP4rxtb7KJ2suVefVKD4742CaN5mvg5whG_6zqDjQ9s0VtSbutE-1CJzBkWCvsOY5va-V7Xma3tT3lR6Nr8aLwUfaP-oFoNjcafAYMltq6cpPzqtbfaLIqnZJ2me100Sq810r1IGMtEvxwm9cxxUlUhQyNk"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-h2 text-h2 text-error truncate">SLR-Array-B</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-error/10 text-error border border-error/20">Down</span>
                </div>
                <p className="text-label-sm font-label-sm text-outline-variant mt-1">Photovoltaic Block</p>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">Efficiency</div>
                    <div className="font-kpi-value text-xl text-error">0.0%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">Last Maint.</div>
                    <div className="font-data-tabular text-data-tabular text-on-surface-variant">2023-11-01</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Asset Card 4: Active */}
          <div className="bg-[#323546] border border-white/10 rounded-lg p-sm cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex gap-sm">
              <div className="w-20 h-20 bg-[#282A3A] rounded border border-white/10 overflow-hidden flex-shrink-0">
                <img alt="Cooling Tower 1" className="w-full h-full object-cover grayscale opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdd8UZOq3OMSq8bBmK67tU-pQcggJ-_07ziyEv9Y9xTpFztZFGhonj_8ZIzQHgzjpbscX-vDrlEV0jkWs6uG1ca15SWlMU5AkPb9WTSWgGVXFlhE0lRaprcRLvDqJDfo2_TA4ofp-BxPPh41Z7VIaTYuBhAthPvSZITAKEhchdDWyJBS-nFiBdCKbxSqlSfdbHwUXjNRGhClwWvEcYrF9dqYSfgDkTPrZUShL2UozyUrGJIuGcTAfGP8rGQkbeOS4AsOt5P3ygKuI"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-h2 text-h2 text-on-surface truncate">CLG-TWR-01</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary-container/10 text-primary-container border border-primary-container/20">Active</span>
                </div>
                <p className="text-label-sm font-label-sm text-outline-variant mt-1">Evaporative Cooling</p>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">Efficiency</div>
                    <div className="font-kpi-value text-xl text-on-surface">91.5%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-outline-variant uppercase tracking-wider mb-1">Last Maint.</div>
                    <div className="font-data-tabular text-data-tabular text-on-surface-variant">2023-09-15</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Detail Sidebar (Right) */}
      <aside className="w-[360px] bg-[#323546] border-l border-white/10 flex flex-col h-full overflow-hidden shrink-0">
        <div className="p-container-margin border-b border-white/10 shrink-0">
          <div className="flex justify-between items-start mb-4">
            <div className="w-16 h-16 bg-[#282A3A] rounded border border-[#BBAB8C] overflow-hidden">
              <img alt="Gas Turbine Alpha Detail" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxTOEq9d-C_HRAKv8XIFzucBo8DXhzZOJE6Kzh18YKnvWE1VQbDyLTyRBmmRWTITud0YVMVFshIKZht2LlKEbYRM7nooynPW8xwar7jL1-0F55iFqP2Z5NaFPrxnXA-YzzdJgoKxavTOXdIa03j5K_Lhw5kGiGjxEKXXahN4JoUK-v-EVn3vl4TzUbetfE_gn_6oYYCohJX9DDXfVfFNmARI_tnX3qYygT2xEJ64dIhFqsgvbb7pHoY8S8J4ogB7nfgrGYM1hkzL0"/>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 text-outline-variant hover:text-on-surface transition-colors" title="Edit Asset">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
              <button className="p-1.5 text-outline-variant hover:text-on-surface transition-colors" title="Close Details">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>
          <h2 className="font-h1 text-h1 text-on-surface mb-1">TRB-01 Alpha</h2>
          <p className="font-body-md text-body-md text-outline-variant">Heavy Duty Gas Turbine</p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-[#BBAB8C]/10 border border-[#BBAB8C]/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#BBAB8C]"></span>
            <span className="font-label-sm text-label-sm text-[#BBAB8C] uppercase tracking-widest">Operational</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-container-margin space-y-lg">
          {/* KPI Bento Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#282A3A] p-3 rounded border border-white/5 flex flex-col justify-center">
              <span className="font-label-sm text-label-sm text-outline-variant uppercase mb-1">Output Power</span>
              <span className="font-kpi-value text-kpi-value text-on-surface">124<span className="text-sm text-outline-variant ml-1">MW</span></span>
            </div>
            <div className="bg-[#BBAB8C] p-3 rounded border border-[#BBAB8C] flex flex-col justify-center">
              <span className="font-label-sm text-label-sm text-[#282A3A] uppercase mb-1">Efficiency</span>
              <span className="font-kpi-value text-kpi-value text-[#282A3A]">94.2<span className="text-sm opacity-70 ml-1">%</span></span>
            </div>
            <div className="bg-[#282A3A] p-3 rounded border border-white/5 flex flex-col justify-center">
              <span className="font-label-sm text-label-sm text-outline-variant uppercase mb-1">Rotor Speed</span>
              <span className="font-kpi-value text-xl text-on-surface">3,600<span className="text-xs text-outline-variant ml-1">RPM</span></span>
            </div>
            <div className="bg-[#282A3A] p-3 rounded border border-white/5 flex flex-col justify-center">
              <span className="font-label-sm text-label-sm text-outline-variant uppercase mb-1">Exhaust Temp</span>
              <span className="font-kpi-value text-xl text-on-surface">540<span className="text-xs text-outline-variant ml-1">°C</span></span>
            </div>
          </div>
          {/* Telemetry Chart Placeholder */}
          <div>
            <div className="flex justify-between items-center mb-sm">
              <h4 className="font-label-sm text-label-sm text-outline-variant uppercase tracking-wider">Vibration Telemetry</h4>
              <span className="text-[10px] text-[#BBAB8C]">Live</span>
            </div>
            <div className="h-24 bg-[#282A3A] rounded border border-white/5 relative overflow-hidden flex items-end p-2">
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#776B5D]/20 to-transparent"></div>
              <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,80 L10,75 L20,85 L30,60 L40,65 L50,40 L60,55 L70,30 L80,45 L90,20 L100,35" fill="none" stroke="#776B5D" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
              </svg>
            </div>
          </div>
          {/* Properties Table */}
          <div>
            <h4 className="font-label-sm text-label-sm text-outline-variant uppercase tracking-wider mb-sm">Asset Specifications</h4>
            <div className="bg-[#282A3A] border border-white/5 rounded divide-y divide-white/5">
              <div className="flex justify-between py-2 px-3">
                <span className="font-body-md text-sm text-outline-variant">Manufacturer</span>
                <span className="font-data-tabular text-sm text-on-surface">General Energy Corp</span>
              </div>
              <div className="flex justify-between py-2 px-3">
                <span className="font-body-md text-sm text-outline-variant">Install Date</span>
                <span className="font-data-tabular text-sm text-on-surface">2018-04-22</span>
              </div>
              <div className="flex justify-between py-2 px-3">
                <span className="font-body-md text-sm text-outline-variant">Location</span>
                <span className="font-data-tabular text-sm text-on-surface">Zone B, Bay 4</span>
              </div>
              <div className="flex justify-between py-2 px-3">
                <span className="font-body-md text-sm text-outline-variant">Firmware</span>
                <span className="font-data-tabular text-sm text-on-surface">v4.2.1-stable</span>
              </div>
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
