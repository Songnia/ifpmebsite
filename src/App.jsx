import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import './components/layout/Navbar.css';
import './components/layout/Footer.css';
import './styles/globals.css';

import HomePage from './pages/HomePage';
import FormationsPage from './pages/FormationsPage';
import FormationDetailPage from './pages/FormationDetailPage';
import ResultatsPage from './pages/ResultatsPage';
import EvenementsPage from './pages/EvenementsPage';
import GaleriePage from './pages/GaleriePage';
import AdmissionTarifsPage from './pages/AdmissionTarifsPage';
import AProposPage from './pages/AProposPage';
import CommentCaMarchePage from './pages/CommentCaMarchePage';
import InscriptionPage from './pages/InscriptionPage';

function NotFound() {
  return (
    <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <h1 style={{ color: 'var(--color-primary-blue)' }}>404 – Page introuvable</h1>
      <a href="/" className="btn btn-primary">Retour à l&apos;accueil</a>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/formations" element={<FormationsPage />} />
        <Route path="/formations/:id" element={<FormationDetailPage />} />
        <Route path="/resultats" element={<ResultatsPage />} />
        <Route path="/evenements" element={<EvenementsPage />} />
        <Route path="/galerie" element={<GaleriePage />} />
        <Route path="/admission" element={<AdmissionTarifsPage />} />
        <Route path="/apropos" element={<AProposPage />} />
        <Route path="/comment-ca-marche" element={<CommentCaMarchePage />} />
        <Route path="/inscription" element={<InscriptionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
