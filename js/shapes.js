"use strict";

SVG.extend(SVG.List, {
  centerAxes: function(x, y) {
    this[0].center(0, y)
    this[1].center(x, 0)
    return this
  },

  centerPlane: function(cx, cy, scope) {
    const xl = this[0]
        , yl = this[1]
        , delta = 100 / scope
    let x, y, nx = 0, ny = 0
    cx %= delta
    cy %= delta

    for (let i = 0; i < scope * 2 + 2; i++) {
      x = y = i * delta
      if (x + cx < 100) {
        typeof xl[nx] === 'undefined'
        ? xl.push(draw.use(coordLines[0]).center(x + cx, 0))
        : xl[nx].center(x + cx, 0)
        nx++
      }
      if (i > 0 && -x + cx > -100) {
        typeof xl[nx] === 'undefined'
        ? xl.push(draw.use(coordLines[0]).center(-x + cx, 0))
        : xl[nx].center(-x + cx, 0)
        nx++
      }
      if (y + cy < 100) {
        typeof yl[ny] === 'undefined'
        ? yl.push(draw.use(coordLines[1]).center(0, y + cy))
        : yl[ny].center(0, y + cy)
        ny++
      }
      if (i > 0 && -y + cy > -100) {
        typeof yl[ny] === 'undefined'
        ? yl.push(draw.use(coordLines[1]).center(0, -y + cy))
        : yl[ny].center(0, -y + cy)
        ny++
      }
    }
    for (let i = nx; i < xl.length; i++) {
      xl[i].remove()
    }
    for (let i = ny; i < yl.length; i++) {
      yl[i].remove()
    }
    xl.splice(nx)
    yl.splice(ny)
    return this
  },

  centerLabels: function(x, y) {
    // this.matrix(1, 0, 0, 1, 0, 0)
    this[0].center(0, y)
    this[1].center(x, 0)
    this[2].center(x, y)
    // this.scale(1, -1)
    return this
  }
})


function spinXY(cx, cy, r, a) {
  return [
    Math.cos(a) * r + cx,
    Math.sin(a) * r + cy,
  ]
}


function arrow(x1, y1, x2, y2) {
  const tw = 1, tl = 5 // arrow tip half width, length
      , w = x2 - x1
      , h = y2 - y1
      , l = Math.hypot(w, h)
  if (l === 0) return ''

  const cl = w / l * tl
      , sl = h / l * tl
      , cw = w / l * tw
      , sw = h / l * tw

  return new SVG.PathArray([
    ['M', x1, y1],
    ['L', x2, y2],
    ['l', -cl + sw, -sl - cw],
    ['l', -sw - sw, cw + cw],
    ['L', x2, y2],
  ])
}


function coordAxes(cx = 0, cy = 0) {
  return new SVG.List([
    draw.path(arrow(-115, cy, 115, cy)),
    draw.path(arrow(cx, -115, cx, 115)),
  ])
}


const coordLines = new SVG.List([
  new SVG.Line().plot(0, -100, 0, 100),
  new SVG.Line().plot(-100, 0, 100, 0),
])
for (const it of coordLines) {
  draw.defs().add(it)
}


function coordPlane(cx = 0, cy = 0, scope = 1) {
  const xl = new SVG.List()
      , yl = new SVG.List()
      , ll = new SVG.List([xl, yl])
      , delta = 100 / scope
      // , f = i => i * 100 / scope
  let x, y
  cx %= delta
  cy %= delta

  for (let i = 0; i < scope * 2 + 2; i++) {
    x = y = i * delta
    if (x + cx < 100) {
      xl.push(draw.use(coordLines[0]).center(x + cx, 0))
    }
    if (i > 0 && -x + cx > -100) {
      xl.push(draw.use(coordLines[0]).center(-x + cx, 0))
    }
    if (y + cy < 100) {
      yl.push(draw.use(coordLines[1]).center(0, y + cy))
    }
    if (i > 0 && -y + cy > -100) {
      yl.push(draw.use(coordLines[1]).center(0, -y + cy))
    }
  }
  return ll
}


function label(text, x = 0, y = 0) {
  return draw.defs().text(text).center(x, y).scale(1, -1)
}


function axesLabels() {
  return new SVG.List([
    draw.use(label('x', 112, -7)),
    draw.use(label('y', 7, 112)),
    draw.use(label('0', 6, -6)),
  ]).each(i => i.fill('white'))
}


function dot(x, y) {
  return draw.defs().circle(2).center(x, y)
}


function arcPath(cx, cy, r, a1, a2) {
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
