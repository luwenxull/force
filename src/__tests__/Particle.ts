import Vector3 from '../Vector3'
import Particle, { DRAG, TIME_STEP } from '../Particle'

test('constructor', () => {
  const p = new Particle({ id: 1 })
  expect(p.position.toArray()).toEqual([0, 0, 0])
  expect(p.v.toArray()).toEqual([0, 0, 0])
  expect(p.a.toArray()).toEqual([0, 0, 0])
  expect(p.mass).toBe(1)
  const p1 = new Particle({
    id: 1,
    position: [1, 1, 1]
  })
  expect(p1.position.toArray()).toEqual([1, 1, 1])
  const p2 = new Particle('a')
  expect(p2.id).toBe('a')
  expect(p2.mass).toBe(1)
})

test('accelerate', () => {
  const p = new Particle({
    id: 1,
    mass: 2,
  })
  expect(p.accelerate(new Vector3(1, 1, 0)).a.toArray()).toEqual([0.5, 0.5, 0])
  expect(p.accelerate(new Vector3(1, -1, 0)).a.toArray()).toEqual([1, 0, 0])
})

test('move', () => {
  const p = new Particle({
    id: 1,
  })
  p.accelerate(new Vector3(1, 1, 0)).move()
  expect(p.v.toArray()).toEqual([TIME_STEP, TIME_STEP, 0])
  expect(p.position.toArray()).toEqual([TIME_STEP ** 2, TIME_STEP ** 2, 0])
  expect(p.a.toArray()).toEqual([0, 0, 0])
  p.move()
  expect(p.v.toArray()).toEqual([TIME_STEP * DRAG, TIME_STEP * DRAG, 0])
})
