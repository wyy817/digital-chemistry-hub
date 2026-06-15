import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import Layout from '../../components/Layout'
import QuickCheck from '../../components/quiz/QuickCheck'
import { Ch1MolecularShapeContent, ch1MolecularShapeMeta } from '../../content/ch1-molecular-shape'
import { ch13QuickCheck } from '../../content/ch1-molecular-shape-quiz'

const PAGE_ID = 'ch1-3-molecular-shape'

function applyHighlight(container, searchText, annotationId) {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null)
  let node
  while ((node = walker.nextNode())) {
    const idx = node.textContent.indexOf(searchText)
    if (idx !== -1 && node.parentElement?.classList?.contains('annotation-highlight') === false) {
      try {
        const range = document.createRange()
        range.setStart(node, idx)
        range.setEnd(node, idx + searchText.length)
        const span = document.createElement('span')
        span.className = 'annotation-highlight'
        span.dataset.annotationId = annotationId
        range.surroundContents(span)
        return true
      } catch {
        return false
      }
    }
  }
  return false
}

export default function MolecularShape() {
  const { user } = useAuth()
  const contentRef = useRef(null)
  const [annotations, setAnnotations] = useState([])
  const [progress, setProgress] = useState({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)

  const [toolbar, setToolbar] = useState(null)
  const [inputBox, setInputBox] = useState(null)
  const [inputNote, setInputNote] = useState('')

  useEffect(() => {
    if (!user) return
    Promise.all([
      supabase.from('annotations').select('*').eq('user_id', user.id).eq('page_id', PAGE_ID).order('created_at'),
      supabase.from('progress').select('*').eq('user_id', user.id),
    ]).then(([{ data: annData }, { data: progData }]) => {
      if (annData) setAnnotations(annData)
      if (progData) {
        const map = {}
        progData.forEach(p => { map[p.lesson_id] = p })
        setProgress(map)
        setIsCompleted(map[PAGE_ID]?.status === 'completed')
      }
    })
  }, [user])

  useEffect(() => {
    if (!contentRef.current || annotations.length === 0) return
    const timer = setTimeout(() => {
      contentRef.current.querySelectorAll('.annotation-highlight').forEach(el => {
        const parent = el.parentNode
        while (el.firstChild) parent.insertBefore(el.firstChild, el)
        parent.removeChild(el)
      })
      annotations.forEach(ann => {
        applyHighlight(contentRef.current, ann.selected_text, ann.id)
      })
    }, 50)
    return () => clearTimeout(timer)
  }, [annotations])

  useEffect(() => {
    const container = contentRef.current
    if (!container) return
    const handler = (e) => {
      const highlight = e.target.closest('.annotation-highlight')
      if (!highlight) return
      const id = highlight.dataset.annotationId
      document.querySelectorAll('.annotation-highlight').forEach(el => el.classList.remove('active'))
      highlight.classList.add('active')
      document.querySelector(`.annotation-item[data-annotation-id="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    container.addEventListener('click', handler)
    return () => container.removeEventListener('click', handler)
  }, [])

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) return
    const text = selection.toString().trim()
    if (!text || text.length < 3) return
    if (!contentRef.current?.contains(selection.anchorNode)) return
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    setInputBox(null)
    setToolbar({
      x: rect.left + rect.width / 2,
      y: rect.top - 10 + window.scrollY,
      text,
      range: range.cloneRange(),
    })
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.annotation-toolbar') && !e.target.closest('.annotation-input-box')) {
        setToolbar(null)
        setInputBox(null)
        setInputNote('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function openInputBox() {
    if (!toolbar) return
    setInputBox({ x: toolbar.x, y: toolbar.y, text: toolbar.text, range: toolbar.range })
    setToolbar(null)
    setInputNote('')
  }

  async function saveAnnotation() {
    if (!inputBox || !user || !inputNote.trim()) return
    const { data, error } = await supabase.from('annotations').insert({
      user_id: user.id,
      page_id: PAGE_ID,
      selected_text: inputBox.text,
      note: inputNote.trim(),
      color: 'yellow',
      container_id: 'content-main',
    }).select().single()

    if (!error && data) {
      setAnnotations(prev => [...prev, data])
      try {
        const span = document.createElement('span')
        span.className = 'annotation-highlight'
        span.dataset.annotationId = data.id
        inputBox.range.surroundContents(span)
      } catch {
        // Range invalid; will re-apply via effect
      }
      window.getSelection()?.removeAllRanges()
    }
    setInputBox(null)
    setInputNote('')
  }

  async function deleteAnnotation(id) {
    await supabase.from('annotations').delete().eq('id', id)
    setAnnotations(prev => prev.filter(a => a.id !== id))
    contentRef.current?.querySelectorAll(`[data-annotation-id="${id}"]`).forEach(el => {
      const parent = el.parentNode
      while (el.firstChild) parent.insertBefore(el.firstChild, el)
      parent.removeChild(el)
    })
  }

  async function updateAnnotation(id, newNote) {
    await supabase.from('annotations').update({ note: newNote }).eq('id', id)
    setAnnotations(prev => prev.map(a => a.id === id ? { ...a, note: newNote } : a))
  }

  async function markComplete() {
    if (!user) return
    await supabase.from('progress').upsert({
      user_id: user.id,
      lesson_id: PAGE_ID,
      status: 'completed',
      completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' })
    setIsCompleted(true)
    setProgress(p => ({ ...p, [PAGE_ID]: { status: 'completed' } }))
  }

  const meta = ch1MolecularShapeMeta

  return (
    <Layout
      progress={progress}
      annotations={annotations}
      onDeleteAnnotation={deleteAnnotation}
      onUpdateAnnotation={updateAnnotation}
      showAnnotations
    >
      <nav className="breadcrumb">
        <Link to="/">Dashboard</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Chemistry Fundamentals</span>
        <span className="breadcrumb-sep">›</span>
        <span>Ch1. Atoms & Chemical Bonds</span>
        <span className="breadcrumb-sep">›</span>
        <span style={{ color: 'var(--color-text)' }}>{meta.titleZh}</span>
      </nav>

      <div className="page-header">
        <h1 className="page-title">{meta.title}</h1>
        <p className="page-subtitle">{meta.titleZh}</p>
        <div className="page-meta">
          <span className="page-meta-item">⏱ 约 {meta.estimatedMinutes} 分钟</span>
          <span className="difficulty-badge">{meta.difficulty}</span>
          {isCompleted && <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 500 }}>✅ 已完成</span>}
        </div>
      </div>

      <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-border)', paddingLeft: '0.75rem' }}>
        💡 选中页面中的文字可以添加批注，批注会保存在右侧面板中。
      </p>

      <div id="content-main" ref={contentRef} onMouseUp={handleMouseUp}>
        <Ch1MolecularShapeContent />
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '1rem',
        }}>
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
            ✏️ Quick Check
          </h2>
          {!showQuiz && (
            <button
              onClick={() => setShowQuiz(true)}
              style={{
                padding: '0.4rem 1rem', background: '#eff6ff', color: 'var(--color-primary)',
                border: '1px solid #bfdbfe', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem',
              }}
            >
              开始测试 →
            </button>
          )}
        </div>
        {showQuiz && (
          <QuickCheck
            quiz={ch13QuickCheck}
            onComplete={({ passed }) => { if (passed) setIsCompleted(true) }}
          />
        )}
      </div>

      <div className="lesson-nav">
        <div>
          {meta.prev && (
            <Link to={meta.prev.path} className="lesson-nav-btn">
              ← {meta.prev.title}
            </Link>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            className={`mark-complete-btn ${isCompleted ? 'done' : ''}`}
            onClick={markComplete}
            disabled={isCompleted}
          >
            {isCompleted ? '✅ 已完成' : '标记完成'}
          </button>
          {meta.next && (
            <Link to={meta.next.path} className="lesson-nav-btn" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
              {meta.next.title} →
            </Link>
          )}
        </div>
      </div>

      {toolbar && (
        <div
          className="annotation-toolbar"
          style={{ left: toolbar.x, top: toolbar.y }}
        >
          <button className="toolbar-btn primary" onClick={openInputBox}>✏️ 添加批注</button>
          <button className="toolbar-btn" onClick={() => { navigator.clipboard.writeText(toolbar.text); setToolbar(null) }}>复制</button>
          <button className="toolbar-btn" onClick={() => setToolbar(null)}>✕</button>
        </div>
      )}

      {inputBox && (
        <div
          className="annotation-input-box"
          style={{ left: inputBox.x, top: inputBox.y + 30 }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontStyle: 'italic' }}>
            "{inputBox.text.slice(0, 60)}{inputBox.text.length > 60 ? '…' : ''}"
          </div>
          <textarea
            autoFocus
            rows={3}
            placeholder="写下你的批注…"
            value={inputNote}
            onChange={e => setInputNote(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) saveAnnotation() }}
          />
          <div className="annotation-input-actions">
            <button className="input-btn" onClick={() => { setInputBox(null); setInputNote('') }}>取消</button>
            <button className="input-btn confirm" onClick={saveAnnotation} disabled={!inputNote.trim()}>
              保存 (Ctrl+↵)
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}
