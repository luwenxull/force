import ForceCharge from '../Force.Charge';
import Particle from '../../Particle';

test('applyto', () => {
  const f = new ForceCharge().strength(25).distance(10);
  const p1 = new Particle(1),
    p2 = new Particle({ id: 2, position: [3, 4, 0] });
  f.applyTo(p1, p2);
  expect(p2.a.toArray()).toEqual([0.6, 0.8, 0]);
  expect(p1.a.toArray()).toEqual([-0.6, -0.8, 0]);

  p1.a.set(0, 0, 0);
  p2.a.set(0, 0, 0);
  f.strength((p1, p2) => 50);
  f.applyTo(p1, p2);
  expect(p2.a.toArray()).toEqual([1.2, 1.6, 0]);
  expect(p1.a.toArray()).toEqual([-1.2, -1.6, 0]);

  f.strength(3).distance(0);
  p1.a.set(0, 0, 0);
  p2.a.set(0, 0, 0);
  f.applyTo(p1, p2);
  expect(p1.a.toArray()).toEqual([0, 0, 0]);
  expect(p2.a.toArray()).toEqual([0, 0, 0]);
});
