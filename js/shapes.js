/*const arEnd = draw.marker(26, 10, function(add) {
  add.path('m 0, 3 l 13, 2 l -13, 2')
  .stroke({width: 2})
  .stroke('currentColor')
})

const arrow = (x1, y1, x2, y2) => {
  let shaft = draw.line()
    .gPlot(x1, y1, x2, y2)
    .stroke('dodgerblue')
    .marker('end', 26, 10, arEnd)
  return shaft
}*/

const arrow = (x1, y1, x2, y2) => {
  let shaft = draw.line()
    .gPlot(x1, y1, x2, y2)
    .marker('end', 26, 10, function(add) {
      add.path('m 0, 3 l 13, 2 l -13, 2')
        .stroke({width: 1})
        .stroke('context-stroke')
    })
  return shaft
}

const gPlane = () => {
  let ll = new SVG.List()
  ll.push(
    arrow(-115, 0, 115, 0)
      .stroke('dodgerblue'),
    arrow(0, -115, 0, 115)
      .stroke('dodgerblue'),
  )
  return ll
}

const spinXY = (cx, cy, r, a) => {
  return gXY(
    Math.cos(a) * r + cx,
    Math.sin(a) * r + cy,
  )
}

const arc = (cx, cy, r, a1, a2) => {
  let p1, am, p2, p3, pathAr, ccw = 0

  if (Math.abs(a2 - a1) > 2*Math.PI) {
    a1 %= 2 * Math.PI, a2 %= 2 * Math.PI
  }
 if (a2 - a1 < 0) ccw = 1
  p1 = spinXY(cx, cy, r, a1)
  am = (a1 + a2) / 2
  p2 = spinXY(cx, cy, r, am)
  p3 = spinXY(cx, cy, r, a2)
  r = gWH(r).w

  return draw.path([
    ['M', p1.x, p1.y],
    ['A', r, r, 0, 0, ccw, p2.x, p2.y],
    ['A', r, r, 0, 0, ccw, p3.x, p3.y],
  ])
}
