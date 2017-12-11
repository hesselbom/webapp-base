import { checkIntersection } from 'line-intersect'

export function lerp (value1, value2, amount) {
  amount = amount < 0 ? 0 : amount
  amount = amount > 1 ? 1 : amount
  return value1 + (value2 - value1) * amount
}

function sqr (x) { return x * x }
function dist2 (v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
export function distToSegmentSquared (p, v, w, withPos) {
  let l2 = dist2(v, w)
  if (l2 === 0) {
    let distSq = dist2(p, v)
    return withPos ? { distSq, pos: v } : distSq
  }
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2
  t = Math.max(0, Math.min(1, t))
  let pos = { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) }
  let distSq = dist2(p, pos)
  return withPos ? { distSq, pos } : distSq
}
export function distToSegment (p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)) }

export function getRayIntersection (ray, segment) {
  // RAY in parametric: Point + Direction*T1
  let rPx = ray.x1
  let rPy = ray.y1
  let rDx = ray.x2 - ray.x1
  let rDy = ray.y2 - ray.y1
  // SEGMENT in parametric: Point + Direction*T2
  let sPx = segment.x1
  let sPy = segment.y1
  let sDx = segment.x2 - segment.x1
  let sDy = segment.y2 - segment.y1
  // Are they parallel? If so, no intersect
  let rMag = Math.sqrt(rDx * rDx + rDy * rDy)
  let sMag = Math.sqrt(sDx * sDx + sDy * sDy)
  if (rDx / rMag === sDx / sMag && rDy / rMag === sDy / sMag) { // Directions are the same.
    return null
  }
  // SOLVE FOR T1 & T2
  // rPx+rDx*T1 = sPx+sDx*T2 && rPy+rDy*T1 = sPy+sDy*T2
  // ==> T1 = (sPx+sDx*T2-r_px)/rDx = (sPy+sDy*T2-r_py)/rDy
  // ==> sPx*rDy + sDx*T2*rDy - rPx*rDy = sPy*rDx + sDy*T2*rDx - rPy*rDx
  // ==> T2 = (rDx*(s_py-r_py) + rDy*(r_px-s_px))/(sDx*rDy - sDy*rDx)
  let T2 = (rDx * (sPy - rPy) + rDy * (rPx - sPx)) / (sDx * rDy - sDy * rDx)
  let T1 = (sPx + sDx * T2 - rPx) / rDx
  // Must be within parametic whatevers for RAY/SEGMENT
  if (T1 < 0) return null
  if (T2 < 0 || T2 > 1) return null
  // Return the POINT OF INTERSECTION
  return {
    x: rPx + rDx * T1,
    y: rPy + rDy * T1,
    param: T1
  }
}

export function getRayIntersections (ray, segments) {
  let intersections = []
  for (let i = 0; i < segments.length; i++) {
    let segment = segments[i]
    let intersection = getRayIntersection(ray, segment)
    if (intersection) intersections.push({ ...intersection, segment })
  }
  return intersections.sort((a, b) => a.param - b.param)
}

export function getLineIntersection (line, segment) {
  let intersection = checkIntersection(line.x1, line.y1, line.x2, line.y2, segment.x1, segment.y1, segment.x2, segment.y2)
  return intersection.type === 'intersecting' ? intersection : null
}

export function getLineIntersections (line, segments) {
  let intersections = []
  for (let i = 0; i < segments.length; i++) {
    let segment = segments[i]
    let intersection = getLineIntersection(line, segment)
    if (intersection) intersections.push({ ...intersection, segment })
  }
  return intersections
}

function topologicalSortHelper (node, visited, temp, graph, result) {
  temp[node] = true
  var neighbors = graph[node]
  for (var i = 0; i < neighbors.length; i += 1) {
    var n = neighbors[i]
    if (temp[n]) {
      throw new Error('The graph is not a DAG')
    }
    if (!visited[n]) {
      topologicalSortHelper(n, visited, temp, graph, result)
    }
  }
  temp[node] = false
  visited[node] = true
  result.push(node)
}

/**
  * Topological sort algorithm of a directed acyclic graph.<br><br>
  * Time complexity: O(|E| + |V|) where E is a number of edges
  * and |V| is the number of nodes.
  *
  * @public
  * @module graphs/others/topological-sort
  * @param {Array} graph Adjacency list, which represents the graph.
  * @returns {Array} Ordered vertices.
  *
  * @example
  * var topsort =
  *  require('path-to-algorithms/src/graphs/' +
  * 'others/topological-sort').topologicalSort;
  * var graph = {
  *     v1: ['v2', 'v5'],
  *     v2: [],
  *     v3: ['v1', 'v2', 'v4', 'v5'],
  *     v4: [],
  *     v5: []
  * };
  * var vertices = topsort(graph); // ['v3', 'v4', 'v1', 'v5', 'v2']
  */
export function topologicalSort (graph) {
  var result = []
  var visited = []
  var temp = []
  for (var node in graph) {
    if (!visited[node] && !temp[node]) {
      topologicalSortHelper(node, visited, temp, graph, result)
    }
  }
  return result.reverse()
}

export function randomRange (min, max) {
  return Math.random() * (max - min) + min
}
