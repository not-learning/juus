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

const coordAxes = (cx = 0, cy = 0) => new SVG.List([
  arrow(-115, cy, 115, cy),
  arrow(cx, -115, cx, 115),
])

SVG.extend(SVG.Shape, {
  centerShape: function(cx = 0, cy = 0, scale = 1) {
    this.matrix(1, 0, 0, 1, 0, 0)
      .center(0, 0)
    this.scale(1 / scale)
      .stroke({width: 0.5 * scale})
    this.center(cx * scale, cy * scale)
    return this
  }
})

SVG.extend(SVG.List, {
  centerAxes: function(x, y) {
    this[0].center(0, y)
    this[1].center(x, 0)
    return this
  },

  centerLabels: function(x, y) {
    this.matrix(1, 0, 0, 1, 0, 0)
    this[0].center(112, y - 6)
    this[1].center(x + 6, 112)
    this[2].center(x + 6, y - 6)
    this.scale(1, -1)
    return this
  }
})

SVG.extend(SVG.G, {
  centerPlane: function(cx = 0, cy = 0, scale = 1) {
    const clipRect = this.clipper().children()[0]
    this.matrix(1, 0, 0, 1, 0, 0)
      .center(0, 0)
    clipRect.matrix(1, 0, 0, 1, 0, 0)
      .center(0, 0)
    this.scale(1 / scale)
      .stroke({width: 0.5 * scale})
    clipRect.scale(scale)
    this.center(cx * scale, cy * scale)
    return this
  }
})

// TODO optimise: use symbol or defs
const coordPlane = (cx = 0, cy = 0, scale = 1) => {
  const clip = draw.clip().add(
          draw.rect(199, 199).center(0, 0)
        ),
        gg = draw.group().stroke('grey').clipWith(clip)

  for (let i = -20; i <= 20; i++) {
    gg.add(draw.line(i*100,  -2000, i*100,  2000))
      .add(draw.line( -2000, i*100,  2000, i*100))
  }
  gg.centerPlane(cx, cy, scale)
  return gg
}

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
