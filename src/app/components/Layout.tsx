import { Outlet, useLocation, useNavigate } from 'react-router';
import { Home, Sparkles, Users, User } from 'lucide-react';
import { Toaster } from './ui/sonner';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide nav on detail pages
  const hideNav = ['/lemon-card', '/lemon-drops', '/gentle-squeezes', '/lemon-library'].includes(
    location.pathname
  );

  return (
    <div className="relative w-full min-h-screen max-w-md mx-auto" style={{ backgroundColor: 'var(--background)' }}>
      <Toaster position="top-center" />
      
      {/* Main Content */}
      <div className="pb-20">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      {!hideNav && (
        <nav
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md px-6 pb-6"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <div
            className="rounded-3xl px-4 py-3 shadow-lg"
            style={{
              backgroundColor: 'white',
              border: '2px solid var(--border)'
            }}
          >
            <div className="flex items-center justify-around">
              <NavButton
                icon={<Home className="w-6 h-6" />}
                label="Home"
                active={location.pathname === '/'}
                onClick={() => navigate('/')}
              />
              <NavButton
                icon={<Sparkles className="w-6 h-6" />}
                label="Activities"
                active={false}
                onClick={() => navigate('/lemon-card')}
              />
              <NavButton
                icon={<Users className="w-6 h-6" />}
                label="Friends"
                active={location.pathname === '/friends'}
                onClick={() => navigate('/friends')}
              />
              <NavButton
                icon={<User className="w-6 h-6" />}
                label="You"
                active={location.pathname === '/profile'}
                onClick={() => navigate('/profile')}
              />
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        backgroundColor: active ? 'var(--lemon-light)' : 'transparent',
        color: active ? 'var(--tile-blue)' : 'var(--muted-foreground)'
      }}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}
