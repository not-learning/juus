"use strict";

function ctmInv(x, y) {
  let pt = new SVG.Point(x, y)
  return pt.transform(display.screenCTM().inverse())
}


display.css('touch-action', 'none')


export function drag(el, fn) {
  el.css({cursor: 'grab'})

  el.pointerdown((e) => {
    el.css({cursor: 'grabbing'})
    el.pointermove((ev) => {
      const ep = ctmInv(ev.x, ev.y)
      fn(ep.x, ep.y)
  })})

  el.on('pointerup pointerleave', (ev) => {
    el.css({cursor: 'grab'})
    el.pointermove(null)
  })
}
