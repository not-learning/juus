"use strict";

SVG.extend(SVG.G, {
  centerAxes: function(x, y) {
    this.children()[0].center(0, y)
    this.children()[1].center(x, 0)
    return this
  },

  centerLabels: function(x, y) {
    this.children()[0].center(0, y)
    this.children()[1].center(x, 0)
    this.children()[2].center(x, y)
    return this
  },

  centerPlane: function(cx = 0, cy = 0, scope = 1) {
    const xl = this.children()[0].children()
        , yl = this.children()[1].children()
        , delta = 100 / scope
    let x, y, nx = 0, ny = 0
    cx %= delta
    cy %= delta

    for (let i = 0; i < scope * 2 + 2; i++) {
      x = y = i * delta
      if (x + cx < 100) {
        typeof xl[nx] === 'undefined'
        ? xl.add(draw.use(coordLines[0]).center(x + cx, 0))
        : xl[nx].center(x + cx, 0)
        nx++
      }
      if (i > 0 && -x + cx > -100) {
        typeof xl[nx] === 'undefined'
        ? xl.add(draw.use(coordLines[0]).center(-x + cx, 0))
        : xl[nx].center(-x + cx, 0)
        nx++
      }
      if (y + cy < 100) {
        typeof yl[ny] === 'undefined'
        ? yl.add(draw.use(coordLines[1]).center(0, y + cy))
        : yl[ny].center(0, y + cy)
        ny++
      }
      if (i > 0 && -y + cy > -100) {
        typeof yl[ny] === 'undefined'
        ? yl.add(draw.use(coordLines[1]).center(0, -y + cy))
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
    return this
  },

  centerCoord: function(cx = 0, cy = 0, scope = 1) {
    const plane = this.children()[0]
        , axes = this.children()[1]
        , labels = this.children()[2]
    plane.centerPlane(cx, cy, scope)
    axes.centerAxes(cx, cy)
    labels.centerLabels(cx, cy)
    return this
  }
})


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
  return draw.group()
  .add(draw.path(arrow(-115, cy, 115, cy)))
  .add(draw.path(arrow(cx, -115, cx, 115)))
}


const coordLines = draw.group()
  .add(draw.line().plot(0, -100, 0, 100))
  .add(draw.line().plot(-100, 0, 100, 0))
  .addTo(draw.defs())


function coordPlane(cx = 0, cy = 0, scope = 1) {
  const xg = draw.group()
      , yg = draw.group()
      , gg = draw.group()
             .add(xg)
             .add(yg)
      , delta = 100 / scope
  let x, y
  cx %= delta
  cy %= delta

  for (let i = 0; i < scope * 2 + 2; i++) {
    x = y = i * delta
    if (x + cx < 100) {
      xg.add(draw.use(coordLines.children()[0]).center(x + cx, 0))
    }
    if (i > 0 && -x + cx > -100) {
      xg.add(draw.use(coordLines.children()[0]).center(-x + cx, 0))
    }
    if (y + cy < 100) {
      yg.add(draw.use(coordLines.children()[1]).center(0, y + cy))
    }
    if (i > 0 && -y + cy > -100) {
      yg.add(draw.use(coordLines.children()[1]).center(0, -y + cy))
    }
  }
  return gg
}


function label(text, x = 0, y = 0) {
  return draw.defs().text(text).center(x, y).scale(1, -1)
}


function axesLabels(cx = 0, cy = 0) {
  return draw.group()
  .add(draw.use(label('x', 112, -7)))
  .add(draw.use(label('y', 7, 112)))
  .add(draw.use(label('0', 6, -6)))
  .centerLabels(cx, cy)
}


function coord(cx = 0, cy = 0, scope = 1) {
  return draw.group()
    .add(coordPlane(cx, cy, scope))
    .add(coordAxes(cx, cy))
    .add(axesLabels(cx, cy))
}


function dot(x, y) {
  return draw.defs().circle(2).center(x, y)
}


function spinXY(cx, cy, r, a) {
  return [
    Math.cos(a) * r + cx,
    Math.sin(a) * r + cy,
  ]
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
