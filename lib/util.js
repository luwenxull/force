'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
/**
 * 生成三维分布
 *
 * @export
 * @template T
 * @param {Array<T>} nodes
 * @returns {Array<T>}
 */
function uniform3dDistribution(nodes) {
  const r = 0.1;
  let base = 2;
  let index = 0;
  nodes.forEach(node => {
    if (index === Math.pow(base, 2)) {
      base++;
      index = 0;
    }
    const radius = r * base;
    const zenith = ((Math.floor(index / base) + 1) * Math.PI) / (base + 1);
    const azimuth = (((index % base) * Math.PI) / base) * 2;
    node.position.set(
      radius * Math.sin(zenith) * Math.cos(azimuth),
      radius * Math.sin(zenith) * Math.sin(azimuth),
      radius * Math.cos(zenith)
    );
    index++;
  });
  return nodes;
}
exports.uniform3dDistribution = uniform3dDistribution;
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
function getOrOverwrite(map, key, dft) {
  if (map.has(key)) {
    return map.get(key);
  } else {
    map.set(key, dft);
    return dft;
  }
}
exports.getOrOverwrite = getOrOverwrite;
