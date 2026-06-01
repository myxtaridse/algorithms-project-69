const search = (docs, substring) => {
  return docs
    .filter(doc => doc.text.split(' ').some(t => t === substring))
    .map(doc => doc.id)
}
export default search
