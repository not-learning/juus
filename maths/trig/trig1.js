"use strict";

// ### Drawings ###
const D = {
  crd: coord(),
  coord: function() {
    if (this.crd.root() === null) {
      return this.crd.addTo(display)
    }
    return this.crd
  },

  uc: arc()
    .radius(100)
    .stroke('mediumspringgreen'),
  unitCircle: function() {
    if (this.uc.root() === null) {
      return this.uc.addTo(display)
    }
    return this.uc
  },
}


pre10()
function pre10() {
  subtitles.textContent = 'Возьмем круг'
  D.unitCircle()
  .radius(50)
  .center(53, 48)

  let ang = 0
    , k = ease()

  shot10()
  function shot10() {
    ang = k() * pi2
    D.unitCircle().arcAngles(0, ang)
    if (ang < pi2) {
      window.requestAnimationFrame(shot10)
      return
    }
    D.unitCircle().arcAngles(0, pi2)
    pre20()
  }
}


function pre20() {
  subtitles.textContent = 'И поместим в систему координат'
  D.coord().opacity(0)
  .centerCoord(-55, -73, 5.5)
  D.unitCircle()
  .radius(50)
  .center(53, 48)

  let k = ease()

  shot10()
  function shot10() {
    let op = k()
    D.coord().opacity(op)
    if (op < 1) {
      window.requestAnimationFrame(shot10)
      return
    }
    D.coord().opacity(1)
    pre30()
  }
}

function pre30() {
  subtitles.textContent = 'В самый центр'
  D.coord()
  .centerCoord(-55, -73, 5.5)
  D.unitCircle()
  .radius(50)
  .center(53, 48)

  shot10()
  function shot10() {
    
  }
}

  // subtitles.textContent = 'Возьмем систему координат'
  // subtitles.textContent = 'И поместим в систему координат'
  // subtitles.textContent = 'Возьмем круг'
