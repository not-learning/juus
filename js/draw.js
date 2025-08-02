"use strict";

import * as Ev from '/js/events.js'


function pathPoint() {
  const gg = new SVG.G()
  gg.circle(5)
    .center(0, 0)
    .stroke('mediumspringgreen')
  return gg
}

function controls() {
  const gg = new SVG.G()
  gg.circle(5)
    .center(5, 0)
    .stroke('mediumspringgreen')
    .fill('transparent')
  gg.label("+")
    .center(5, 0.35)
    .fill('white')
  // gg.opacity(0)
  return gg
}


function drawPath() {
  subtitles.textContent = 'Представь весы'
  const P = display.path('M 0 0')
  const C = []
  const pathP = pathPoint().addTo(display)
  const cc = pathP.first()
    .fill('transparent')
  const ctrl = controls()
  let dragging = false

  const ttt = () => ctrl.remove()

// TODO all events on display, not element
  pathP.mouseover((e) => {
    cc.fill('red')
    if (!dragging) {
      ctrl.addTo(pathP)
        .center(cc.cx() + 5, cc.cy())
        // .animate().ease('<>').opacity(1)
    }
  })

  pathP.mouseout((e) => {
      dragging = false
      cc.fill('transparent')
      ctrl.remove()
      // ctrl.animate().ease('<>').opacity(0)
      //   .after(ttt)
  })

  Ev.drag(pathP, (x, y) => {
    dragging = true
    pathP.center(x, y)
    ctrl.remove()
    // ctrl.center(x + 5, y)
    // ctrl.animate().ease('<>').opacity(0)
    //   .after(ttt)
  })
}
drawPath()
