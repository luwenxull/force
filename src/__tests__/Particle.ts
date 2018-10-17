import Vector3 from '../Vector3'
import Particle, { DRAG, TIME_STEP } from '../Particle'

test('constructor', () => {
  const p = new Particle()
  expect(p.position.toArray()).toEqual([0, 0, 0])
  expect(p.v.toArray()).toEqual([0, 0, 0])
  expect(p.a.toArray()).toEqual([0, 0, 0])
  expect(p.mass).toBe(1)
  const p1 = new Particle([1, 1, 1])
  expect(p1.position.toArray()).toEqual([1, 1, 1])
})

test('addForce', () => {
  const p = new Particle()
  expect(p.addForce(new Vector3(1, 1, 0)).a.toArray()).toEqual([1, 1, 0])
  expect(p.addForce(new Vector3(1, -1, 0)).a.toArray()).toEqual([2, 0, 0])
})

test('simulate', () => {
  const p = new Particle()
  p.addForce(new Vector3(1, 1, 0)).simulate()
  expect(p.v.toArray()).toEqual([TIME_STEP, TIME_STEP, 0])
  expect(p.position.toArray()).toEqual([TIME_STEP ** 2, TIME_STEP ** 2, 0])
  expect(p.a.toArray()).toEqual([0, 0, 0])
  p.simulate()
  expect(p.v.toArray()).toEqual([TIME_STEP * DRAG, TIME_STEP * DRAG, 0])
})
