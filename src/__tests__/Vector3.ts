import Vector3 from '../Vector3'

test('constructor', () => {
  const v = new Vector3(1, 2)
  expect(v.x).toBe(1)
  expect(v.y).toBe(2)
  expect(v.z).toBe(0)
})

test('multiplyScalar', () => {
  const v = new Vector3(2, 3, 4)
  v.multiplyScalar(2)
  expect([v.x, v.y, v.z]).toEqual([4, 6, 8])
})

test('set', () => {
  const v = new Vector3(1, 1, 1)
  v.set(3, 4, 5)
  expect([v.x, v.y, v.z]).toEqual([3, 4, 5])
})

test('copy', () => {
  const v = new Vector3(2, 3, 4)
  const v2 = v.copy(v)
  expect([v2.x, v2.y, v2.z]).toEqual([2, 3, 4])
})

test('add', () => {
  const v = new Vector3(1, 2, 3)
  v.add(new Vector3(2, 4, 1))
  expect([v.x, v.y, v.z]).toEqual([3, 6, 4])
})

test('sub', () => {
  const v = new Vector3(1, 2, 3)
  v.sub(new Vector3(2, 4, 1))
  expect([v.x, v.y, v.z]).toEqual([-1, -2, 2])
})

test('toArray', () => {
  const v = new Vector3(2, 3, 4)
  expect(v.toArray()).toEqual([2, 3, 4])
  expect(v.toArray([], 1)).toEqual([, 2, 3, 4])
})

test('length', () => {
  const v = new Vector3(3, 4, 0)
  expect(v.length()).toBe(5)
})

test('normalize', () => {
  const v = new Vector3(3, 4, 0)
  expect(v.normalize().toArray()).toEqual([0.6, 0.8, 0])
})

test('distanceTo', () => {
  const v = new Vector3(1, 2, 3)
  expect(v.distanceTo(new Vector3(4, 6, 3))).toBe(5)
})
