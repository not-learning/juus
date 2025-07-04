const coord = gPlane()
coord.each((i) => i.stroke('dodgerblue'))

let a1 = 0, a2 = 0, r = 100,
  ap = gArcPath(0, 0, r, a1, a2),
  aaa = draw.path(ap).stroke('mediumspringgreen')
    //.animate(2000).plot(gArcPath(0, 0, r, 0, 2*Math.PI))

const anim = () => {
  a2 += 0.03
  if (a2 > 2 * Math.PI) a2 = 2 * Math.PI
  ap = gArcPath(0, 0, r, a1, a2)
  aaa.plot(ap)
  window.requestAnimationFrame(anim)
  
}
anim()

let op = 0
const anim2 = () => {
  op += 0.01
  coord.opacity(op)
  if (op >= 1) { op = 1 }
  window.requestAnimationFrame(anim2)
}
anim2()