"use strict";

function ctmInv(x, y) {
  return new SVG.Point(x, y)
    .transform(display.screenCTM().inverse())
}


display.css('touch-action', 'none')

// TODO all events on display, not element
export function drag(el, func) {
  el.css({cursor: 'crosshair'})

  function fn(ev) {
      const ep = ctmInv(ev.x, ev.y)
      func(ep.x, ep.y)
  }

  el.pointerdown((e) => display.pointermove(fn))
  display.on('pointerup pointerleave pointercancel', () => display.off('pointermove', fn))
  return el
}
