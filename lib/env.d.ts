export interface IEnv {
  DRAG: number;
  TIME_STEP: number;
}
export default function(option?: Partial<IEnv>): IEnv;
