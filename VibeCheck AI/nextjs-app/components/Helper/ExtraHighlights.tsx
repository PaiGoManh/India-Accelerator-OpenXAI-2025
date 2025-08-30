function extractHighlights(text: string) {

  const NEG_WORDS = [
  'abysmal', 'angry', 'annoying', 'awful', 'bad', 'bitter', 'boring', 'broken',
  'complain', 'corrupt', 'cruel', 'deceitful', 'defeat', 'depressing', 'despair',
  'dreadful', 'embarrass', 'fail', 'faulty', 'frustrate', 'greed', 'grim',
  'guilty', 'hate', 'hideous', 'horrible', 'hurtful', 'incompetent', 'inferior',
  'insulting', 'jealous', 'lousy', 'miserable', 'negative', 'nasty', 'pathetic',
  'poor', 'regret', 'reject', 'repulsive', 'sadness', 'scandal', 'shameful',
  'sickening', 'stupid', 'terrible', 'tragic', 'unacceptable', 'unfortunate',
  'unpleasant', 'upset', 'worthless'
]

const POS_WORDS = [
  'admire', 'adventure', 'amazing', 'awesome', 'beautiful', 'believe', 'brilliant',
  'celebrate', 'champion', 'cheerful', 'delight', 'dream', 'enjoy', 'excellent',
  'fabulous', 'fantastic', 'fortunate', 'friendship', 'funny', 'generous',
  'glorious', 'goodness', 'great', 'happiness', 'honest', 'hopeful', 'incredible',
  'inspire', 'joyful', 'kindness', 'laughter', 'legendary', 'love', 'lucky',
  'marvelous', 'miracle', 'optimistic', 'outstanding', 'perfect', 'phenomenal',
  'positive', 'praise', 'remarkable', 'resilient', 'spectacular', 'splendid',
  'stunning', 'successful', 'terrific', 'thrilled', 'trustworthy', 'unbelievable',
  'victory', 'vibrant', 'wonderful', 'worthy'
]

  const words = (text.toLowerCase().match(/\b[\w']+\b/g) || [])
  const positives: string[] = []
  const negatives: string[] = []
  const posSet = new Set(POS_WORDS)
  const negSet = new Set(NEG_WORDS)
  for (const w of words) {
    if (posSet.has(w) && !positives.includes(w)) positives.push(w)
    if (negSet.has(w) && !negatives.includes(w)) negatives.push(w)
  }
  return { positives, negatives }
}

export default extractHighlights