"use strict";

function ctmInv(x, y) {
  let pt = new SVG.Point(x, y)
  return pt.transform(display.screenCTM().inverse())
}


display.mousedown((e) => e.preventDefault())


export function drag(el, fn) {
  el.mousedown((e) => {
    e.preventDefault()
    el.mousemove((ev) => {
      ev.preventDefault()
      const ep = ctmInv(ev.x, ev.y)
      fn(ep.x, ep.y)
  })})
  el.on('mouseup mouseout', () => el.mousemove(null))

  el.touchmove((e) => {
    const ep = ctmInv(e.touches[0].clientX, e.touches[0].clientY)
    fn(ep.x, ep.y)
  })
}
