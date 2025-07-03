const gArrow = (x1, y1, x2, y2) => {
  return draw.line()
    .plot(...gXY(x1, y1), ...gXY(x2, y2))
    .marker('end', 26, 10, function(add) {
      add.path('m 0, 2 l 13, 3 l -13, 3')
        .stroke({width: 1})
        .stroke('context-stroke')
        //.fill('context-stroke')
    })
}

const gPlane = () => {
  let ll = new SVG.List()
  ll.push(
    gArrow(-115, 0, 115, 0)
      .stroke('dodgerblue'),
    gArrow(0, -115, 0, 115)
      .stroke('dodgerblue'),
  )
  return ll
}

const spinXY = (cx, cy, r, a) => {
  return [
    Math.cos(a) * r + cx,
    Math.sin(a) * r + cy,
  ]
}

const gDot = (x, y) => draw.circle(7).center(x, y)

const arcPath = (cx, cy, r, a1, a2) => {
  const dif = Math.sin((a2 - a1) % (4 * Math.PI) / 2)
  let am, p1, p2, p3

  am = (a1 + a2) / 2
  if (dif > 0) am += Math.PI
  p1 = spinXY(cx, cy, r, a1)
  p2 = spinXY(cx, cy, r, am)
  p3 = spinXY(cx, cy, r, a2)

  return new SVG.PathArray([
    ['M', ...p1],
    ['A', r, r, 0, 0, 0, ...p2],
    ['A', r, r, 0, 0, 0, ...p3],
  ])
}

const gArcPath = (cx, cy, r, a1, a2) => arcPath(...gXY(cx, cy), gWH(r), -a1, -a2)
