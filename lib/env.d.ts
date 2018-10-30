export interface IEnv {
    DRAG: number;
    TIME_STEP: number;
}
export declare const ENV: IEnv;
export declare function def(option: Partial<IEnv>): void;
