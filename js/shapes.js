"use strict";

SVG.extend(SVG.List, {
  centerAxes: function(x, y) {
    this[0].center(0, y)
    this[1].center(x, 0)
    return this
  },

  centerLabels: function(x, y) {
    this.matrix(1, 0, 0, 1, 0, 0)
    this[0].center(112, y - 7)
    this[1].center(x + 6, 112)
    this[2].center(x + 6, y - 7)
    this.scale(1, -1)
    return this
  }
})


// TODO move clip to root svg
SVG.extend(SVG.G, {
  centerPlane: function(cx = 0, cy = 0, scale = 1) {
    let n, x, y
      , kids = this.children()
    for (let i = 0; i < kids.length; i += 2) {
      n = (i - 40) * 50 / scale
      x = n + cx
      y = n + cy
      kids[i].center(x, 0)
      kids[i+1].center(0, y)
    }
  },

  linearCenterPlane: function(cx = 0, cy = 0, dist = 1) {
    let n, x, y
      , kids = this.children()
    for (let i = 0; i < kids.length; i += 2) {
      n = dist * (i - 40) / 2
      x = n + cx
      y = n + cy
      kids[i].center(x, 0)
      kids[i+1].center(0, y)
    }
  }
})


function spinXY(cx, cy, r, a) {
  return [
    Math.cos(a) * r + cx,
    Math.sin(a) * r + cy,
  ]
}

function arrow(x1, y1, x2, y2) {
  const tw = 1, tl = 5 // arrow tip width, length
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


// TODO optimise: use symbol or defs
function coordPlane(cx = 0, cy = 0, scale = 1) {
  const clip = draw.clip().add(
          draw.rect(199, 199).center(0, 0)
        ),
        gg = draw.group().stroke('grey').clipWith(clip)

  for (let i = -20; i <= 20; i++) {
    gg.add(draw.line(i*100,  -100, i*100,  100))
      .add(draw.line( -100, i*100,  100, i*100))
  }
  gg.centerPlane(cx, cy, scale)
  return gg
}


function label(text, x, y) {
  return draw.text(text).center(x, y).scale(1, -1)
}


function axesLabels() {
  return new SVG.List([
    label('x', 112, -7),
    label('y', 7, 112),
    label('0', 6, -6),
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
