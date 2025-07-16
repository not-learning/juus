"use strict";

// ### Drawings ###
const D = {
  unitCircle: () => Shape.arc()
    .radius(100)
    .stroke('mediumspringgreen'),
}


// ### Shots ###
pre10()
function pre10() {
  subtitles.textContent = 'Возьмем круг'
  Shape.clear()
  const uc = D.unitCircle()
    .radius(50)
    .center(53, 48)

  let ang = 0
    , k = ease()

  shot10()
  function shot10() {
    ang = k() * pi2
    uc.arcAngles(0, ang)
    if (ang < pi2) {
      window.requestAnimationFrame(shot10)
      return
    }
    uc.arcAngles(0, pi2)
    pre20()
  }
}


function pre20() {
  subtitles.textContent = 'И поместим в систему координат'
  Shape.clear()
  const crd = Shape.coord()
    .opacity(0)
    .centerCoord(-55, -73, 2.5)
  const uc = D.unitCircle()
    .radius(50)
    .center(53, 48)

  let k = ease()

  shot10()
  function shot10() {
    let op = k()
    crd.opacity(op)
    if (op < 1) {
      window.requestAnimationFrame(shot10)
      return
    }
    crd.opacity(1)
    pre30()
  }
}

function pre30() {
  subtitles.textContent = 'В самый центр'
  Shape.clear()
  const crd = Shape.coord()
    .centerCoord(-55, -73, 2.5)
  const uc = D.unitCircle()
    .radius(50)
    .center(53, 48)

  let eez = ease()
    , startCrdX = crd.attr('cx')
    , startCrdY = crd.attr('cy')
    , startUcX = uc.attr('cx')
    , startUcY = uc.attr('cy')

  shot10()
  function shot10() {
    const k = eez()
      , crdX = myAnim(k, startCrdX, 0)
      , crdY = myAnim(k, startCrdY, 0)
      , ucX = myAnim(k, startUcX, 0)
      , ucY = myAnim(k, startUcY, 0)
    crd.centerCoord(crdX, crdY)
    uc.center(ucX, ucY)
    if (k < 1) {
      window.requestAnimationFrame(shot10)
      return
    }
    console.log('done')
  }
}

  // subtitles.textContent = 'Возьмем систему координат'
  // subtitles.textContent = 'И поместим в систему координат'
  // subtitles.textContent = 'Возьмем круг'
