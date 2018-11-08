import Simulation from '../Simulation';
import Particle from '../Particle';
import Charge from '../Force/Force.Charge';

test('add particles', () => {
  const s = new Simulation().addParticles([new Particle(1)]);
  expect(s.particles.length).toBe(1);
});

test('addforce', () => {
  const s = new Simulation().addForce(new Charge());
  expect(s.forces.length).toBe(1);
});

test('stopAt', () => {
  const s = new Simulation();
  const fn = jest.fn(() => {});
  const stopCb = jest.fn(() => {});
  s.evolve(fn);
  expect(fn.mock.calls.length).toBe(0);

  s.stopAt(1, stopCb);
  fn.mockClear();
  s.evolve(fn);
  expect(fn.mock.calls.length).toBe(1);
  expect(stopCb.mock.calls.length).toBe(1);
  s.evolve(fn);
  expect(fn.mock.calls.length).toBe(1);
  expect(stopCb.mock.calls.length).toBe(1);
});

test('evolve.iterationCount', () => {
  const s = new Simulation().addParticles([
    new Particle({ id: 1, position: [1, 0, 0] }),
    new Particle(2),
    new Particle(3)
  ]);
  const f = new Charge();
  const mock = jest.fn(() => {});
  f.applyTo = mock;
  s.addForce(f);
  s.stopAt(1);
  s.evolve();
  expect(mock.mock.calls.length).toBe(3);
});

test('add env', () => {
  const s = new Simulation().addEnv({
    DRAG: 1,
    TIME_STEP: 1
  });
  expect(s.ENV.DRAG).toBe(1);
  expect(s.ENV.TIME_STEP).toBe(1);
});
