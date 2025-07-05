const arrow = (x1, y1, x2, y2) => {
  return draw.line()
  .plot(x1, y1, x2, y2)
  .marker('end', 26, 10, function(add) {
    add.path('m 0, 2 l 13, 3 l -13, 3')
      .stroke({width: 1})
      .stroke('context-stroke')
      //.fill('context-stroke')
  })
}

const coordPlane = () => new SVG.List([
  arrow(-115, 0, 115, 0),
  arrow(0, -115, 0, 115),
])

const label = (text, x, y) =>
  draw.text(text).center(x, y).scale(1, -1)

const axesLabels = () => new SVG.List([
  label('x', 112, -7),
  label('y', 7, 112),
  label('0', 6, -6),
]).each(i => i.fill('white'))

const spinXY = (cx, cy, r, a) => [
    Math.cos(a) * r + cx,
    Math.sin(a) * r + cy,
]

const dot = (x, y) => draw.circle(2).center(x, y)

const arcPath = (cx, cy, r, a1, a2) => {
  const dif = -Math.sin((a2 - a1) % (4 * Math.PI) / 2)
  let am, p1, p2, p3

  am = (a1 + a2) / 2
  if (dif > 0) am += Math.PI
  p1 = spinXY(cx, cy, r, a1)
  p2 = spinXY(cx, cy, r, am)
  p3 = spinXY(cx, cy, r, a2)

  return new SVG.PathArray([
    ['M', ...p1],
    ['A', r, r, 0, 0, 1, ...p2],
    ['A', r, r, 0, 0, 1, ...p3],
  ])
}
