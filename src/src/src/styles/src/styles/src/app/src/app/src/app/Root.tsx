import { Outlet, Link, useLocation } from 'react-router';
import { Home, Grid3x3, Droplet, TrendingUp, RefreshCw, BookOpen, Smile, Settings } from 'lucide-react';

export default function Root() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="min-h-screen pb-20 bg-[var(--color-lemon-light)]">
      <Outlet />
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[var(--color-lemon)] shadow-lg">
        <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-2">
          <NavLink to="/" icon={Home} label="Home" active={isActive('/')} />
          <NavLink to="/cards" icon={Grid3x3} label="Cards" active={isActive('/cards')} />
          <NavLink to="/drops" icon={Droplet} label="Drops" active={isActive('/drops')} />
          <NavLink to="/juice" icon={TrendingUp} label="Juice" active={isActive('/juice')} />
          <NavLink to="/squeezes" icon={RefreshCw} label="Habits" active={isActive('/squeezes')} />
          <NavLink to="/library" icon={BookOpen} label="Library" active={isActive('/library')} />
          <NavLink to="/mood" icon={Smile} label="Mood" active={isActive('/mood')} />
          <NavLink to="/settings" icon={Settings} label="Settings" active={isActive('/settings')} />
        </div>
      </nav>
    </div>
  );
}

function NavLink({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center px-2 py-1 rounded-lg transition-colors ${
        active ? 'text-[var(--color-lemon-text)]' : 'text-gray-400'
      }`}
    >
      <Icon size={20} className={active ? 'fill-[var(--color-lemon)]' : ''} />
      <span className="text-[10px] mt-0.5">{label}</span>
    </Link>
  );
}
