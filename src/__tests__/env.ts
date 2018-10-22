import { ENV, def } from '../env'

test('def', () => {
  expect(ENV.DRAG).toBeCloseTo(1 - 0.03)
  expect(ENV.TIME_STEP).toBeCloseTo(18 / 1000)
  def({
    DRAG: 1,
    TIME_STEP: 2
  })
  expect(ENV.DRAG).toBe(1)
  expect(ENV.TIME_STEP).toBe(2)
})