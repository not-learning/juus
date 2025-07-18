"use strict";
// TODO sizes for coord

SVG.extend(SVG.G, {
  centerAxes: function(
    cx = this.data('cx'),
    cy = this.data('cy'),
  ) {
    this.findOne('#axisX').center(0, cy)
    this.findOne('#axisY').center(cx, 0)
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
    const lX = this.findOne('#labelX')
        , lY = this.findOne('#labelY')
        , l0 = this.findOne('#label0')
    lX.center(112, cy-7)
    lY.center(cx+7, 112)
    l0.center(cx+6, cy-7)
    return this.data({cx: cx, cy: cy})
  },


  centerPlane: function(
    cx = this.data('cx'),
    cy = this.data('cy'),
    scope = this.data('scope'),
  ) {
    const linesX = this.findOne('#linesX')
        , linesY = this.findOne('#linesY')
        , delta = 100 / scope
    let x, y, nx = 0, ny = 0
    cx %= delta
    cy %= delta

    for (let i = 0; i < scope * 2 + 2; i++) {
      x = y = i * delta
      if (x + cx < 100) {
        typeof linesX.children()[nx] === 'undefined'
        ? linesX.add(Shape.coordLines().x.clone().center(x + cx, 0))
        : linesX.children()[nx].center(x + cx, 0)
        nx++
      }
      if (i > 0 && -x + cx > -100) {
        typeof linesX.children()[nx] === 'undefined'
        ? linesX.add(Shape.coordLines().x.clone().center(-x + cx, 0))
        : linesX.children()[nx].center(-x + cx, 0)
        nx++
      }
      if (y + cy < 100) {
        typeof linesY.children()[ny] === 'undefined'
        ? linesY.add(Shape.coordLines().y.clone().center(0, y + cy))
        : linesY.children()[ny].center(0, y + cy)
        ny++
      }
      if (i > 0 && -y + cy > -100) {
        typeof linesY.children()[ny] === 'undefined'
        ? linesY.add(Shape.coordLines().y.clone().center(0, -y + cy))
        : linesY.children()[ny].center(0, -y + cy)
        ny++
      }
    }

    while (nx < linesX.children().length) {
      linesX.children().at(-1).remove()
    }
    while (ny < linesY.children().length) {
      linesY.children().at(-1).remove()
    }

    return this.data({cx: cx, cy: cy, scope: scope})
  },


  centerCoord: function(
    cx = this.data('cx'),
    cy = this.data('cy'),
    scope = this.data('scope'),
  ) {
    const plane = this.findOne('#plane')
        , axes = this.findOne('#axes')
        , labels = this.findOne('#labels')
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
      .data({a1: a1, a2: a2})
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
  const lX = label('x').center(112, -7).id('labelX')
      , lY = label('y').center(7, 112).id('labelY')
      , l0 = label('0').center(6, -6).id('label0')
  return new SVG.G()
  .add(lX)
  .add(lY)
  .add(l0)
  // .centerAxesLabels(cx, cy)
}


// [1, 2].


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
  const
    ax = new SVG.Path().plot(
      arrow(-115, cy, 115, cy)
    ).id('axisX')
  , ay = new SVG.Path().plot(
      arrow(cx, -115, cx, 115)
    ).id('axisY')
  return new SVG.G()
    .add(ax)
    .add(ay)
    .fill('white')
}


const coordLines = {
  x: new SVG.Line().plot(0, -100, 0, 100),
  y: new SVG.Line().plot(-100, 0, 100, 0),
}


function coordPlane(cx = 0, cy = 0, scope = 1) {
  const linesX = new SVG.G().id('linesX')
      , linesY = new SVG.G().id('linesY')
      , gg = new SVG.G()
      , delta = 100 / scope
  let x, y
  cx %= delta
  cy %= delta

  for (let i = 0; i < scope * 2 + 2; i++) {
    x = y = i * delta
    if (x + cx < 100) {
      linesX.add(coordLines.x.clone().center(x + cx, 0))
    }
    if (i > 0 && -x + cx > -100) {
      linesX.add(coordLines.x.clone().center(-x + cx, 0))
    }
    if (y + cy < 100) {
      linesY.add(coordLines.y.clone().center(0, y + cy))
    }
    if (i > 0 && -y + cy > -100) {
      linesY.add(coordLines.y.clone().center(0, -y + cy))
    }
  }
  return gg
    .add(linesX)
    .add(linesY)
    .stroke('grey')
}


// TODO fix: two points at angles < 0.01
function arc(a1 = 0, a2 = pi2) {
  return new SVG.Circle()
  .arcAngles(a1, a2)
  .attr({
    pathLength: pi2})
  .data({a1: a1, a2: a2})
}


function coord(cx = 0, cy = 0, scope = 1) {
  const plane = coordPlane(cx, cy, scope).id('plane')
      , axes = coordAxes(cx, cy).id('axes')
      , labels = axesLabels(cx, cy).id('labels')
          .stroke('none')
  return new SVG.G()
    .add(plane)
    .add(axes)
    .add(labels)
    .data({cx: cx, cy: cy, scope: scope})
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
  clear: () => gg.clear()
}
})()

// const gr = display.group() // DEV
// .add(dot().fill('black'))
// .add(dot().center(4, 0))
