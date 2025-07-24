"use strict";

function ctmInv(x, y) {
  let pt = new SVG.Point(x, y)
  return pt.transform(display.screenCTM().inverse())
}


display.on('mousedown', (e) => e.preventDefault())


export function drag(el, fn) {
  el.css({cursor: 'grab'})

  el.pointerdown((e) => {
    el.css({cursor: 'grabbing'})
    e.preventDefault()
    el.pointermove((ev) => {
      ev.preventDefault()
      const ep = ctmInv(ev.x, ev.y)
      fn(ep.x, ep.y)
  })})
  el.on('pointerup pointerleave', () => {
    el.css({cursor: 'grab'})
    el.pointermove(null)
  })
}
