import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

export default function Navbar() {
  const user = useAppStore((s) => s.user);
  const setUser = useAppStore((s) => s.login);
  const location = useLocation();
  const navigate = useNavigate();
  const clearError = useAppStore((s) => s.clearError);

  const handleLogout = () => {
    useAppStore.setState({ user: null, token: null });
    clearError();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-semibold text-primary">
          Workplace Booking
        </Link>
        {user ? (
          <div className="flex items-center gap-4 text-sm">
            <div className="hidden items-center gap-3 sm:flex">
              <NavLink to="/dashboard" current={location.pathname === '/dashboard'}>
                Dashboard
              </NavLink>
              <NavLink to="/workplaces" current={location.pathname === '/workplaces'}>
                Workplaces
              </NavLink>
              <NavLink to="/floorplan" current={location.pathname === '/floorplan'}>
                Floorplan
              </NavLink>
              <NavLink to="/bookings" current={location.pathname === '/bookings'}>
                Bookings
              </NavLink>
            </div>
            <span className="text-gray-600">Hi, {user}</span>
            <button onClick={handleLogout} className="btn bg-gray-100 text-gray-800 hover:bg-gray-200">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn bg-primary text-white hover:bg-blue-600">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

function NavLink({
  to,
  current,
  children
}: {
  to: string;
  current: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`rounded-md px-3 py-1 text-gray-700 hover:bg-gray-100 ${
        current ? 'bg-gray-100 font-semibold text-primary' : ''
      }`}
    >
      {children}
    </Link>
  );
}
