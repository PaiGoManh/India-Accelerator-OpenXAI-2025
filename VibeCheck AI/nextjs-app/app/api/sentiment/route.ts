import { NextRequest, NextResponse } from 'next/server'

type Sentiment = { label: 'Positive' | 'Negative' | 'Neutral'; score: number }

export async function POST(req: NextRequest) {
  try {
    const { text } = (await req.json()) as { text?: string }

    if (!text || !text.trim()) {
      return NextResponse.json<Sentiment>({ label: 'Neutral', score: 0 })
    }

    const base = process.env.OLLAMA_BASE || 'http://localhost:11434'
    const model = process.env.OLLAMA_MODEL || 'phi3:latest'

    const prompt = buildPrompt(text)

    const response = await fetch(`${base}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        options: { temperature: 0 },
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`Ollama error ${response.status}: ${errText}`)
    }

    const data = await response.json()
    const content: string = data?.response ?? ''

    const parsed = safeParseJSON(content)
    const normalized = normalizeSentiment(parsed)

    return NextResponse.json<Sentiment>(normalized)
  } catch (error: any) {
    console.error('Sentiment API error:', error)
    return NextResponse.json(
      { error: error?.message ?? 'Failed to analyze sentiment' },
      { status: 500 }
    )
  }
}

function buildPrompt(text: string) {
  return `You are a strict sentiment classifier.
Return ONLY a JSON object with exactly these fields:
{"label":"Positive|Negative|Neutral","score": 0 to 1}

Rules:
- label must be one of: Positive, Negative, Neutral
- score is confidence between 0 and 1
- No extra text.

Examples:
Input: "I love this! Great job."
Output: {"label":"Positive","score":0.95}

Input: "This is terrible and I hate it."
Output: {"label":"Negative","score":0.98}

Input: "It works."
Output: {"label":"Neutral","score":0.5}

Now classify this input:
${JSON.stringify(text)}`
}

function safeParseJSON(s: string | undefined) {
  if (!s) return null
  try {
    return JSON.parse(s)
  } catch {
    const m = s.match(/\{[\s\S]*\}/)
    if (m) {
      try {
        return JSON.parse(m[0])
      } catch {
        return null
      }
    }
    return null
  }
}

function normalizeSentiment(input: any): { label: 'Positive' | 'Negative' | 'Neutral'; score: number } {
  const raw = String(input?.label ?? input?.sentiment ?? '').toLowerCase()
  const label =
    raw.includes('pos') ? 'Positive' :
    raw.includes('neg') ? 'Negative' :
    'Neutral'

  let score = Number(input?.score)
  if (!Number.isFinite(score)) score = 0.5
  score = Math.max(0, Math.min(1, score))
  return { label, score }
}