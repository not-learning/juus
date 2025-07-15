"use strict";

// ### Drawings ###
const D = {
  coord: coord(),
  unitCircle: arc()
    .radius(100)
    .center(0, 0)
    .stroke('mediumspringgreen'),
}

pre10()
function pre10() {
  const cc = coord().addTo(draw)
  .centerCoord(-10, -15, 3.5)
  const aa = arc().radius(100).stroke('mediumspringgreen').addTo(draw)
  let a1 = 0
    , a2 = 0

  function shot10() {
    aa.arcAngles(a1, a2)
    a1 += 0.0002, a2 -= 0.0001
    window.requestAnimationFrame(shot10)
  }
  shot10()
}


const c1 = arc(1, 0)
  .radius(10)
  .center(-100, 100)
  .addTo(draw)
    , c2 = arc(0, 1)
  .radius(10)
  .center(-80, 100)
  .addTo(draw)
    , c3 = arc(pi2, -1)
  .radius(10)
  .center(-60, 100)
  .addTo(draw)
