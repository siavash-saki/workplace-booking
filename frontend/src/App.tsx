import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import WorkplaceListPage from './pages/WorkplaceListPage';
import FloorplanPage from './pages/FloorplanPage';
import BookingPage from './pages/BookingPage';
import { useAppStore } from './store';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = useAppStore((s) => s.user);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default function App() {
  const user = useAppStore((s) => s.user);
  const loadWorkplaces = useAppStore((s) => s.loadWorkplaces);
  const loadBookings = useAppStore((s) => s.loadBookings);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadWorkplaces();
      loadBookings();
    }
  }, [user, loadWorkplaces, loadBookings]);

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workplaces"
            element={
              <ProtectedRoute>
                <WorkplaceListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/floorplan"
            element={
              <ProtectedRoute>
                <FloorplanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}
