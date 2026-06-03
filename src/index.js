const buildDictionary = (docs) => {
  const dictionary = {}
  docs.forEach((doc) => {
    const removeApostrophe = doc.text.replace(/'/g, '')
    console.log(removeApostrophe)
    const splited = removeApostrophe.split(' ').map(s => s.toLowerCase().match(/\w+/))

    splited.forEach((str) => {
      if (Object.hasOwn(dictionary, str)) {
        if (!dictionary[str].includes(doc.id)) {
          dictionary[str].push(doc.id)
        }
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
      const newAcc = Object.hasOwn(acc, d) ? acc[d] : 0
      acc[d] = newAcc + 1
    })
    return acc
  }, {})
  const keys = Object.keys(filteredDictonary)
  return keys.sort((a, b) => filteredDictonary[b] - filteredDictonary[a])
}

export default search
