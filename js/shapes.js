"use strict";
// TODO sizes for coord?

export function spinXY(cx, cy, r, a) {
  return [
    Math.cos(a) * r + cx,
    Math.sin(a) * r + cy,
  ]
}


export function coordList(cx = 0, cy = 0, scope = 1) {
  const xx = {}
    , yy = {}
    , delta = 100 / scope
    , res = { cx: cx, cy: cy, scope: scope }

  let x, y
  cx %= 100
  cy %= 100

  for (let i = 1; i < scope * 2 + 2; i++) {
    x = y = i * delta
    if (cx + x < 100) xx[i] = cx + x
    if (cx - x > -100) xx[-i] = cx - x
    if (cy + y < 100) yy[i] = cy + y
    if (cy - y > -100) yy[-i] = cy - y
  }
  res.x = xx
  res.y = yy
  return res
}


// ### Shapes ###

SVG.Dot = class extends SVG.Circle {
  pos(x, y) {
    return this.center(x, y)
      .radius(1)
      .fill('white')
  }
}


SVG.Arc = class extends SVG.Circle {
  draw(a1 = 0, a2 = pi2) {
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
        pathLength: pi2,
        'stroke-dasharray': dash,
        'stroke-dashoffset': -a1,
      })
  }
}


SVG.Label = class extends SVG.Text {
  text(str) {
    if (typeof str === 'undefined') return super.text()
    const txt = super.text(str)
    return txt
      .stroke('none')
      .matrix(1, 0, 0, -1, 0, 0)
  }

  center(cx, cy) {
    return super.center(cx, -cy)
  }
}


// TODO use PathArray
SVG.Arrow = class extends SVG.Path {
  plot(x1, y1, x2, y2) {
    if (typeof x1 === 'undefined') return super.plot()

    const tw = 1, tl = 5 // arrow tip half width, length
      , w = x2 - x1
      , h = y2 - y1
      , l = Math.hypot(w, h)
    if (l === 0) return ''

    const cl = w / l * tl
      , sl = h / l * tl
      , cw = w / l * tw
      , sw = h / l * tw

    return super.plot([
      ['M', x1, y1],
      ['L', x2, y2],
      ['l', -cl + sw, -sl - cw],
      ['l', -sw - sw, cw + cw],
      ['L', x2, y2],
    ]).attr({'paint-order': 'stroke'})
      // .fill('currentColor')
      .attr({x1: x1, y1: y1, x2: x2, y2: y2})
  }

  move(x, y) {
    const {x1, y1, x2, y2} = this.attr()
      , w = x2 - x1
      , h = y2 - y1
    if (x2 < x1) x += w
    if (y2 < y1) y += h
    return super.move(x, y)
      .attr({
        x1: x, y1: y,
        x2: x + w,
        y2: y + h,
      })
  }

  center(cx, cy) {
    const {x1, y1, x2, y2} = this.attr()
      , w_2 = (x2 - x1) / 2
      , h_2 = (y2 - y1) / 2
      , x = cx - w_2
      , y = cy - h_2
    return this.move(x, y)
      .attr({
        x1: x, y1: y,
        x2: cx + w_2,
        y2: cy + h_2,
      })
  }
}


SVG.AxesLines = class extends SVG.Path {
  plot(crds) {
    this.ll = []
    for (const [i, x] of Object.entries(crds.x)) {
      this.ll = [
        ...this.ll,
        ['M', x, -100],
        ['l', 0, 200]
      ]
    }
    for (const [i, y] of Object.entries(crds.y)) {
      this.ll = [
        ...this.ll,
        ['M', -100, y],
        ['l', 200, 0]
      ]
    }
    return super
      .plot(this.ll)
      .stroke('darkslategrey')
      .attr({
        cx: crds.cx,
        cy: crds.cy,
        scope: crds.scope
      })
  }

  center(cx, cy) {
    this.plot(coordList(cx, cy, this.attr('scope')))
  }
}


