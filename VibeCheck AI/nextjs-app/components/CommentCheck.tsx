'use client'

import React, { useMemo, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import CopyButton from './Helper/CopyButton'
import extractHighlights from './Helper/ExtraHighlights'
import HighlightedText from './Helper/HighlightedText'
import countWords from './Helper/CountWords'
import Metric from './Helper/Metrix'
import SkeletonChip from './Helper/SkeletonChip'
import SkeletonMetric from './Helper/SkeletonMetric'
import Spinner from './Helper/Spinner'
import SkeletonLine from './Helper/SkeletonLine'


type Sentiment = { label: 'Positive' | 'Negative' | 'Neutral'; score: number }

export default function CommentCheck() {
  const [comment, setComment] = useState('')
  const [analyzedText, setAnalyzedText] = useState('') 
  const [result, setResult] = useState<Sentiment | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [open, setOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [reportId, setReportId] = useState(0) 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setResult(null)

    const snapshot = comment.trim()
    setAnalyzedText(snapshot)
    setReportId(id => id + 1)
    setOpen(true)

    if (!snapshot) {
      setResult({ label: 'Neutral', score: 0 })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
        body: JSON.stringify({ text: snapshot }),
        cache: 'no-store',
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
              data-aos="fade-right"
              className="rounded-full bg-lime-400 px-6 py-3 text-sm sm:text-base font-semibold text-black shadow-sm transition-colors hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing…' : 'Analyze'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-sm text-rose-300">{error}</div>
        )}
      </div>

      <ReportModal
        key={reportId}
        open={open}
        onClose={() => setOpen(false)}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        inputText={analyzedText}
        result={result}
        loading={loading}
        error={error}
      />
    </section>
  )
}


