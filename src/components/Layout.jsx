import { useState } from 'react'
import Sidebar from './Sidebar'
import AnnotationPanel from './AnnotationPanel'

export default function Layout({ children, progress, annotations, onDeleteAnnotation, onUpdateAnnotation, showAnnotations, wide, initialSidebarCollapsed }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(initialSidebarCollapsed ?? false)
  const [annotationCollapsed, setAnnotationCollapsed] = useState(true)

  return (
    <div className="app-layout">
      <Sidebar
        progress={progress}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(v => !v)}
      />
      <div className="main-area">
        <div className="content-area">
          <div className={`content-scroll${wide ? ' smooth' : ''}`}>
            <div className={`content-inner${wide ? ' wide' : ''}`}>
              {children}
            </div>
          </div>
          {showAnnotations && (
            <AnnotationPanel
              annotations={annotations ?? []}
              onDelete={onDeleteAnnotation}
              onUpdate={onUpdateAnnotation}
              collapsed={annotationCollapsed}
              onToggle={() => setAnnotationCollapsed(v => !v)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
