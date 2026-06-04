import search from '../src/index.js'

describe('should work correctly with normal data', () => {
  let docs
  beforeAll(() => {
    const doc1 = { id: 'doc1', text: 'I can\'t shoot straight unless I\'ve had a pint at me!' }
    const doc2 = { id: 'doc2', text: 'Don\'t shoot shoot shoot shoot that thing.' }
    const doc3 = { id: 'doc3', text: 'I\'m your shooter.' }
    docs = [doc1, doc2, doc3]
  })

  test('should show correctly, taking into account the fuzzy search', () => {
    expect(search(docs, 'shoot at me')).toEqual(['doc1', 'doc2'])
    expect(search(docs, 'shoot')).toEqual(['doc2', 'doc1'])
    expect(search(docs, 'shoot shoot')).toEqual(['doc2', 'doc1'])
  })

  test('should get empty arrays, checking for borderline cases', () => {
    expect(search(docs, 'bullet')).toEqual([])
    expect(search(docs, '')).toEqual([])
    expect(search(docs, '  ')).toEqual([])
  })
})

describe('should work correctly if the data is incorrectly formatted', () => {
  let docs
  beforeAll(() => {
    const doc1 = { id: 'doc1', text: 'Shoot... straight!' }
    const doc2 = { id: 'doc2', text: 'Don\'t   shoot   shoot.' }
    docs = [doc1, doc2]
  })
  test('should work correctly with extra spaces', () => {
    expect(search(docs, 'shoot     straight')).toEqual(['doc1', 'doc2'])
  })
  test('should work correctly with uppercase', () => {
    expect(search(docs, 'SHOOT')).toEqual(['doc2', 'doc1'])
  })
})

test('should show correctly, taking into account the fuzzy search', () => {
  const doc1 = { id: 'doc1', text: 'one two three' }
  const doc2 = { id: 'doc2', text: 'one one one one' }
  const doc3 = { id: 'doc3', text: 'one two' }
  const docs = [doc1, doc2, doc3]

  expect(search(docs, 'one two three')).toEqual(['doc1', 'doc3', 'doc2'])
})
