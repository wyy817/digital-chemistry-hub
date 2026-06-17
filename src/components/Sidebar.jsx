import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const NAV_STRUCTURE = [
  {
    id: 'chemistry-fundamentals',
    label: 'Chemistry Fundamentals',
    labelZh: '化学基础',
    icon: '⚗️',
    chapters: [
      {
        label: 'Ch1. Atoms & Chemical Bonds',
        lessons: [
          { id: 'ch1-1-atomic-structure', label: '1.1 Atomic Structure', path: '/learn/ch1-atomic-structure' },
          { id: 'ch1-2-chemical-bonds', label: '1.2 Chemical Bonds', path: '/learn/ch1-chemical-bonds' },
          { id: 'ch1-3-molecular-shape', label: '1.3 Molecular Shape & Chirality', path: '/learn/ch1-molecular-shape' },
        ],
      },
      {
        label: 'Ch2. Organic Chemistry Basics',
        lessons: [
          { id: 'ch2-1-functional-groups', label: '2.1 Functional Groups', path: '/learn/ch2-functional-groups' },
          { id: 'ch2-2-smiles', label: '2.2 SMILES & Mol. Repr.', path: '/learn/ch2-smiles' },
        ],
      },
      {
        label: 'Ch3. Drug-like Properties',
        lessons: [
          { id: 'ch3-1-molecular-properties', label: '3.1 Molecular Properties & ADMET', path: '/learn/ch3-molecular-properties' },
          { id: 'ch3-2-drug-discovery-pipeline', label: '3.2 Drug Discovery Pipeline', path: '/learn/ch3-drug-discovery-pipeline' },
          { id: 'ch3-3-reaction-mechanisms', label: '3.3 Reaction Mechanisms & Retrosynthesis', path: '/learn/ch3-reaction-mechanisms' },
        ],
      },
    ],
  },
  {
    id: 'cheminformatics',
    label: 'Cheminformatics',
    labelZh: '化学信息学',
    icon: '🔬',
    chapters: [
      {
        label: 'Ch4. RDKit & Cheminformatics',
        lessons: [
          { id: 'ch4-1-rdkit-basics', label: '4.1 RDKit Basics', path: '/learn/ch4-rdkit-basics' },
          { id: 'ch4-2-fingerprints', label: '4.2 Molecular Fingerprints', path: '/learn/ch4-fingerprints' },
          { id: 'ch4-3-qsar', label: '4.3 QSAR Modeling', path: '/learn/ch4-qsar' },
        ],
      },
    ],
  },
  {
    id: 'ai-drug-discovery',
    label: 'AI in Drug Discovery',
    labelZh: 'AI 药物发现',
    icon: '💊',
    chapters: [
      {
        label: 'Ch5. Drug Discovery Pipeline',
        lessons: [
          { id: 'ch5-1-drug-pipeline-overview', label: '5.1 Pipeline Overview', path: '/learn/ch5-drug-pipeline-overview' },
          { id: 'ch5-2-target-identification', label: '5.2 Target Identification', path: '/learn/ch5-target-identification' },
          { id: 'ch5-3-hit-lead-candidate', label: '5.3 Hit / Lead / Candidate', path: '/learn/ch5-hit-lead-candidate' },
        ],
      },
      {
        label: 'Ch6. ADMET & Drug-likeness',
        lessons: [
          { id: 'ch6-1-admet-deep-dive', label: '6.1 ADMET Deep Dive', path: '/learn/ch6-admet-deep-dive' },
        ],
      },
    ],
  },
]

function StatusIcon({ status }) {
  if (status === 'completed') return <span className="lesson-status completed" title="已完成">●</span>
  if (status === 'in_progress') return <span className="lesson-status in-progress" title="学习中">◑</span>
  return <span className="lesson-status" title="未开始">○</span>
}

export default function Sidebar({ progress, collapsed, onToggle }) {
  const location = useLocation()
  const { signOut, user } = useAuth()

  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        {!collapsed && (
          <Link to="/" className="sidebar-logo-text">
            <span className="sidebar-logo-icon">⚗️</span>
            <span>Digital Chemistry</span>
          </Link>
        )}
        <button className="sidebar-toggle" onClick={onToggle} title={collapsed ? '展开导航' : '收起导航'}>
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      {/* Navigation */}
      <div className="sidebar-nav">
        {!collapsed && (
          <Link to="/" className={`sidebar-home-link ${location.pathname === '/' ? 'active' : ''}`}>
            🏠 Dashboard
          </Link>
        )}

        {NAV_STRUCTURE.map(path => (
          <div key={path.id} className="nav-path">
            {!collapsed && (
              <div className={`nav-path-header ${path.comingSoon ? 'muted' : ''}`}>
                <span>{path.icon}</span>
                <span className="nav-path-label">{path.label}</span>
                {path.comingSoon && <span className="coming-soon-badge">即将上线</span>}
              </div>
            )}

            {!path.comingSoon && path.chapters.map((ch, ci) => (
              <div key={ci} className="nav-chapter">
                {!collapsed && (
                  <div className={`nav-chapter-label ${ch.comingSoon ? 'muted' : ''}`}>
                    {ch.label}
                    {ch.comingSoon && <span className="coming-soon-badge">即将上线</span>}
                  </div>
                )}
                {ch.lessons.map(lesson => {
                  const lessonStatus = progress?.[lesson.id]?.status
                  const isActive = location.pathname === lesson.path
                  return (
                    <div key={lesson.id}>
                      {lesson.comingSoon ? (
                        <div className={`nav-lesson muted ${collapsed ? 'collapsed' : ''}`}>
                          {!collapsed && <StatusIcon status={undefined} />}
                          {!collapsed && <span>{lesson.label}</span>}
                          {!collapsed && <span className="coming-soon-badge">即将</span>}
                        </div>
                      ) : (
                        <Link
                          to={lesson.path}
                          className={`nav-lesson ${isActive ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}
                        >
                          <StatusIcon status={lessonStatus} />
                          {!collapsed && <span>{lesson.label}</span>}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* User footer */}
      {!collapsed && user && (
        <div className="sidebar-footer">
          <span className="sidebar-user-email">{user.email}</span>
          <button className="sidebar-signout" onClick={signOut}>退出</button>
        </div>
      )}
    </nav>
  )
}
