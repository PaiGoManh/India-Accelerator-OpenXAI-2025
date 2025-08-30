function countWords(s: string) {
  return (s.trim().match(/\b\w+\b/g) || []).length
}

export default countWords



