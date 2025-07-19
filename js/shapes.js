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
    lX.center(112, cy-5)
    lY.center(cx+5, 112)
    l0.center(cx+5, cy-5)
    return this.data({cx: cx, cy: cy})
  },


  centerPlane: function(
    cx = this.data('cx'),
    cy = this.data('cy'),
    scope = this.data('scope'),
  ) {
    const linesX = this.findOne('#linesX')
      , linesY = this.findOne('#linesY')
      , ticksX = this.findOne('#ticksX')
      , ticksY = this.findOne('#ticksY')
      , numbersX = this.findOne('#numbersX')
      , numbersY = this.findOne('#numbersY')
      , obj = coordList(cx, cy, scope)

    let nx = 0, ny = 0

    for (const [i, x] of Object.entries(obj.x)) {
      if (typeof linesX.children()[nx] === 'undefined') {
        linesX.add(Shape.coordLines().x.clone().center(x, 0))
        ticksX.add(new SVG.Line().plot(x, cy - 2, x, cy + 2))
        numbersX.add(Shape.label(i).center(x, cy-5))
      } else {
        linesX.children()[nx].center(x, 0)
        ticksX.children()[nx].center(x, cy)
        numbersX.children()[nx].center(x, cy-5)
          .children()[0].text(i)
      }
      nx++
    }

    for (const [i, y] of Object.entries(obj.y)) {
      if (typeof linesY.children()[ny] === 'undefined') {
        linesY.add(Shape.coordLines().y.clone().center(0, y))
        ticksY.add(new SVG.Line().plot(cx - 2, y, cx + 2, y))
        numbersY.add(Shape.label(i).center(cx-5, y))
      } else {
        linesY.children()[ny].center(0, y)
        ticksY.children()[ny].center(cx, y)
        numbersY.children()[ny].center(cx-5, y)
          .children()[0].text(i)
      }
      ny++
    }

    while (nx < linesX.children().length) {
      linesX.children().at(-1).remove()
      ticksX.children().at(-1).remove()
      numbersX.children().at(-1).remove()
    }
    while (ny < linesY.children().length) {
      linesY.children().at(-1).remove()
      ticksY.children().at(-1).remove()
      numbersY.children().at(-1).remove()
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


// TODO fix
function coordList(cx = 0, cy = 0, scope = 1) {
  const arrX = {}
    , arrY = {}
    , delta = 100 / scope

  let x, y
  cx %= 100
  cy %= 100

  for (let i = 1; i < scope * 2 + 2; i++) {
    x = y = i * delta

    if (cx + x < 100) arrX[i] = cx + x

    if (cx - x > -100) arrX[-i] = cx - x

    if (cy + y < 100) arrY[i] = cy + y

    if (cy - y > -100) arrY[-i] = cy - y
  }
  return { x: arrX, y: arrY }
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


function axesLabels() {
  const lX = label('x').id('labelX')
      , lY = label('y').id('labelY')
      , l0 = label('0').id('label0')
  return new SVG.G()
    .add(lX)
    .add(lY)
    .add(l0)
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


function coordAxes() {
  const
    ax = new SVG.Path().plot(
      arrow(-115, 0, 115, 0)
    ).id('axisX')
  , ay = new SVG.Path().plot(
      arrow(0, -115, 0, 115)
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


function coordPlane() {
  return new SVG.G()
    .add(new SVG.G().id('linesX')
          .stroke('darkslategrey'))
    .add(new SVG.G().id('linesY')
          .stroke('darkslategrey'))
    .add(new SVG.G().id('ticksX'))
    .add(new SVG.G().id('ticksY'))
    .add(new SVG.G().id('numbersX'))
    .add(new SVG.G().id('numbersY'))
}


// TODO fix: two points at angles < 0.01
function arc(a1 = 0, a2 = pi2) {
  return new SVG.Circle()
  .arcAngles(a1, a2)
  .attr({
    pathLength: pi2})
  .data({a1: a1, a2: a2})
}


function coord() {
  const plane = coordPlane().id('plane')
      , axes = coordAxes().id('axes')
      , labels = axesLabels().id('labels')
          .stroke('none')
  return new SVG.G()
    .add(plane)
    .add(axes)
    .add(labels)
    // .data({cx: cx, cy: cy, scope: scope})
}


// TODO naive; think through
function drawOnce(shape) {
  if (shape.root() !== null) return shape
  return shape.addTo(gg)
}


return {
  dot: () => drawOnce(dot()),
  label: (str = '') => drawOnce(label(str)),
  axesLabels: () => drawOnce(axesLabels()),
  arrow: (x1, y1, x2, y2) => drawOnce(arrow(x1, y1, x2, y2)),
  arc: (a1 = 0, a2 = pi2) => drawOnce(arc(a1, a2)),
  coordLines: () => coordLines,
  coordPlane: () => drawOnce(coordPlane()),
  coord: () => drawOnce(coord()),
  clear: () => gg.clear()
}
})()

// const gr = display.group() // DEV
// .add(dot().fill('black'))
// .add(dot().center(4, 0))
