const buildDictionary = (docs) => {
  const dictionary = {}
  docs.forEach((doc) => {
    const removeApostrophe = doc.text.replace(/'/g, '')
    const splited = removeApostrophe.split(' ').map(s => s.toLowerCase().match(/\w+/))

    splited.forEach((str) => {
      if (Object.hasOwn(dictionary, str)) {
        dictionary[str].push(doc.id)
      }
      else {
        dictionary[str] = [doc.id]
      }
    })
  })
  return dictionary
}

const search = (docs, substring) => {
  const dictionary = buildDictionary(docs)

  const splitedSub = substring.split(' ').map(s => s.toLowerCase().match(/\w+/)).filter(s => s).map(m => m[0])
  const filteredDictonary = splitedSub.reduce((acc, sub) => {
    dictionary[sub]?.forEach((d) => {
      if (!Object.hasOwn(acc, d)) {
        acc[d] = { [sub]: 0 }
      }
      acc[d] = {
        ...acc[d],
        [sub]: (Object.hasOwn(acc[d], sub) ? Number(acc[d][sub]) : 0) + 1,
      }
    })
    return acc
  }, {})
  return Object.entries(filteredDictonary).sort(([, valueA], [, valueB]) => {
    if (Object.keys(valueA).length === Object.keys(valueB).length) {
      const countA = Object.values(valueA).reduce((acc, v) => acc + v)
      const countB = Object.values(valueB).reduce((acc, v) => acc + v)
      return countA < countB ? 1 : -1
    }
    return Object.keys(valueA).length < Object.keys(valueB).length ? 1 : -1
  }).map(([key]) => key)
}

export default search
