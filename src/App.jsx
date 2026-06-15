import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AtomicStructure from './pages/learn/AtomicStructure'
import ChemicalBonds from './pages/learn/ChemicalBonds'
import MolecularShape from './pages/learn/MolecularShape'
import FunctionalGroups from './pages/learn/FunctionalGroups'
import Smiles from './pages/learn/Smiles'
import MolecularProperties from './pages/learn/MolecularProperties'
import DrugDiscoveryPipeline from './pages/learn/DrugDiscoveryPipeline'
import ReactionMechanisms from './pages/learn/ReactionMechanisms'

function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#64748b', fontSize: '0.9rem' }}>
        加载中…
      </div>
    )
  }
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/learn/ch1-atomic-structure" element={<RequireAuth><AtomicStructure /></RequireAuth>} />
      <Route path="/learn/ch1-chemical-bonds" element={<RequireAuth><ChemicalBonds /></RequireAuth>} />
      <Route path="/learn/ch1-molecular-shape" element={<RequireAuth><MolecularShape /></RequireAuth>} />
      <Route path="/learn/ch2-functional-groups" element={<RequireAuth><FunctionalGroups /></RequireAuth>} />
      <Route path="/learn/ch2-smiles" element={<RequireAuth><Smiles /></RequireAuth>} />
      <Route path="/learn/ch3-molecular-properties" element={<RequireAuth><MolecularProperties /></RequireAuth>} />
      <Route path="/learn/ch3-drug-discovery-pipeline" element={<RequireAuth><DrugDiscoveryPipeline /></RequireAuth>} />
      <Route path="/learn/ch3-reaction-mechanisms" element={<RequireAuth><ReactionMechanisms /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}
