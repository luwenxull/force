import charge from '../charge'
import Particle from '../Particle'

test('charge', () => {
  const p1 = new Particle(), p2 = new Particle([3, 4, 0])
  charge(p1, p2)
  expect(p1.a.x).toBeCloseTo(-0.6 / 25, 5)
  expect(p1.a.y).toBeCloseTo(-0.8 / 25, 5)
  expect(p1.a.z).toBe(0)
  expect(p2.a.x).toBeCloseTo(0.6 / 25, 5)
  expect(p2.a.y).toBeCloseTo(0.8 / 25, 5)
  expect(p2.a.z).toBe(0)
})