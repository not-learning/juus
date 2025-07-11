"use strict";

const pi = Math.PI
    , pi2 = 2 * pi
    , pi_2 = pi / 2

const State = {
  op:    0,
  ang:   0,
  planeX:  -63,
  planeY:  -52,
  scale: 4,
  circleX: 67,
  circleY: 53,
  circleR: 34,
  pocAng: pi / 4,
  pocX: function() {
    return Math.cos(this.pocAng) * this.circleR + this.circleX
  },
  pocY: function() {
    return Math.sin(this.pocAng) * this.circleR + this.circleY
  },
}

subtitles.style.opacity = State.op



// ### Shapes ###
const plane = coordPlane()
  .stroke('grey')
plane.centerPlane(State.planeX, State.planeY, State.scale)

const axes = coordAxes()
  .stroke('white').fill('white')
  .centerAxes(State.planeX, State.planeY)

const axesL = axesLabels()
  .centerLabels(State.planeX, State.planeY)

const unitCircle = draw.path()
  .stroke('mediumspringgreen')

const dots = dot(0, 0)



// ### Animations ###
const an1 = ease()
function anim1() {
  subtitles.textContent = 'Возьмем систему координат'

  let k = an1()
    , op = myAnim(k)

  axes.opacity(op*2)
  plane.opacity(op)
  axesL.opacity(op)
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
  subtitles.textContent = 'И поместим в нее круг'

  let k = an2()
    , ang = myAnim(k, 0, pi2)

  unitCircle.plot(arcPath(State.circleX, State.circleY, State.circleR, 0, ang))
  if (k < 1) {
    window.requestAnimationFrame(anim2)
    return
  }

  State.ang = ang
  anim3()
}

// TODO change arc to circle
const an3 = ease()
function anim3() {
  subtitles.textContent = 'В самый центр'

  let k = an3()
    , circleX = myAnim(k, State.circleX, State.planeX),
      circleY = myAnim(k, State.circleY, State.planeY)

  unitCircle.plot(arcPath(circleX, circleY, State.circleR, 0, State.ang))
  if (k < 1) {
    window.requestAnimationFrame(anim3)
    return
  }

  State.circleX = circleX
  State.circleY = circleY
  anim4()
}

const an4 = ease()
function anim4() {
  subtitles.textContent = 'И пусть радиус равен единице'

  let k = an4()
    , r = myAnim(k, State.circleR, 100 / State.scale)

  unitCircle.plot(arcPath(State.circleX, State.circleY, r, 0, State.ang))
  if (k < 1) {
    window.requestAnimationFrame(anim4)
    return
  }

  State.circleR = r
  anim5()
}

const an5 = ease()
function anim5() {
  subtitles.textContent = 'Сделаем покрупнее'

  let k = an5()
    , circleX = myAnim(k, State.circleX, 0)
    , circleY = myAnim(k, State.circleY, 0)
    , dist = myAnim(k, 100 / State.scale, 100)
    , r = myAnim(k, State.circleR, 100)
    , planeX = myAnim(k, State.planeX, 0)
    , planeY = myAnim(k, State.planeY, 0)

  plane.linearCenterPlane(planeX, planeY, dist)
  axes.centerAxes(planeX, planeY)
  axesL.centerLabels(planeX, planeY)
  unitCircle.plot(arcPath(circleX, circleY, r, 0, State.ang))
  if (k < 1) {
    window.requestAnimationFrame(anim5)
    return
  }

  State.circleX = circleX
  State.circleY = circleY
  State.scale = 100 / dist
  State.circleR = r
  State.planeX = planeX
  State.planeY = planeY
  anim6()
}

function anim6() {
  subtitles.textContent = 'У каждой точки на окружности свои координаты'
  const poc = draw.use(dots)
    .stroke('white').fill('white')
    .center(State.pocX(), State.pocY())
}

// anim1()
