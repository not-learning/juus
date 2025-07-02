let a1 = 0, a2 = 0, r = 120
const anim = () => {
  arc(0, 0, r, a1, a2).stroke('mediumspringgreen')
  a2 += 0.05, r -= 1
  if (a2 <= 2*Math.PI ) { window.requestAnimationFrame(anim) }
}
anim()

const cc = gPlane()
cc.each((i) => i.stroke('dodgerblue'))
//aaa = arc(0, 0, 100, 0, 2*Math.PI).stroke('mediumspringgreen')

/*for (l of cc.children()) {
  l.gSize(100, 200).gCenter(0, 0)
}*/

//draw.circle(1).stroke('yellow').gCenter(0, 0)

/*SVG.Dot = class extends SVG.Circle {
  center: function (cx, cy) {
    return this.attr({
      radius: 3,
      cx:    cx,
      cy:    cy,
    })
  }
}

SVG.extend(SVG.Container, {
  dot: function(cx, cy) {
    return this.put(new SVG.Dot).center(cx, cy)
  }
})*/

//dd = draw.dot(350, 350).fill("white")
