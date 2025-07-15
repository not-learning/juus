"use strict";

// ### Drawings ###
const D = {
  coord: coord(),
  unitCircle: arc().stroke('mediumspringgreen'),
}

// pre10()
function pre10() {
  const cc = coord().addTo(draw)
  .centerCoord(-10, -15, 3.5)
  const aa = arc().stroke('mediumspringgreen').addTo(draw)
  let a1 = 0
    , a2 = 0

  function shot10() {
    aa.centerArc(a2, a1)
    a1 += 0.0002, a2 -= 0.0001
    window.requestAnimationFrame(shot10)
  }
  shot10()
}


const c1 = arc(1, 0, -100, 100, 10).addTo(draw)
    , c2 = arc(0, 1, -80, 100, 10).addTo(draw)
    , c3 = arc(pi2, -1, -60, 100, 10).addTo(draw)
