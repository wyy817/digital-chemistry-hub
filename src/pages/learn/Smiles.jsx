import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import Layout from '../../components/Layout'
import QuickCheck from '../../components/quiz/QuickCheck'
import { Ch2SmilesContent, ch2SmilesMeta } from '../../content/ch2-smiles'
import { ch22QuickCheck } from '../../content/ch2-smiles-quiz'

const PAGE_ID = 'ch2-2-smiles'

const TOC = [
  { id: 's1', label: '2.2.1 从结构到字符串' },
  { id: 's2', label: '2.2.2 SMILES 基础语法' },
  { id: 's3', label: '2.2.3 立体化学与规范 SMILES' },
  { id: 's4', label: '2.2.4 SMARTS：子结构搜索' },
  { id: 's5', label: '2.2.5 InChI 与 InChIKey' },
  { id: 's6', label: '2.2.6 分子指纹' },
]

function applyHighlight(container, searchText, annotationId) {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null)
  let node
  while ((node = walker.nextNode())) {
    const idx = node.textContent.indexOf(searchText)
    if (idx !== -1 && node.parentElement?.classList?.contains('annotation-highlight') === false) {
      try {
        const range = document.createRange()
        range.setStart(node, idx); range.setEnd(node, idx + searchText.length)
        const span = document.createElement('span')
        span.className = 'annotation-highlight'; span.dataset.annotationId = annotationId
        range.surroundContents(span); return true
      } catch { return false }
    }
  }
  return false
}

