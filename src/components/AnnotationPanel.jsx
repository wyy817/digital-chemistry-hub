import { useState } from 'react'

export default function AnnotationPanel({ annotations, onDelete, onUpdate, collapsed, onToggle }) {
  const [editingId, setEditingId] = useState(null)
  const [editNote, setEditNote] = useState('')

  function startEdit(ann) {
    setEditingId(ann.id)
    setEditNote(ann.note)
  }

  async function saveEdit(ann) {
    await onUpdate(ann.id, editNote)
    setEditingId(null)
  }

  return (
    <aside className={`annotation-panel ${collapsed ? 'collapsed' : ''}`}>
      <div className="annotation-panel-header">
        <span className="annotation-panel-title">
          {!collapsed && <>批注 <span className="annotation-count">{annotations.length}</span></>}
        </span>
        <button className="annotation-toggle-btn" onClick={onToggle} title={collapsed ? '展开批注栏' : '收起批注栏'}>
          {collapsed ? '◀' : '▶'}
        </button>
      </div>

      {!collapsed && (
        <div className="annotation-list">
          {annotations.length === 0 ? (
            <div className="annotation-empty">
              <div className="annotation-empty-icon">✏️</div>
              <p>选中文字后点击"添加批注"</p>
            </div>
          ) : (
            annotations.map(ann => (
              <div key={ann.id} className="annotation-item" data-annotation-id={ann.id}>
                <div className="annotation-quote">"{ann.selected_text}"</div>
                {editingId === ann.id ? (
                  <div className="annotation-edit">
                    <textarea
                      className="annotation-textarea"
                      value={editNote}
                      onChange={e => setEditNote(e.target.value)}
                      rows={3}
                      autoFocus
                    />
                    <div className="annotation-edit-actions">
                      <button className="ann-btn save" onClick={() => saveEdit(ann)}>保存</button>
                      <button className="ann-btn cancel" onClick={() => setEditingId(null)}>取消</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="annotation-note">{ann.note}</div>
                    <div className="annotation-meta">
                      <span className="annotation-time">
                        {new Date(ann.created_at).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <div className="annotation-actions">
                        <button className="ann-btn edit" onClick={() => startEdit(ann)}>编辑</button>
                        <button className="ann-btn delete" onClick={() => onDelete(ann.id)}>删除</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </aside>
  )
}