function ReportModal({
  open,
  onClose,
  isFullscreen,
  setIsFullscreen,
  inputText,
  result,
  loading,
  error,
}: {
  open: boolean
  onClose: () => void
  isFullscreen: boolean
  setIsFullscreen: (v: boolean) => void
  inputText: string
  result: Sentiment | null
  loading: boolean
  error: string | null
}) {
  const reportRef = useRef<HTMLDivElement | null>(null)

  const meta = useMemo(() => {
    if (!result) return null

    const themes = {
      Positive: {
        emoji: '😊',
        badge: 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/30',
        bar: 'from-emerald-400 to-emerald-500',
        border: 'border-emerald-400/20',
      },
      Negative: {
        emoji: '😠',
        badge: 'bg-rose-500/10 text-rose-300 ring-rose-400/30',
        bar: 'from-rose-400 to-rose-500',
        border: 'border-rose-400/20',
      },
      Neutral: {
        emoji: '😐',
        badge: 'bg-amber-500/10 text-amber-300 ring-amber-400/30',
        bar: 'from-amber-300 to-amber-400',
        border: 'border-amber-400/20',
      },
    } as const

    const scorePct = Math.round((result.score ?? 0) * 100)
    const strength = scorePct >= 80 ? 'Strong' : scorePct >= 55 ? 'Moderate' : 'Mild'
    const risk =
      result.label === 'Negative' && scorePct >= 80 ? 'High' :
      result.label === 'Negative' && scorePct >= 55 ? 'Medium' : 'Low'

    const { positives, negatives } = extractHighlights(inputText)

    const suggestions =
      result.label === 'Negative'
        ? [
            'Acknowledge the concern empathetically.',
            'Offer a clear next step or solution (link or contact).',
            'Ask for one clarifying detail to help resolve faster.',
          ]
        : result.label === 'Positive'
        ? [
            'Thank them and reinforce the positive outcome.',
            'Invite them to share a testimonial or review.',
            'Suggest a next action: subscribe, share, or explore a feature.',
          ]
        : [
            'Ask a short follow-up question to learn intent.',
            'Offer a helpful link or quick tip.',
            'Invite feedback on what could be improved.',
          ]

    return {
      theme: themes[result.label],
      scorePct,
      strength,
      risk,
      positives,
      negatives,
      suggestions,
      ts: new Date(),
    }
  }, [result, inputText])

  const handleDownloadPDF = async () => {
    if (!reportRef.current || !result || loading) return
    await new Promise(requestAnimationFrame)
    const el = reportRef.current
    const canvas = await html2canvas(el, { backgroundColor: '#0a0a0a', scale: 2, useCORS: true })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgProps = pdf.getImageProperties(imgData)
    const imgWidth = pageWidth
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width

    let position = 0
    let heightLeft = imgHeight

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(`sentiment-report-${new Date().toISOString().slice(0,19)}.pdf`)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    const el = reportRef.current?.parentElement
    if (!el) return
    if (!document.fullscreenElement && el.requestFullscreen) {
      el.requestFullscreen().catch(() => {})
    } else if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {})
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={[
          'relative mx-auto w-[min(96vw,80rem)] h-[min(92vh,1000px)] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl',
          isFullscreen ? 'w-screen h-screen rounded-none' : '',
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <div className="flex items-center gap-3">
            {result && meta ? (
              <span className={['inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset', meta.theme.badge].join(' ')}>
                {result.label} • {meta.scorePct}%
              </span>
            ) : loading ? (
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ring-white/20 text-white/80">
                <Spinner /> Analyzing…
              </span>
            ) : error ? (
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset bg-rose-500/10 text-rose-300 ring-rose-400/30">
                Error
              </span>
            ) : (
              <span className="text-xs text-white/60">Ready</span>
            )}
            <span className="text-xs text-white/50">
              {result && meta ? `Generated ${meta.ts.toLocaleString()}` : loading ? 'Working...' : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10 disabled:opacity-50"
              disabled={loading}
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10 disabled:opacity-50"
              disabled={loading || !result}
            >
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div ref={reportRef} className="h-[calc(100%-44px)] overflow-auto" aria-busy={loading}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
            {/* Left column */}
            <div className="lg:col-span-7 space-y-6">
              <div className={`rounded-xl border ${result && meta ? meta.theme.border : 'border-white/10'} bg-zinc-950/40 p-5`}>
                <h3 className="mb-2 text-lg font-semibold flex items-center gap-2">
                  {result && meta ? <>Sentiment Summary <span>{meta.theme.emoji}</span></> : 'Sentiment Summary'}
                </h3>

                {!result ? (
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <Spinner /> Model is analyzing your comment…
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-white/80">
                      This comment is classified as <strong>{result.label}</strong> with
                      <strong> {meta?.scorePct}%</strong> confidence. Strength: <strong>{meta?.strength}</strong>. Estimated risk: <strong>{meta?.risk}</strong>.
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                        <span>Confidence</span><span>{meta?.scorePct}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${meta?.theme.bar}`} style={{ width: `${meta?.scorePct ?? 0}%` }} />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Original Comment */}
              <div className={`rounded-xl border ${result && meta ? meta.theme.border : 'border-white/10'} bg-zinc-950/40 p-5`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Original Comment</h3>
                  <CopyButton text={inputText} />
                </div>
                <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-white/90">
                  <HighlightedText text={inputText} />
                </div>
              </div>

              {/* Recommendations */}
              <div className={`rounded-xl border ${result && meta ? meta.theme.border : 'border-white/10'} bg-zinc-950/40 p-5`}>
                <h3 className="text-lg font-semibold">Recommended Actions</h3>
                {!result ? (
                  <div className="mt-3 space-y-2">
                    <SkeletonLine /><SkeletonLine width="70%" /><SkeletonLine width="60%" />
                  </div>
                ) : (
                  <ul className="mt-3 space-y-2 text-sm text-white/80 list-disc pl-5">
                    {meta?.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-5 space-y-6">
              <div className={`rounded-xl border ${result && meta ? meta.theme.border : 'border-white/10'} bg-zinc-950/40 p-5`}>
                <h3 className="text-lg font-semibold">Quick Metrics</h3>
                {!result ? (
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <SkeletonMetric /><SkeletonMetric /><SkeletonMetric /><SkeletonMetric /><SkeletonMetric /><SkeletonMetric />
                  </div>
                ) : (
                  <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <Metric label="Label" value={result.label} />
                    <Metric label="Confidence" value={`${meta?.scorePct}%`} />
                    <Metric label="Strength" value={meta?.strength ?? ''} />
                    <Metric label="Risk" value={meta?.risk ?? ''} />
                    <Metric label="Length" value={`${inputText.length} chars`} />
                    <Metric label="Words" value={`${countWords(inputText)} words`} />
                  </dl>
                )}
              </div>

              <div className={`rounded-xl border ${result && meta ? meta.theme.border : 'border-white/10'} bg-zinc-950/40 p-5`}>
                <h3 className="text-lg font-semibold">Keyword Highlights</h3>
                {!result ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <SkeletonChip /><SkeletonChip /><SkeletonChip />
                  </div>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {extractHighlights(inputText).positives.map((w, i) => (
                      <span key={`p-${i}`} className="text-xs rounded-full bg-emerald-500/10 text-emerald-300 px-2 py-1">+ {w}</span>
                    ))}
                    {extractHighlights(inputText).negatives.map((w, i) => (
                      <span key={`n-${i}`} className="text-xs rounded-full bg-rose-500/10 text-rose-300 px-2 py-1">− {w}</span>
                    ))}
                    {extractHighlights(inputText).positives.length === 0 && extractHighlights(inputText).negatives.length === 0 && (
                      <span className="text-sm text-white/50">No obvious sentiment keywords detected.</span>
                    )}
                  </div>
                )}
              </div>

              <div className={`rounded-xl border ${result && meta ? meta.theme.border : 'border-white/10'} bg-zinc-950/40 p-5`}>
                <h3 className="text-lg font-semibold">Export</h3>
                <p className="mt-2 text-sm text-white/70">
                  Save this analysis as a PDF or copy the JSON result for your logs.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={handleDownloadPDF}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10 disabled:opacity-50"
                    disabled={loading || !result}
                  >
                    Download PDF
                  </button>
                  <CopyButton
                    text={JSON.stringify({ input: inputText, result }, null, 2)}
                    label="Copy JSON"
                  />
                </div>
                {error && !result && (
                  <p className="mt-3 text-sm text-rose-300">Error: {error}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}