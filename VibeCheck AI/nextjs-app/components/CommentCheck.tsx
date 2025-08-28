'use client'
import React, { useState } from 'react'

type Sentiment = { label: 'Positive' | 'Negative' | 'Neutral'; score: number }

export default function CommentCheck() {
  const [comment, setComment] = useState('')
  const [result, setResult] = useState<Sentiment | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setResult(null)

    if (!comment.trim()) {
      setResult({ label: 'Neutral', score: 0 })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: comment }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Analysis failed')
      setResult(data as Sentiment)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-6rem] h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute right-[-4rem] bottom-[-4rem] h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-center">
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-4xl">
          Comment Sentiment Checker
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white/75">
          Paste a comment and analyze whether it’s positive, negative, or neutral—great for
          community managers and brands.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-10 w-full max-w-3xl">
          <label htmlFor="comment" className="sr-only">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type or paste your comment here..."
            rows={7}
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 text-sm sm:text-sm text-white placeholder-white/40  placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[180px] sm:min-h-[220px] resize-y"
          />
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-white/50">{comment.length} chars</span>
            <button
              type="submit"
              disabled={!comment.trim() || loading}
              className="rounded-full bg-lime-400 px-6 py-3 text-sm sm:text-base font-semibold text-black shadow-sm transition-colors hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing…' : 'Analyze'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-sm text-rose-300">{error}</div>
        )}

        {result && (
          <div className="mt-6 flex items-center justify-center" aria-live="polite">
            <span
              className={[
                'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset',
                result.label === 'Positive'
                  ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-400/30'
                  : result.label === 'Negative'
                  ? 'bg-rose-500/10 text-rose-400 ring-rose-400/30'
                  : 'bg-amber-500/10 text-amber-300 ring-amber-400/30',
              ].join(' ')}
            >
              {result.label} {Number.isFinite(result.score) ? `• ${Math.round(result.score * 100)}%` : ''}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}