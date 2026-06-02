const search = (docs, substring) => {
  const changedSubstring = substring.match(/\w+/)
  const newRegex = new RegExp(`\\b${changedSubstring}\\b`, 'ig')

  return docs
    .filter(doc => doc.text.match(newRegex))
    .sort((a, b) => a.text.match(newRegex).length < b.text.match(newRegex).length ? 1 : -1)
    .map(doc => doc.id)
}
export default search
