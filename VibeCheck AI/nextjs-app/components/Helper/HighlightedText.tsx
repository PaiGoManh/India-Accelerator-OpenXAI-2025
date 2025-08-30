function HighlightedText({ text }: { text: string }) {

   const POS_WORDS = [
  'love','great','awesome','amazing','good','happy','fantastic','excellent','nice','enjoy','like','wonderful','brilliant','best','superb','sweet'
]
const NEG_WORDS = [
  'hate','terrible','awful','bad','angry','annoyed','sad','worse','worst','disappointed','bug','issue','broken','slow','crash','lag','problem','disgusting','horrible','sucks','shit'
]

  if (!text) return null
  const parts = text.split(/(\W+)/) // keep punctuation/whitespace
  const posSet = new Set(POS_WORDS.map(w => w.toLowerCase()))
  const negSet = new Set(NEG_WORDS.map(w => w.toLowerCase()))
  return (
    <>
      {parts.map((token, i) => {
        const lower = token.toLowerCase()
        if (/^\w+$/.test(token)) {
          if (posSet.has(lower)) {
            return <span key={i} className="text-emerald-300 font-medium">{token}</span>
          }
          if (negSet.has(lower)) {
            return <span key={i} className="text-rose-300 font-medium">{token}</span>
          }
        }
        return <span key={i}>{token}</span>
      })}
    </>
  )
}

export default HighlightedText