import def from '../env';

test('def', () => {
  const ENV = def({
    DRAG: 1,
    TIME_STEP: 2
  });
  expect(ENV.DRAG).toBe(1);
  expect(ENV.TIME_STEP).toBe(2);
});
