subtitles.style.opacity = 0

const pi2 = 2 * Math.PI

let op = 0
  , ang = 0
  , px = -50
  , py = -30
  , scale = 6
  , cx = 10
  , cy = 30
  , r = 50

const plane = coordPlane()
  .stroke('grey')
  .centerPlane(px, py, scale)

const axes = coordAxes()
  .stroke('white')
  .centerAxes(px, py)

const axesL = axesLabels()
  .centerLabels(px, py)

const circle = draw.path()
  .stroke('mediumspringgreen')

function anim1() {
  op += 0.01
  axes.opacity(op*2)
  plane.opacity(op)
  axesL.opacity(op)
  subtitles.textContent = 'Возьмем систему координат'
  subtitles.style.opacity = op
  if (op < 1) {
    window.requestAnimationFrame(anim1)
    return
  }
  anim2()
}
anim1()

function anim2() {
  ang += 0.2
  ang = Math.min(pi2, ang)
  circle.plot(arcPath(cx, cy, r, 0, ang))
  subtitles.textContent = 'И поместим в нее круг'
  if (ang < pi2) {
    window.requestAnimationFrame(anim2)
    return
  }
  anim3()
}

function anim3() {
  // cx -= 
}

/*let a1 = 0, a2 = 0, r = 100, sc = 1
  , ap = arcPath(0, 0, r, a1, a2)
  , circle = draw.path(ap).stroke('mediumspringgreen')
    // .animate(1000).plot(arcPath(0, 0, r, 0, 2*Math.PI))
  , d2 = dot(...spinXY(0, 0, 100, a2)).stroke('white').fill('black')
  , dd = dot(...spinXY(0, 0, 100, a2)).stroke('white').fill('white')

const anim = () => {
  a2 += 0.0001
  sc = (Math.sin(a2) * Math.sin(a2) * 4.5) + 5
    // , a1 = hand(hr)
  // if (a2 > 2 * Math.PI) a2 = 2 * Math.PI
  axes.centerAxes(...spinXY(0, 0, 100, a2))
  plane.centerPlane(...spinXY(0, 0, 100, a2), sc)
  axesL.centerLabels(...spinXY(0, 0, 100, a2), sc)
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
anim2()*/
