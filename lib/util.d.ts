import Vector3 from './Vector3';
/**
 * 生成三维分布
 *
 * @export
 * @template T
 * @param {Array<T>} nodes
 * @returns {Array<T>}
 */
export declare function uniform3dDistribution<T extends {
    position: Vector3;
}>(nodes: Array<T>): Array<T>;
/**
 * safe get for map
 * map对象的包装get方法
 *
 * @export
 * @template K
 * @template U
 * @param {Map<K, U>} map
 * @param {K} key
 * @param {U} dft
 * @returns {U}
 */
export declare function getOrOverwrite<K, U>(map: Map<K, U>, key: K, dft: U): U;
