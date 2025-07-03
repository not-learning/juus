const cc = gPlane()
cc.each((i) => i.stroke('dodgerblue'))

let a1 = 0, a2 = 0, r = 100,
  ap = gArcPath(0, 0, r, a1, a2),
  aaa = draw.path(ap).stroke('mediumspringgreen')

const anim = () => {
  a2 += 0.3
  if (a2 > 2 * Math.PI) a2 = 2 * Math.PI
  ap = gArcPath(0, 0, r, a1, a2)
  aaa.plot(ap)
  window.requestAnimationFrame(anim)
  
}
anim()