export default function Smiles() {
  const { user } = useAuth()
  const contentRef = useRef(null)
  const [annotations, setAnnotations] = useState([])
  const [progress, setProgress] = useState({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [activeSection, setActiveSection] = useState('s1')
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
      if (progData) { const map = {}; progData.forEach(p => { map[p.lesson_id] = p }); setProgress(map); setIsCompleted(map[PAGE_ID]?.status === 'completed') }
    })
  }, [user])

  useEffect(() => {
    if (!contentRef.current || annotations.length === 0) return
    const timer = setTimeout(() => {
      contentRef.current.querySelectorAll('.annotation-highlight').forEach(el => { const parent = el.parentNode; while (el.firstChild) parent.insertBefore(el.firstChild, el); parent.removeChild(el) })
      annotations.forEach(ann => applyHighlight(contentRef.current, ann.selected_text, ann.id))
    }, 50)
    return () => clearTimeout(timer)
  }, [annotations])

  useEffect(() => {
    const container = contentRef.current; if (!container) return
    const handler = (e) => {
      const highlight = e.target.closest('.annotation-highlight'); if (!highlight) return
      const id = highlight.dataset.annotationId
      document.querySelectorAll('.annotation-highlight').forEach(el => el.classList.remove('active'))
      highlight.classList.add('active')
      document.querySelector(`.annotation-item[data-annotation-id="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    container.addEventListener('click', handler); return () => container.removeEventListener('click', handler)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    )
    TOC.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) return
    const text = selection.toString().trim()
    if (!text || text.length < 3 || !contentRef.current?.contains(selection.anchorNode)) return
    const range = selection.getRangeAt(0); const rect = range.getBoundingClientRect()
    setInputBox(null); setToolbar({ x: rect.left + rect.width / 2, y: rect.top - 10 + window.scrollY, text, range: range.cloneRange() })
  }, [])

  useEffect(() => {
    const handler = (e) => { if (!e.target.closest('.annotation-toolbar') && !e.target.closest('.annotation-input-box')) { setToolbar(null); setInputBox(null); setInputNote('') } }
    document.addEventListener('mousedown', handler); return () => document.removeEventListener('mousedown', handler)
  }, [])

  function openInputBox() { if (!toolbar) return; setInputBox({ x: toolbar.x, y: toolbar.y, text: toolbar.text, range: toolbar.range }); setToolbar(null); setInputNote('') }

  async function saveAnnotation() {
    if (!inputBox || !user || !inputNote.trim()) return
    const { data, error } = await supabase.from('annotations').insert({ user_id: user.id, page_id: PAGE_ID, selected_text: inputBox.text, note: inputNote.trim(), color: 'yellow', container_id: 'content-main' }).select().single()
    if (!error && data) { setAnnotations(prev => [...prev, data]); try { const span = document.createElement('span'); span.className = 'annotation-highlight'; span.dataset.annotationId = data.id; inputBox.range.surroundContents(span) } catch { }; window.getSelection()?.removeAllRanges() }
    setInputBox(null); setInputNote('')
  }

  async function deleteAnnotation(id) {
    await supabase.from('annotations').delete().eq('id', id)
    setAnnotations(prev => prev.filter(a => a.id !== id))
    contentRef.current?.querySelectorAll(`[data-annotation-id="${id}"]`).forEach(el => { const parent = el.parentNode; while (el.firstChild) parent.insertBefore(el.firstChild, el); parent.removeChild(el) })
  }

  async function updateAnnotation(id, newNote) { await supabase.from('annotations').update({ note: newNote }).eq('id', id); setAnnotations(prev => prev.map(a => a.id === id ? { ...a, note: newNote } : a)) }

  async function markComplete() {
    if (!user) return
    await supabase.from('progress').upsert({ user_id: user.id, lesson_id: PAGE_ID, status: 'completed', completed_at: new Date().toISOString() }, { onConflict: 'user_id,lesson_id' })
    setIsCompleted(true); setProgress(p => ({ ...p, [PAGE_ID]: { status: 'completed' } }))
  }

  const meta = ch2SmilesMeta

  return (
    <Layout progress={progress} annotations={annotations} onDeleteAnnotation={deleteAnnotation} onUpdateAnnotation={updateAnnotation} showAnnotations wide initialSidebarCollapsed>
      <div className="learn-two-col anim-fade-in">
        <div className="learn-content-main">
          <nav className="breadcrumb anim-fade-up anim-delay-1">
            <Link to="/">Dashboard</Link><span className="breadcrumb-sep">›</span><span>Chemistry Fundamentals</span><span className="breadcrumb-sep">›</span><span>Ch2. Organic Chemistry Basics</span><span className="breadcrumb-sep">›</span><span style={{ color: 'var(--color-text)' }}>{meta.titleZh}</span>
          </nav>
          <div className="page-header anim-fade-up anim-delay-2"><h1 className="page-title">{meta.title}</h1><p className="page-subtitle">{meta.titleZh}</p></div>
          <p className="anim-fade-up anim-delay-3" style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem', borderLeft: '3px solid var(--color-border)', paddingLeft: '0.75rem' }}>💡 选中页面中的文字可以添加批注，点击右侧「批注」按钮打开批注面板。</p>
          <div id="content-main" ref={contentRef} onMouseUp={handleMouseUp} className="anim-fade-up anim-delay-4"><Ch2SmilesContent /></div>
          <div style={{ marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>✏️ Quick Check</h2>
              {!showQuiz && <button onClick={() => setShowQuiz(true)} style={{ padding: '0.4rem 1rem', background: '#eff6ff', color: 'var(--color-primary)', border: '1px solid #bfdbfe', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>开始测试 →</button>}
            </div>
            {showQuiz && <QuickCheck quiz={ch22QuickCheck} onComplete={({ passed }) => { if (passed) setIsCompleted(true) }} />}
          </div>
          <div className="lesson-nav">
            <div>{meta.prev && <Link to={meta.prev.path} className="lesson-nav-btn">← {meta.prev.title}</Link>}</div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button className={`mark-complete-btn ${isCompleted ? 'done' : ''}`} onClick={markComplete} disabled={isCompleted}>{isCompleted ? '✅ 已完成' : '标记完成'}</button>
              {meta.next && <Link to={meta.next.path} className="lesson-nav-btn" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>{meta.next.title} →</Link>}
            </div>
          </div>
        </div>
        <div className="learn-aside anim-slide-right anim-delay-2">
          <div className="learn-toc">
            <div className="learn-toc-title">本章目录</div>
            <ul className="learn-toc-list">{TOC.map(sec => <li key={sec.id}><button className={`learn-toc-item ${activeSection === sec.id ? 'active' : ''}`} onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>{sec.label}</button></li>)}</ul>
          </div>
          <div className="learn-meta-card">
            <div className="learn-meta-row"><span>预计时长</span><span className="learn-meta-value">⏱ {meta.estimatedMinutes} min</span></div>
            <div className="learn-meta-row"><span>难度</span><span className="learn-meta-value">{meta.difficulty}</span></div>
            <div className="learn-meta-row"><span>状态</span><span className="learn-meta-value" style={isCompleted ? { color: '#16a34a' } : {}}>{isCompleted ? '✅ 已完成' : '○ 未完成'}</span></div>
          </div>
        </div>
      </div>
      {toolbar && <div className="annotation-toolbar" style={{ left: toolbar.x, top: toolbar.y }}><button className="toolbar-btn primary" onClick={openInputBox}>✏️ 添加批注</button><button className="toolbar-btn" onClick={() => { navigator.clipboard.writeText(toolbar.text); setToolbar(null) }}>复制</button><button className="toolbar-btn" onClick={() => setToolbar(null)}>✕</button></div>}
      {inputBox && <div className="annotation-input-box" style={{ left: inputBox.x, top: inputBox.y + 30 }}><div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontStyle: 'italic' }}>"{inputBox.text.slice(0, 60)}{inputBox.text.length > 60 ? '…' : ''}"</div><textarea autoFocus rows={3} placeholder="写下你的批注…" value={inputNote} onChange={e => setInputNote(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) saveAnnotation() }} /><div className="annotation-input-actions"><button className="input-btn" onClick={() => { setInputBox(null); setInputNote('') }}>取消</button><button className="input-btn confirm" onClick={saveAnnotation} disabled={!inputNote.trim()}>保存 (Ctrl+↵)</button></div></div>}
    </Layout>
  )
}
