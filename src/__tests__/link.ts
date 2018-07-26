import link from '../link'
import Particle from '../Particle'

test('link', () => {
  const p1 = new Particle(), p2 = new Particle([3, 4, 0])
  link(p1, p2, 5)
  expect(p1.simulate().position.toArray()).toEqual([0, 0, 0])
  link(p1, p2, 1, 10)
  expect(p1.a.x).toBeCloseTo(24)
  expect(p1.a.y).toBeCloseTo(32)
  expect(p2.a.x).toBeCloseTo(-24)
  expect(p2.a.y).toBeCloseTo(-32)
})