"use strict";
// TODO sizes for coord

SVG.extend(SVG.G, {
  centerAxes: function(
    cx = this.data('cx'),
    cy = this.data('cy'),
  ) {
    this.children()[0].center(0, cy)
    this.children()[1].center(cx, 0)
    return this.data({cx: cx, cy: cy})
  },


  centelLabel: function(
    cx = this.data('cx'),
    cy = this.data('cy'),
  ) {
    this.center(cx, cy)
    return this.data({cx: cx, cy: cy})
  },


  centerAxesLabels: function(
    cx = this.data('cx'),
    cy = this.data('cy'),
  ) {
    this.children()[0].center(112, cy-7)
    this.children()[1].center(cx+7, 112)
    this.children()[2].center(cx+6, cy-7)
    return this.data({cx: cx, cy: cy})
  },


  centerPlane: function(
    cx = this.data('cx'),
    cy = this.data('cy'),
    scope = this.data('scope'),
  ) {
    const xg = this.children()[0]
        , yg = this.children()[1]
        , delta = 100 / scope
    let x, y, nx = 0, ny = 0
    cx %= delta
    cy %= delta

    for (let i = 0; i < scope * 2 + 2; i++) {
      x = y = i * delta
      if (x + cx < 100) {
        typeof xg.children()[nx] === 'undefined'
        ? xg.add(Shape.coordLines().x.clone().center(x + cx, 0))
        : xg.children()[nx].center(x + cx, 0)
        nx++
      }
      if (i > 0 && -x + cx > -100) {
        typeof xg.children()[nx] === 'undefined'
        ? xg.add(Shape.coordLines().x.clone().center(-x + cx, 0))
        : xg.children()[nx].center(-x + cx, 0)
        nx++
      }
      if (y + cy < 100) {
        typeof yg.children()[ny] === 'undefined'
        ? yg.add(Shape.coordLines().y.clone().center(0, y + cy))
        : yg.children()[ny].center(0, y + cy)
        ny++
      }
      if (i > 0 && -y + cy > -100) {
        typeof yg.children()[ny] === 'undefined'
        ? yg.add(Shape.coordLines().y.clone().center(0, -y + cy))
        : yg.children()[ny].center(0, -y + cy)
        ny++
      }
    }

    while (nx < xg.children().length) {
      xg.children().at(-1).remove()
    }
    while (ny < yg.children().length) {
      yg.children().at(-1).remove()
    }

    return this.data({cx: cx, cy: cy, scope: scope})
  },


  centerCoord: function(
    cx = this.data('cx'),
    cy = this.data('cy'),
    scope = this.data('scope'),
  ) {
    const plane = this.children()[0]
        , axes = this.children()[1]
        , labels = this.children()[2]
    plane.centerPlane(cx, cy, scope)
    axes.centerAxes(cx, cy)
    labels.centerAxesLabels(cx, cy)
    return this.data({cx: cx, cy: cy, scope: scope})
  }
})


// TODO think: named parameters
SVG.extend(SVG.Circle, {
  arcAngles: function(
    a1 = this.data('a1'),
    a2 = this.data('a2'),
  ) {
    const dif = (a2 - a1) % pi2
    let dash = [dif, pi2 - dif]

    switch (true) {
      case a1 === a2:
        dash = [0, 100]; break
      case dif <= 0:
        dash = [pi2 + dif, -dif]; break
    }

    return this
      .attr({
        'stroke-dasharray': dash,
        'stroke-dashoffset': -a1})
      .data({
        a1: a1,
        a2: a2,
      })
  }
})


// display.line(0, -10, 0, 10).stroke('white') // DEV
// display.line(-10, 0, 10, 0).stroke('white')


function spinXY(cx, cy, r, a) {
  return [
    Math.cos(a) * r + cx,
    Math.sin(a) * r + cy,
  ]
}


function ctmInv(x, y) {
  let pt = new SVG.Point(x, y)
  return pt.transform(display.screenCTM().inverse())
}


// ### Shape ###

const Shape = (function() {
const gg = display.group()

function dot() {
  return new SVG.Circle()
  .radius(1)
  .fill('white')
}


function label(str = '') {
  return new SVG.G()
  .add(
    new SVG.Text()
    .text(str)
    .scale(1, -1)
  ).fill('white').stroke('none')
}


function axesLabels(cx = 0, cy = 0) {
  return new SVG.G()
  .add(label('x').center(112, -7))
  .add(label('y').center(7, 112))
  .add(label('0').center(6, -6))
  // .centerAxesLabels(cx, cy)
}


//


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
  return new SVG.G()
  .add(new SVG.Path().plot(
    arrow(-115, cy, 115, cy)
  ))
  .add(new SVG.Path().plot(
    arrow(cx, -115, cx, 115)
  )).fill('white')
}


const coordLines = {
  x: new SVG.Line().plot(0, -100, 0, 100),
  y: new SVG.Line().plot(-100, 0, 100, 0),
}


function coordPlane(cx = 0, cy = 0, scope = 1) {
  const xg = new SVG.G()
      , yg = new SVG.G()
      , gg = new SVG.G()
       .add(xg)
       .add(yg)
       .stroke('grey')
      , delta = 100 / scope
  let x, y
  cx %= delta
  cy %= delta

  for (let i = 0; i < scope * 2 + 2; i++) {
    x = y = i * delta
    if (x + cx < 100) {
      xg.add(coordLines.x.clone().center(x + cx, 0))
    }
    if (i > 0 && -x + cx > -100) {
      xg.add(coordLines.x.clone().center(-x + cx, 0))
    }
    if (y + cy < 100) {
      yg.add(coordLines.y.clone().center(0, y + cy))
    }
    if (i > 0 && -y + cy > -100) {
      yg.add(coordLines.y.clone().center(0, -y + cy))
    }
  }
  return gg
}


// TODO fix: two points at angles < 0.01
function arc(a1 = 0, a2 = pi2) {
  return new SVG.Circle()
  .arcAngles(a1, a2)
  .attr({
    pathLength: pi2})
  .data({
    a1: a1,
    a2: a2,
  })
}


function coord(cx = 0, cy = 0, scope = 1) {
  return new SVG.G()
    .add(coordPlane(cx, cy, scope))
    .add(coordAxes(cx, cy))
    .add(axesLabels(cx, cy).stroke('none'))
}


function drawOnce(shape) {
  if (shape.root() !== null) return shape
  return shape.addTo(gg)
}

return {
  dot: () => drawOnce(dot()),
  label: (str = '') => drawOnce(label(str)),
  axesLabels: (cx = 0, cy = 0) => drawOnce(axesLabels(cx, cy)),
  arrow: (x1, y1, x2, y2) => drawOnce(arrow(x1, y1, x2, y2)),
  arc: (a1 = 0, a2 = pi2) => drawOnce(arc(a1, a2)),
  coordLines: () => coordLines,
  coordPlane: (cx = 0, cy = 0, scope = 1) => drawOnce(coordPlane(cx, cy, scope)),
  coord: (cx = 0, cy = 0, scope = 1) => drawOnce(coord(cx, cy, scope)),
  clear: function() { gg.children().remove() }
}
})()

// const gr = display.group() // DEV
// .add(dot().fill('black'))
// .add(dot().center(4, 0))
