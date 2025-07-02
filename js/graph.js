const gScale = 120

SVG.Shape.gx = 0
SVG.Shape.gy = 0
SVG.Shape.gcx = 0
SVG.Shape.gcy = 0
SVG.Shape.gw = 0
SVG.Shape.gh = 0
SVG.Shape.gr = 0

SVG.Line.gx1 = 0
SVG.Line.gy1 = 0
SVG.Line.gx2 = 0
SVG.Line.gy2 = 0

const gXY = (x, y) => {
  return {
    x: (1 + x/gScale) * scrW/2,
    ...(typeof y !== 'undefined' && {
      y: (1 - y/gScale) * scrH/2
    }),
  }
}

const gWH = (w, h) => {
  return {
    w: w/gScale * scrW/2,
    ...(typeof h !== 'undefined' && {
      h: h/gScale * scrH/2
    }),
  }
}

SVG.extend(SVG.Shape, {
  gMove: function(gx = this.gx, gy = this.gy) {
    this.gx = gx, this.gy = gy
    let crds = gXY(gx, gy)
    this.move(crds.x, crds.y)
    return this.attr({
      gx: crds.x,
      gy: crds.y,
    })
  },

  gCenter: function(gcx = this.gcx, gcy = this.gcy) {
    this.gcx = gcx, this.gcy = gcy
    let crds = gXY(gcx, gcy)
    this.center(crds.x, crds.y)
    return this.attr({
      cx: crds.x,
      cy: crds.y,
    })
  },

  gSize: function(gw = this.gw, gh = this.gh) {
    this.gw = gw, this.gh = gh
    let sz = gWH(gw, gh)
    this.size(sz.w, sz.h)
    return this.attr({
      width: sz.w,
      height: sz.h,
    })
  },

  gRadius: function(gr = this.gr) {
    this.gr = gr
    let r = gWH(gr).w
    this.radius(r)
    return this.attr({
      r: r,
    })
  },
})

SVG.extend(SVG.Line, {
  gPlot: function(gx1 = this.gx1, gy1 = this.gy1, gx2 = this.gx2, gy2 = this.gy2) {
    this.gx1 = gx1, this.gy1 = gy1
    this.gx2 = gx2, this.gy2 = gy2
    let p1 = gXY(gx1, gy1),
        p2 = gXY(gx2, gy2)
    this.plot(p1.x, p1.y, p2.x, p2.y)
    return this.attr({
      gx1: p1.x, gy1: p1.y,
      gx2: p2.x, gy2: p2.y,
    })
  },
})

/*SVG.extend(SVG.Container, {
  gMove: function(x, y) {
    for (el of this.children())
      el.gMove(x, y)
  },

  gCenter: function(x, y) {
    for (el of this.children())
      el.gCenter(x, y)
  },
})*/
