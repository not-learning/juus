"use strict";

import * as Anim from '/js/anim.js'
import * as El from '/js/elements.js'
import * as Ev from '/js/events.js'
import * as Sh from '/js/shapes.js'
import * as Dr from '/js/draw.js'

const concise = false


// ### Drawings ###
const D = {}
// scene10()
// ### Scenes ###
function scene10() {
  subtitles.textContent = 'Представь весы'
  display.clear()

  const cup = display.path('M -10 20 ')

  const k = Anim.ease()
  let ang = 0

  shot10()
  function shot10() {
    ang = k() * pi2
    if (ang < pi2) {
      window.requestAnimationFrame(shot10)
      return
    }
    scene20()
  }
}


function scene20() {
  subtitles.textContent = 'На одной чаше арбуз'
  display.clear()


  const k = Anim.ease()

  shot10()
  function shot10() {
    let op = k()
    plane.opacity(op)
    if (op < 1) {
      window.requestAnimationFrame(shot10)
      return
    }
    if (concise) {
      scene40()
    } else {
      scene30()
    }
  }
}


// TODO Scenes 30
function scene30() {
  subtitles.textContent = 'На другой три гирьки по пять килограмм'
  display.clear()
  const plane = display.plane(Sh.coordList(0, 0, 3.5))
  const uc = D.uc()
    .radius(50)
    .center(53, 48)
  const cx = Math.abs(uc.attr('cx'))
    , cy = Math.abs(uc.attr('cy'))

  const rl = display.button('S') // DEV
    .act(() => window.location.reload(true))
    .center(-110, 110)

  const fs = display.button('🪟')
    .stroke('none')
    .act(() => document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen()
    )
  fs.last().font({size: 20})
  fs.center(110, 110)

  const bb = display.button('Готово!')
    .center(50, -110)
    .act(el => {
      switch (true) {
        case cx < 1 && cy < 1:
          scene30near(cx, cy, true); break
        case cx < 5 && cy < 5:
          scene30near(cx, cy, false); break
        default:
          scene30other(cx, cy)
      }
    })

  Ev.drag(uc, (x, y) => uc.center(x, y))
}


function scene30near(cx, cy, at0) {
  subtitles.textContent = at0
    ? 'В самый центр, отлично!'
    : 'Ну, почти.'
  display.clear()
  const plane = display.plane(Sh.coordList(0, 0, 3.5))
  const uc = D.uc()
    .radius(50)
    .center(cx, cy)

  const ez = Anim.ease()

  shot10()
  function shot10() {
    let k = ez()
      , x = Anim.ksf(k, cx, 0)
      , y = Anim.ksf(k, cy, 0)
    uc.center(x, y)
    if (k < 1) {
      window.requestAnimationFrame(shot10)
      return
    }
  }
}


function scene30other(cx, cy) {
  subtitles.textContent = 'Как считаешь, куда лучше его поместить?'
  display.clear()
  const plane = display.plane(Sh.coordList(0, 0, 3.5))
  const uc = D.uc()
    .radius(50)
    .center(cx, cy)
}


function scene40() {
  subtitles.textContent = 'Как считаешь, куда лучше его поместить?'
  display.clear()
  const plane = display.plane(Sh.coordList(0, 0, 3.5))
  const uc = D.uc()
    .radius(50)
    .center(53, 48)
}


// scene10()
