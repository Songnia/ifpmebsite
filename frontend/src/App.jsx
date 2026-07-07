import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import './components/layout/Navbar.css';
import './components/layout/Footer.css';
import './styles/globals.css';

import ScrollToTop from './components/ui/ScrollToTop';
import ScrollToTopOnNav from './components/ui/ScrollToTopOnNav';
import { ConfigProvider, useConfig } from './context/ConfigContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Lazy-loaded pages — each generates its own JS chunk for faster initial load
const HomePage            = lazy(() => import('./pages/HomePage'));
const FormationsPage      = lazy(() => import('./pages/FormationsPage'));
const FormationDetailPage = lazy(() => import('./pages/FormationDetailPage'));
const ResultatsPage       = lazy(() => import('./pages/ResultatsPage'));
const EvenementsPage      = lazy(() => import('./pages/EvenementsPage'));
const GaleriePage         = lazy(() => import('./pages/GaleriePage'));
const AdmissionTarifsPage = lazy(() => import('./pages/AdmissionTarifsPage'));
const AProposPage         = lazy(() => import('./pages/AProposPage'));
const InscriptionPage     = lazy(() => import('./pages/InscriptionPage'));
const AdminPage           = lazy(() => import('./pages/AdminPage'));
const AdminLoginPage      = lazy(() => import('./pages/AdminLoginPage'));

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, border: '4px solid var(--color-primary-gold)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function NotFound() {
  return (
    <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <h1 style={{ color: 'var(--color-primary-blue)' }}>404 – Page introuvable</h1>
      <a href="/" className="btn btn-primary">Retour à l&apos;accueil</a>
    </main>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

function AppRoutes() {
  const { isLoading } = useConfig();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <BrowserRouter>
      <ScrollToTopOnNav />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes with Navbar/Footer */}
          <Route element={
            <>
              <Navbar />
              <Outlet />
              <ScrollToTop />
              <Footer />
            </>
          }>
            <Route path="/" element={<HomePage />} />
            <Route path="/formations" element={<FormationsPage />} />
            <Route path="/formations/:id" element={<FormationDetailPage />} />
            <Route path="/resultats" element={<ResultatsPage />} />
            <Route path="/evenements" element={<EvenementsPage />} />
            <Route path="/galerie" element={<GaleriePage />} />
            <Route path="/admission" element={<AdmissionTarifsPage />} />
            <Route path="/apropos" element={<AProposPage />} />
            <Route path="/inscription" element={<InscriptionPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Login (public) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Builder */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ConfigProvider>
        <AppRoutes />
      </ConfigProvider>
    </AuthProvider>
  );
}

