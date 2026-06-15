import { useState } from 'react'
import Sidebar from './Sidebar'
import AnnotationPanel from './AnnotationPanel'

export default function Layout({ children, progress, annotations, onDeleteAnnotation, onUpdateAnnotation, showAnnotations }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [annotationCollapsed, setAnnotationCollapsed] = useState(!showAnnotations)

  return (
    <div className="app-layout">
      <Sidebar
        progress={progress}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(v => !v)}
      />
      <div className="main-area">
        <div className="content-area">
          <div className="content-scroll">
            <div className="content-inner">
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
