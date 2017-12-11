import { Vector2 } from 'three'
import { distToSegmentSquared, getLineIntersections } from './math'

export function fitToBorders (position, borders) {
  position.x = Math.max(borders.left, Math.min(borders.right, position.x))
  position.y = Math.max(borders.top, Math.min(borders.bottom, position.y))
}

export function moveFromWalls (position, radius, walls) {
  let radiusSq = radius * radius

  walls.forEach(wall => {
    let { distSq, pos } = distToSegmentSquared(position, wall.a, wall.b, true)
    let collide = distSq <= radiusSq

    if (collide) {
      let vector = new Vector2(position.x - pos.x, position.y - pos.y)
      let length = vector.length()
      vector.normalize().multiplyScalar(radius - length)
      position.x += vector.x
      position.y += vector.y
    }
  })
}

export function collideVectorWithWalls (position, vector, radius, walls) {
  let length = vector.length()
  let newPosition = position.clone().add(vector)
  let intersections = getLineIntersections({ x1: position.x, y1: position.y, x2: newPosition.x, y2: newPosition.y }, walls)

  let closest = intersections.reduce((value, current) => {
    let distSq = position.distanceSq(current.point)
    if (!value || distSq < value.distSq) return { ...current.point, distSq }
    return value
  }, null)

  if (closest) {
    let distance = position.distance(closest) || 0

    if (distance < length) {
      vector.normalize().multiplyScalar(Math.max(0, distance - radius / 2))
    }
  }
}
