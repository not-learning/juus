const coord = coordPlane()
coord.each((i) => i.stroke('dodgerblue'))//.size(50, 50).center(-10, -10)

const axesL = axesLabels()

let a1 = 0, a2 = 0, r = 100
  , ap = arcPath(0, 0, r, a1, a2)
  , aaa = draw.path(ap).stroke('mediumspringgreen')
  , dd = dot(...spinXY(0, 0, 100, a2)).stroke('white').fill('white')
  , d2 = dot(...spinXY(0, 0, 100, a2)).stroke('white').fill('black')
    //.animate(2000).plot(arcPath(0, 0, r, 0, 2*Math.PI))

const anim = () => {
  a1 += 0.001
  a2 += 0.003
  // if (a2 > 2 * Math.PI) a2 = 2 * Math.PI
  dd.center(...spinXY(0, 0, 100, a2))
  d2.center(...spinXY(0, 0, 100, a1))
  aaa.plot(arcPath(0, 0, r, a1, a2))
  window.requestAnimationFrame(anim)
}
anim()

let op = 0
const anim2 = () => {
  op += 0.03
  coord.opacity(op*3)
  aaa.opacity(op*3)
  axesL.opacity(op)
  if (op >= 1) { op = 1 }
  window.requestAnimationFrame(anim2)
}
anim2()
