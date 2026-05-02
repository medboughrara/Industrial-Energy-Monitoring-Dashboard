import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();

  const getNavClass = (path) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return "text-[#BBAB8C] border-b-2 border-[#BBAB8C] pb-4 transition-all h-full flex items-center px-2 pt-4";
    }
    return "text-slate-400 hover:text-slate-200 hover:bg-white/5 cursor-pointer transition-colors duration-200 h-full flex items-center px-2 pb-4 pt-4";
  };

  const getSidebarClass = (path) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return "flex items-center gap-3 px-6 py-4 bg-white/5 text-[#BBAB8C] border-l-4 border-[#BBAB8C] transition-all duration-150 ease-in-out font-['Inter'] text-xs font-medium";
    }
    return "flex items-center gap-3 px-6 py-4 text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-150 ease-in-out font-['Inter'] text-xs font-medium";
  };

  return (
    <div className="font-body-md text-body-md min-h-screen flex flex-col bg-[#282A3A] dark">
      {/* TopAppBar */}
      <header className="fixed left-0 w-full z-50 bg-[#282A3A] dark:bg-[#282A3A] border-b border-white/10 h-16 flex justify-between items-center px-8 transition-colors duration-200">
        <div className="flex items-center gap-8 h-full">
          <span className="font-['Inter'] text-xl font-black tracking-tighter text-[#BBAB8C]">ENERGYCORE INDUSTRIAL</span>
          <nav className="hidden md:flex gap-6 items-end h-full">
            <Link to="/" className={getNavClass("/")}>Dashboard</Link>
            <Link to="/analytics" className={getNavClass("/analytics")}>Analytics</Link>
            <Link to="/assets" className={getNavClass("/assets")}>Assets</Link>
            <Link to="/compliance" className={getNavClass("/compliance")}>Compliance</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-sm">search</span>
            <input className="bg-[#1E1F29] border border-white/10 text-on-surface text-sm rounded focus:border-[#BBAB8C] focus:ring-0 pl-9 pr-3 py-1.5 w-64 transition-colors" placeholder="Search..." type="text"/>
          </div>
          <button className="p-2 text-[#BBAB8C] hover:bg-white/5 cursor-pointer transition-colors duration-200 rounded-DEFAULT">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          </button>
          <button className="p-2 text-[#BBAB8C] hover:bg-white/5 cursor-pointer transition-colors duration-200 rounded-DEFAULT">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
          </button>
          <img alt="Operational Supervisor Profile" className="w-8 h-8 rounded-full border border-white/10 object-cover ml-2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6sZeRWdxsjCOnwbsamgXwC5uPqjmmKoXi91mwlYacazC7WnQdpDBRavl2xl6_p_GhtnC9mRSbZkg61C5naYD_e1aJf8E6I73i3WR824taTjmWzNtLNvLLUhl6BiNlB6RJpfJk5nG7-tSPBVmMnisMhkCsgMQHCSr9LR3X8yMJKRSxWvJvO04W0SGqJmSVzLI8QF2kqud5J9esgnl86qxh8HCIsjg9RwLtP2zsEbqTso7-MsZTyUF2fArkkOGr3wom-rlNqvuouMo"/>
        </div>
      </header>

      <div className="flex flex-1 pt-16 overflow-hidden relative">
        {/* SideNavBar */}
        <aside className="hidden md:flex flex-col w-[260px] fixed left-0 top-16 h-[calc(100vh-64px)] border-r border-white/10 bg-[#323546] dark:bg-[#323546] z-40">
          <div className="p-6 border-b border-white/10 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#1E1F29] rounded-lg border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#BBAB8C]" data-icon="factory">factory</span>
            </div>
            <div>
              <h3 className="font-['Inter'] text-sm font-bold text-[#e7e1dd]">Operations Control</h3>
              <p className="font-['Inter'] text-xs font-medium text-slate-400">Plant Alpha-7</p>
            </div>
          </div>
          <div className="flex-1 py-4 overflow-y-auto">
            <nav className="flex flex-col gap-1">
              <Link to="/" className={getSidebarClass("/")}>
                <span className="material-symbols-outlined">sensors</span>
                Real-time Data
              </Link>
              <Link to="/analytics" className={getSidebarClass("/analytics")}>
                <span className="material-symbols-outlined">history</span>
                Sensor Logs
              </Link>
              <Link to="/assets" className={getSidebarClass("/assets")}>
                <span className="material-symbols-outlined">analytics</span>
                System Health
              </Link>
              <Link to="/compliance" className={getSidebarClass("/compliance")}>
                <span className="material-symbols-outlined">engineering</span>
                Maintenance
              </Link>
            </nav>
          </div>
          <div className="mt-auto border-t border-white/10 py-4">
            <nav className="flex flex-col gap-1">
              <a className="flex items-center gap-3 px-6 py-4 text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-150 ease-in-out font-['Inter'] text-xs font-medium" href="#">
                <span className="material-symbols-outlined">help</span>
                Support
              </a>
              <a className="flex items-center gap-3 px-6 py-4 text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-150 ease-in-out font-['Inter'] text-xs font-medium" href="#">
                <span className="material-symbols-outlined">logout</span>
                Logout
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        {children}
      </div>
    </div>
  );
}
