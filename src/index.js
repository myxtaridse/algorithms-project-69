const search = (docs, substring) => {
  const changedSubstring = substring.match(/\w+/)
  const newRegex = new RegExp(`\\b${changedSubstring}\\b`, 'ig')
  return docs
    .filter(doc => doc.text.match(newRegex))
    .map(doc => doc.id)
}
export default search
