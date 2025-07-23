"use strict";

import * as Anim from '/js/anim.js'
import * as El from '/js/elements.js'
import * as Ev from '/js/events.js'
import * as Sh from '/js/shapes.js'

// ### Drawings ###
// const D = {
//   unitCircle: () => Shape.arc()
//     .radius(100)
//     .stroke('mediumspringgreen')
//     .fill('transparent')
// }

// ### Scenes ###
function scene10() {
  subtitles.textContent = 'Возьмем круг'
  display.clear()

  const uc = display.arc()
    .radius(50)
    .center(53, 48)
    .stroke('mediumspringgreen')

  let ang = 0
    , k = Anim.ease()

  shot10()
  function shot10() {
    ang = k() * pi2
    uc.draw(0, ang)
    if (ang < pi2) {
      window.requestAnimationFrame(shot10)
      return
    }
    scene20()
  }
}


function scene20() {
  subtitles.textContent = 'и систему координат'
  display.clear()

  const plane = display.plane(Sh.coordList(1, 1, 3.5))
    .opacity(0)
  const uc = display.arc()
    .radius(50)
    .center(53, 48)
    .stroke('mediumspringgreen')

  let k = Anim.ease()

  shot10()
  function shot10() {
    let op = k()
    plane.opacity(op)
    if (op < 1) {
      window.requestAnimationFrame(shot10)
      return
    }
    scene30()
  }
}


function scene30() {
  subtitles.textContent = 'Как считаешь, куда лучше его поместить?'
  display.clear()
  const plane = display.plane(Sh.coordList(0, 0, 3.5))
  const uc = display.arc()
    .radius(50)
    .center(53, 48)
    .stroke('mediumspringgreen')
    .fill('transparent')

  Ev.drag(uc, (x, y) => uc.center(x, y))
}


function scene40() {
  subtitles.textContent = 'Как считаешь, куда лучше его поместить?'
  display.clear()
  const plane = display.plane(Sh.coordList(0, 0, 3.5))
  const uc = display.arc()
    .radius(50)
    .center(53, 48)
}


scene10()
