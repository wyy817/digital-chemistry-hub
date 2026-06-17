import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
// import Login from './pages/Login'          // 登录页已暂停使用
import MolecularDirectory from './pages/MolecularDirectory'
import AtomicStructure from './pages/learn/AtomicStructure'
import ChemicalBonds from './pages/learn/ChemicalBonds'
import MolecularShape from './pages/learn/MolecularShape'
import FunctionalGroups from './pages/learn/FunctionalGroups'
import Smiles from './pages/learn/Smiles'
import MolecularProperties from './pages/learn/MolecularProperties'
import DrugDiscoveryPipeline from './pages/learn/DrugDiscoveryPipeline'
import ReactionMechanisms from './pages/learn/ReactionMechanisms'
import RdkitBasics from './pages/learn/RdkitBasics'
import Fingerprints from './pages/learn/Fingerprints'
import QsarModeling from './pages/learn/QsarModeling'

function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/" element={<MolecularDirectory />} />
      <Route path="/learn/ch1-atomic-structure" element={<AtomicStructure />} />
      <Route path="/learn/ch1-chemical-bonds" element={<ChemicalBonds />} />
      <Route path="/learn/ch1-molecular-shape" element={<MolecularShape />} />
      <Route path="/learn/ch2-functional-groups" element={<FunctionalGroups />} />
      <Route path="/learn/ch2-smiles" element={<Smiles />} />
      <Route path="/learn/ch3-molecular-properties" element={<MolecularProperties />} />
      <Route path="/learn/ch3-drug-discovery-pipeline" element={<DrugDiscoveryPipeline />} />
      <Route path="/learn/ch3-reaction-mechanisms" element={<ReactionMechanisms />} />
      <Route path="/learn/ch4-rdkit-basics" element={<RdkitBasics />} />
      <Route path="/learn/ch4-fingerprints" element={<Fingerprints />} />
      <Route path="/learn/ch4-qsar" element={<QsarModeling />} />
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
