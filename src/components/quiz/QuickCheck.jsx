import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export default function QuickCheck({ quiz, onComplete }) {
  const { user } = useAuth()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const question = quiz.questions[current]
  const totalQuestions = quiz.questions.length
  const isMulti = question.type === 'multi'
  const currentAnswer = answers[question.id]

  function toggleOption(idx) {
    if (submitted) return
    if (isMulti) {
      const prev = currentAnswer ?? []
      setAnswers(a => ({
        ...a,
        [question.id]: prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx],
      }))
    } else {
      setAnswers(a => ({ ...a, [question.id]: idx }))
    }
  }

  function isOptionSelected(idx) {
    if (isMulti) return (currentAnswer ?? []).includes(idx)
    return currentAnswer === idx
  }

  function isCorrect(q) {
    if (q.type === 'multi') {
      const ans = answers[q.id] ?? []
      return (
        ans.length === q.correct.length &&
        q.correct.every(i => ans.includes(i))
      )
    }
    return answers[q.id] === q.correct
  }

  async function handleSubmitAll() {
    const scored = quiz.questions.map(q => ({ ...q, userCorrect: isCorrect(q) }))
    const score = scored.filter(q => q.userCorrect).length
    const total = quiz.questions.length
    const pct = Math.round((score / total) * 100)

    setResults({ scored, score, total, pct })
    setSubmitted(true)
    setCurrent(0)

    if (user) {
      await supabase.from('quiz_attempts').insert({
        user_id: user.id,
        quiz_id: quiz.id,
        score,
        total,
        answers: JSON.stringify(answers),
      })
      if (pct >= quiz.passingScore) {
        await supabase.from('progress').upsert({
          user_id: user.id,
          lesson_id: quiz.lessonId,
          status: 'completed',
          quiz_score: pct,
          completed_at: new Date().toISOString(),
        }, { onConflict: 'user_id,lesson_id' })
      }
    }

    onComplete?.({ score, total, pct, passed: pct >= quiz.passingScore })
  }

  function handleRetry() {
    setAnswers({})
    setSubmitted(false)
    setResults(null)
    setCurrent(0)
    setShowExplanation(false)
  }

  if (submitted && results) {
    const q = results.scored[current]
    return (
      <div className="quiz-container">
        {/* Score header */}
        <div className={`quiz-score-header ${results.pct >= quiz.passingScore ? 'pass' : 'fail'}`}>
          <div className="quiz-score-big">{results.pct}%</div>
          <div className="quiz-score-label">
            {results.score}/{results.total} 题正确 ·{' '}
            {results.pct >= quiz.passingScore ? '✅ 通过' : '❌ 未通过（需 ≥' + quiz.passingScore + '%）'}
          </div>
        </div>

        {/* Review questions */}
        <div className="quiz-review-nav">
          {results.scored.map((rq, i) => (
            <button
              key={rq.id}
              onClick={() => { setCurrent(i); setShowExplanation(false) }}
              className={`quiz-nav-dot ${rq.userCorrect ? 'correct' : 'wrong'} ${i === current ? 'active' : ''}`}
              title={`题 ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="quiz-question-block">
          <div className="quiz-question-text">
            <span className="quiz-q-num">Q{current + 1}</span> {q.question}
            {q.type === 'multi' && <span className="quiz-multi-badge">多选</span>}
          </div>
          <div className="quiz-options">
            {q.options.map((opt, i) => {
              const isCorrectOpt = q.type === 'multi' ? q.correct.includes(i) : q.correct === i
              const isUserOpt = q.type === 'multi'
                ? (answers[q.id] ?? []).includes(i)
                : answers[q.id] === i
              return (
                <div key={i} className={`quiz-option review ${isCorrectOpt ? 'correct' : isUserOpt && !isCorrectOpt ? 'wrong-pick' : ''}`}>
                  <span className="quiz-option-marker">{isCorrectOpt ? '✓' : isUserOpt ? '✗' : ''}</span>
                  {opt}
                </div>
              )
            })}
          </div>
          <button className="quiz-explain-btn" onClick={() => setShowExplanation(v => !v)}>
            {showExplanation ? '收起解析' : '查看解析'}
          </button>
          {showExplanation && (
            <div className="quiz-explanation">{q.explanation}</div>
          )}
        </div>

        <div className="quiz-actions">
          <button className="quiz-btn secondary" onClick={handleRetry}>重新作答</button>
          {results.pct >= quiz.passingScore && (
            <span className="quiz-pass-note">🎉 本节已标记为完成</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span className="quiz-title">{quiz.title}</span>
        <span className="quiz-progress">{current + 1} / {totalQuestions}</span>
      </div>

      {/* Progress bar */}
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${((current + 1) / totalQuestions) * 100}%` }} />
      </div>

      <div className="quiz-question-block">
        <div className="quiz-question-text">
          <span className="quiz-q-num">Q{current + 1}</span> {question.question}
          {isMulti && <span className="quiz-multi-badge">多选</span>}
        </div>
        <div className="quiz-options">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => toggleOption(i)}
              className={`quiz-option ${isOptionSelected(i) ? 'selected' : ''}`}
            >
              <span className="quiz-option-letter">{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-nav">
        <button
          className="quiz-btn secondary"
          onClick={() => setCurrent(c => c - 1)}
          disabled={current === 0}
        >
          ← 上一题
        </button>
        {current < totalQuestions - 1 ? (
          <button
            className="quiz-btn primary"
            onClick={() => setCurrent(c => c + 1)}
            disabled={currentAnswer === undefined || currentAnswer === null || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
          >
            下一题 →
          </button>
        ) : (
          <button
            className="quiz-btn primary"
            onClick={handleSubmitAll}
            disabled={Object.keys(answers).length < totalQuestions}
          >
            提交答案
          </button>
        )}
      </div>

      <div className="quiz-dots">
        {quiz.questions.map((_, i) => (
          <span
            key={i}
            className={`quiz-dot ${i === current ? 'current' : answers[quiz.questions[i].id] !== undefined ? 'answered' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
