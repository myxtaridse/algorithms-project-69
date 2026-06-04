const buildDictionary = (docs) => {
  return docs.reduce((acc, doc) => {
    const splitedText = doc.text.toLowerCase().match(/[\w']+/g)

    splitedText.forEach((sub) => {
      if (!Object.hasOwn(acc, sub)) {
        acc[sub] = []
      }
      acc[sub].push(doc.id)
    })
    return acc
  }, {})
}

const search = (docs, substring) => {
  const splitedSubstring = substring.toLowerCase().match(/[\w']+/g)
  if (!splitedSubstring || !splitedSubstring.length) return []

  const countDocs = docs.length
  const dictionary = buildDictionary(docs)

  const substringIDF = splitedSubstring.reduce((acc, sub) => {
    if (dictionary[sub])
      acc[sub] = Math.log(countDocs / (dictionary[sub].length + 1)) + 1
    return acc
  }, {})

  const coincidences = splitedSubstring.reduce((acc, sub) => {
    dictionary[sub]?.forEach((idDoc) => {
      if (!Object.hasOwn(acc, idDoc)) {
        acc[idDoc] = { [sub]: 0 }
      }
      acc[idDoc] = {
        ...acc[idDoc],
        [sub]: (Object.hasOwn(acc[idDoc], sub) ? acc[idDoc][sub] : 0) + 1,
      }
    })
    return acc
  }, {})

  return Object.entries(coincidences).map(([key, value]) => {
    const text = docs.find(d => d.id === key).text
    const words = text.match(/[\w']+/g)

    const docScore = Object.entries(value).reduce((score, [sub, countSub]) => {
      const tf = countSub / words.length
      score += (tf * substringIDF[sub])
      return score
    }, 0)
    return { id: key, score: docScore }
  }).sort((a, b) => b.score - a.score).map(({ id }) => id)
}

export default search
