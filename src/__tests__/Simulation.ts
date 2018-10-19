import Simulation from '../Simulation'
import Particle from '../Particle'
import Charge from '../Force/Force.Charge'

test('add particles', () => {
  const s = new Simulation().addParticles([
    new Particle(1)
  ])
  expect(s.particles.length).toBe(1)
})

test('addforce', () => {
  const s = new Simulation().addForce(new Charge(1, 10))
  expect(s.forces.length).toBe(1)
})

test('tick', () => {
  const s = new Simulation().addParticles([
    new Particle({ id: 1, position: [1, 0, 0] }),
    new Particle(2),
    new Particle(3)
  ])
  const f = new Charge(1, 10)
  const mock = jest.fn(() => { })
  f.applyTo = mock
  s.addForce(f)
  s.tick()
  expect(mock.mock.calls.length).toBe(3)
})
