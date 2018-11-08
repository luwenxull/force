import ForceLink from '../Force.Link';
import Particle from '../../Particle';

test('set links', () => {
  const f = new ForceLink();
  f.links([[1, [2, 3]]]);
  expect(f.links().length).toBe(1);
  expect(f.links()[0][1]).toEqual([2, 3]);
  expect(f['_linkMap'].get(1).has(2)).toBeTruthy();
  expect(f['_linkMap'].get(2).has(1)).toBeTruthy();
});

test('is related', () => {
  const f = new ForceLink();
  const p1 = new Particle(1),
    p2 = new Particle(2);
  f.links([[1, [2, 3]]]);
  expect(f.isRelated(p1.id, p2.id)).toBeTruthy();
  expect(f.isRelated(p2.id, p1.id)).toBeTruthy();
  expect(f.isRelated(p1.id, new Particle(4).id)).toBeFalsy();
});

test('apply to', () => {
  const f = new ForceLink().strength(2).distance(10);
  const p1 = new Particle(1),
    p2 = new Particle({ id: 2, position: [3, 4, 0] });
  f.applyTo(p1, p2);
  expect(p1.a.toArray()).toEqual([0, 0, 0]);
  expect(p2.a.toArray()).toEqual([0, 0, 0]);
  f.links([[1, [2]]]).applyTo(p1, p2);
  expect(p1.a.toArray()).toEqual([-6, -8, 0]);
  expect(p2.a.toArray()).toEqual([6, 8, 0]);

  const f2 = new ForceLink()
    .strength(3)
    .distance(0)
    .links([[1, [2]]]);
  p1.a.set(0, 0, 0);
  p2.a.set(0, 0, 0);
  f2.applyTo(p1, p2);
  expect(p1.a.toArray()).toEqual([9, 12, 0]);
  expect(p2.a.toArray()).toEqual([-9, -12, 0]);
});
