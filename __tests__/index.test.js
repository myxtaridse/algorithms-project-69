import search from '../src/index.js'

let docs

beforeAll(() => {
  const doc1 = { id: 'doc1', text: 'I can\'t shoot straight unless I\'ve had a pint!' }
  const doc2 = { id: 'doc2', text: 'Don\'t shoot shoot shoot that thing at me.' }
  const doc3 = { id: 'doc3', text: 'I\'m your shooter.' }
  docs = [doc1, doc2, doc3]
})

test('should correctly show the names of the two documents that have the given word', () => {
  expect(search(docs, 'shoot')).toEqual(['doc2', 'doc1'])
})

test('should output an empty array because no documents are specified', () => {
  expect(search([], 'shoot')).toEqual([])
})

test('should work correctly, even if there is a character in the substring', () => {
  expect(search(docs, 'shoot!')).toEqual(['doc2', 'doc1'])
})

test('should work correctly, even if the substring has an uppercase', () => {
  expect(search(docs, 'Shoot')).toEqual(['doc2', 'doc1'])
})

test('should work correctly, taking into account the relevance', () => {
  expect(search(docs, 'shoot')).toEqual(['doc2', 'doc1'])
})

test('should work correctly, taking into account the fuzzy search', () => {
  expect(search(docs, 'shoot at me')).toEqual(['doc2', 'doc1'])
})
