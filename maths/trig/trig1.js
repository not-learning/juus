const plane = coordPlane()
  .stroke('grey')
  .centerPlane(0, 0, 3.5)

// TODO scale in plane
const axes = coordAxes()
  .stroke('white')
  .centerAxes(0, 0)

const axesL = axesLabels()

let a1 = 0, a2 = 0, r = 100
  , ap = arcPath(0, 0, r, a1, a2)
  , circle = draw.path(ap).stroke('mediumspringgreen')
  , d2 = dot(...spinXY(0, 0, 100, a2)).stroke('white').fill('black')
  , dd = dot(...spinXY(0, 0, 100, a2)).stroke('white').fill('white')
    //.animate(2000).plot(arcPath(0, 0, r, 0, 2*Math.PI))

const anim = () => {
  // a1 += 0.001
  a2 += 0.01
  // if (a2 > 2 * Math.PI) a2 = 2 * Math.PI
  // axes.centerAxes(...spinXY(0, 0, 100, a2))
  // plane.centerPlane(...spinXY(0, 0, 350, a2), 3.5)
  dd.center(...spinXY(0, 0, 100, a2))
  d2.center(...spinXY(0, 0, 100, a1))
  circle.plot(arcPath(0, 0, r, a1, a2))
  window.requestAnimationFrame(anim)
}
anim()

let op = 0
const anim2 = () => {
  op += 0.03
  if (op >= 1) { op = 1 }
  axes.opacity(op*3)
  circle.opacity(op*3)
  // axesL.opacity(op)
  window.requestAnimationFrame(anim2)
}
anim2()