SVG.Axes = class extends SVG.Path {
  plot(cx, cy) {
    if (typeof cx === 'undefined') return super.plot()

    const ax = new SVG.Arrow()
      .plot(-115, cy, 115, cy)
      .plot()
    const ay = new SVG.Arrow()
      .plot(cx, -115, cx, 115)
      .plot()

    return super
      .plot([...ax, ...ay])
      .fill('white')
      .attr({'paint-order': 'stroke'})
      .attr({cx: cx, cy: cy})
  }

  // move(cx, cy) { return this.plot(cx, cy) }
  center(cx, cy) { return this.plot(cx, cy) }
}


SVG.AxesLabels = class extends SVG.G {
  l0 = this.label('0')
  lx = this.label('x')
  ly = this.label('y')

  center(cx = 0, cy = 0) {
    this.l0.center(cx + 5, cy - 5)
    this.lx.center(112, cy - 5)
    this.ly.center(cx + 5, 112)
    return this
      .fill('white')
      .attr({cx: cx, cy: cy})
  }
}


SVG.Ticks = class extends SVG.Path {
  plot(crds) {
    this.ll = []
    for (const [i, x] of Object.entries(crds.x)) {
      this.ll = [
        ...this.ll,
        ['M', x, crds.cy - 2],
        ['l', 0, 4]
      ]
    }
    for (const [i, y] of Object.entries(crds.y)) {
      this.ll = [
        ...this.ll,
        ['M', crds.cx - 2, y],
        ['l', 4, 0]
      ]
    }
    return super
      .plot(this.ll)
      .stroke('white')
      .attr({
        cx: crds.cx,
        cy: crds.cy,
        scope: crds.scope
      })
  }

  center(cx, cy) {
    this.plot(coordList(cx, cy, this.attr('scope')))
  }
}


SVG.AxesNumbers = class extends SVG.G {
  write(crds) {
    this.clear()
    for (const [i, x] of Object.entries(crds.x)) {
      this.label(i).center(x, crds.cy - 5)
    }
    for (const [i, y] of Object.entries(crds.y)) {
      this.label(i).center(crds.cx - 5, y)
    }
    return this
      .fill('white')
      .attr({
        cx: crds.cx,
        cy: crds.cy,
        scope: crds.scope
      })
  }

  center(cx, cy) {
    return this.write(coordList(cx, cy, this.attr('scope')))
  }
}


SVG.Plane = class extends SVG.G {
  graph(crds) {
    this.clear()
    this.axesLines(crds)
    this.axes(crds.cx, crds.cy)
    this.axesLabels(crds.cx, crds.cy)
    this.ticks(crds)
    this.axesNumbers(crds)
    return this.attr({
        cx: crds.cx,
        cy: crds.cy,
        scope: crds.scope
      })
  }

  center(cx, cy) {
    return this.graph(coordList(cx, cy, this.attr('scope')))
  }
}


SVG.extend(SVG.Container, {
  plane(crds) {
    return this.put(new SVG.Plane).graph(crds)
  },
  dot(x, y) {
    return this.put(new SVG.Dot).pos(x, y)
  },
  arc(a1, a2) {
    return this.put(new SVG.Arc).draw(a1, a2)
  },
  label(str) {
    return this.put(new SVG.Label).text(str)
  },
  arrow(x1, y1, x2, y2) {
    return this.put(new SVG.Arrow).plot(x1, y1, x2, y2)
  },
  axesLines(crds) {
    return this.put(new SVG.AxesLines).plot(crds)
  },
  axes(cx, cy) {
    return this.put(new SVG.Axes).plot(cx, cy)
  },
  axesLabels(cx, cy) {
    return this.put(new SVG.AxesLabels).center(cx, cy)
  },
  ticks(crds) {
    return this.put(new SVG.Ticks).plot(crds)
  },
  axesNumbers(crds) {
    return this.put(new SVG.AxesNumbers).write(crds)
  }
})
