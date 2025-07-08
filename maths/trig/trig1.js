const pi2 = 2 * Math.PI,
      pi_2 = Math.PI / 2

const State = {
  op:    0,
  ang:   0,
  px:  -50,
  py:  -30,
  scale: 7,
  cx:   60,
  cy:   50,
  r:    30,
}

const L = {}

subtitles.style.opacity = 0

function lin(spd = 0.01) {
  let n = 0
  return function() {
    return n = Math.min(1, n + spd)
  }
}

function ease(spd = 0.05) {
  let n = -pi_2, m = 0
  return function() {
    n = Math.min(pi_2, n + spd)
    return (Math.atan(1 * Math.sin(n)) / Math.atan(1) + 1) / 2
  }
}

function myAnim(k, start = 0, finish = 1) {
  return start + (finish - start) * k
}

const plane = coordPlane()
  .stroke('grey')
  .centerPlane(State.px, State.py, State.scale)

const axes = coordAxes()
  .stroke('white')
  .centerAxes(State.px, State.py)

const axesL = axesLabels()
  .centerLabels(State.px, State.py)

const circle = draw.path()
  .stroke('mediumspringgreen')

// ### Animations ###
const an1 = ease()
function anim1() {
  k = an1()
  let op = myAnim(k)
  axes.opacity(op*2)
  plane.opacity(op)
  axesL.opacity(op)
  subtitles.textContent = 'Возьмем систему координат'
  subtitles.style.opacity = op
  if (k < 1) {
    window.requestAnimationFrame(anim1)
    return
  }
  State.op = op
  anim2()
}

const an2 = ease()
function anim2() {
  k = an2()
  let ang = myAnim(k, 0, pi2)
  circle.plot(arcPath(State.cx, State.cy, State.r, 0, ang))
  subtitles.textContent = 'И поместим в нее круг'
  if (k < 1) {
    window.requestAnimationFrame(anim2)
    return
  }
  State.ang = ang
  anim3()
}

const an3 = ease()
function anim3() {
  k = an3()
  let px = myAnim(k, State.px, 0)
    , py = myAnim(k, State.py, 0)
    , cx = myAnim(k, State.cx, 0)
    , cy = myAnim(k, State.cy, 0)
  plane.centerPlane(px, py, State.scale)
  axes.centerAxes(px, py)
  axesL.centerLabels(px, py)
  circle.plot(arcPath(cx, cy, State.r, 0, State.ang))
  subtitles.textContent = 'В самый центр'
  if (k < 1) {
    window.requestAnimationFrame(anim3)
    return
  }
  State.px = px
  State.py = py
  State.cx = cx
  State.cy = cy
  anim4()
}

const an4 = ease()
function anim4() {
  k = an4()
  let r = myAnim(k, State.r, 100 / State.scale)
  circle.plot(arcPath(State.cx, State.cy, r, 0, State.ang))
  subtitles.textContent = 'И пусть радиус равен единице'
  if (k < 1) {
    window.requestAnimationFrame(anim4)
    return
  }
  State.r = r
  // anim5()
}

const an5 = lin()
function anim5() {
  k = an5()
  let scale = myAnim(k, State.scale, 1)
  plane.centerPlane(State.px, State.py, scale)
  axes.centerAxes(State.px, State.py)
  axesL.centerLabels(State.px, State.py)
  circle.scale(1/scale)
  subtitles.textContent = 'Сделаем покрупнее'
  if (k < 1) {
    window.requestAnimationFrame(anim5)
    return
  }
  State.scale = scale
  anim6()
}

function anim6() {
  
}

anim1()
