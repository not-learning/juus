const gArrow = (x1, y1, x2, y2) =>
  draw.line()
  .plot(...gXY(x1, y1), ...gXY(x2, y2))
  .marker('end', 26, 10, function(add) {
    add.path('m 0, 2 l 13, 3 l -13, 3')
      .stroke({width: 1})
      .stroke('context-stroke')
      //.fill('context-stroke')
  })

// const tickH = (x, y, s) =>
//   draw.line(0, 0, s, 0)
//   .center(x, y)
//   .stroke('dodgerblue')

// const tickV = (x, y, s) =>
//   draw.line(0, 0, 0, s)
//   .center(x, y)
//   .stroke('dodgerblue')

// for (i = -10; i < 11; i++) {
//   tickH(...gXY(0, 10*i), gWH(5))
//   tickV(...gXY(10*i, 0), gWH(5))
//   if (i % 5 === 0) {
//     tickH(...gXY(0, 10*i), gWH(10))
//     tickV(...gXY(10*i, 0), gWH(10))
//   }
// }

// draw.text('0.5').center(...gXY(50, -10)).fill('white')

// const tickL = (x, y, label) => 

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
