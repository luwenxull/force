export interface IEnv {
  DRAG: number;
  TIME_STEP: number;
}

const DEFAULT_ENV: IEnv = {
  DRAG: 0.97,
  TIME_STEP: 0.018
};

export default function(option: Partial<IEnv> = {}): IEnv {
  return Object.assign({}, DEFAULT_ENV, option);
}
