import {getOrOverwrite} from '../util'

test('get or overwrite', () => {
  const map = new Map()
  expect(getOrOverwrite(map, 'test', 'hello')).toBe('hello')
  expect(map.get('test')).toBe('hello')
  map.set('t2','good')
  expect(getOrOverwrite(map, 't2', 'ddd')).toBe('good')
  expect(map.get('t2')).toBe('good')
})