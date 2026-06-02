const search = (docs, substring) => {
  const splitedSub = substring.split(' ').map(s => s.match(/\w+/))
  const regexpString = splitedSub.map(s => `\\b${s}\\b`).join('|')
  const newRegex = new RegExp(regexpString, 'ig')

  return docs
    .filter(doc => doc.text.match(newRegex))
    .map((doc) => {
      const uniqueCount = splitedSub.filter(s => doc.text.match(`\\b${s}\\b`)).length
      const totalCount = doc.text.match(newRegex).length
      return { id: doc.id, uniqueCount, totalCount }
    })
    .sort((a, b) => {
      if (a.uniqueCount !== b.uniqueCount) {
        return b.uniqueCount - a.uniqueCount
      }
      return b.totalCount - a.totalCount
    })
    .map(doc => doc.id)
}
export default search
