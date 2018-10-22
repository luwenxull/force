import Vector3 from './Vector3'

/**
 * 生成三维分布
 *
 * @export
 * @template T
 * @param {Array<T>} nodes
 * @returns {Array<T>}
 */
export function uniform3dDistribution<T extends { position: Vector3 }>(nodes: Array<T>): Array<T> {
  const r = 0.1
  let base = 2
  let index = 0
  nodes.forEach(node => {
    if (index === base ** 2) {
      base++
      index = 0
    }
    const radius = r * base
    const zenith = (Math.floor(index / base) + 1) * Math.PI / (base + 1)
    const azimuth = (index % base) * Math.PI / base * 2
    node.position.set(
      radius * Math.sin(zenith) * Math.cos(azimuth),
      radius * Math.sin(zenith) * Math.sin(azimuth),
      radius * Math.cos(zenith)
    )
    index++
  })
  return nodes
}
