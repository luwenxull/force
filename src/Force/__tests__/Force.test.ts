import Force from '../Force';

class TestForce extends Force {
  applyTo() {
    return this;
  }
}

test('strenth', () => {
  const force = new TestForce();
  expect(force.strength()).toBe(1);
  force.strength(10);
  expect(force.strength()).toBe(10);
});

test('distance', () => {
  const force = new TestForce();
  expect(force.distance()).toBe(10);
  force.distance(1);
  expect(force.strength()).toBe(1);
});
