export interface IEnv {
  DRAG: number
  TIME_STEP: number
}

export const ENV: IEnv = {
  DRAG: 0.97,
  TIME_STEP: 0.018,
}

export function def(option: Partial<IEnv>): void {
  Object.assign(ENV, option)
}
