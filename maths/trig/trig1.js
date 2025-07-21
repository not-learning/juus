"use strict";

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
    , k = ease()

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

  const plane = display.plane(coordList(1, 1, 3.5))
    .opacity(0)
  const uc = display.arc()
    .radius(50)
    .center(53, 48)
    .stroke('mediumspringgreen')

  let k = ease()

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


function drag(el, fn) {
  el.mousedown(() =>
    el.mousemove((e) => {
      console.log(el)
      const ep = ctmInv(e.x, e.y)
      fn(ep.x, ep.y)
  }))
  el.on('mouseup mouseout', () => el.mousemove(null))

  el.touchmove((e) => {
    const ep = ctmInv(e.touches[0].clientX, e.touches[0].clientY)
    fn(ep.x, ep.y)
  })
}


function scene30() {
  subtitles.textContent = 'Как считаешь, куда лучше его поместить?'
  display.clear()
  const plane = display.plane(coordList(0, 0, 3.5))
  const uc = display.arc()
    .radius(50)
    .center(53, 48)
    .stroke('mediumspringgreen')
    .fill('transparent')

  drag(uc, (x, y) => uc.center(x, y))

  // uc.mousedown((ev) => 
  //   uc.mousemove((e) => {
  //     const ep = ctmInv(e.x, e.y)
  //     uc.center(ep.x, ep.y)
  //     plane.centerCoord(ep.x, ep.y, (ep.x + 1) / 10)
  // }))
  // uc.on('mouseup mouseout', () => uc.mousemove(null))

  // uc.touchmove((e) => {
  //   const ep = ctmInv(e.touches[0].clientX, e.touches[0].clientY)
  //   uc.center(ep.x, ep.y)
  // })

  // if (true) scene40()
}


function scene40() {
  subtitles.textContent = 'Как считаешь, куда лучше его поместить?'
  display.clear()
  const plane = display.plane(coordList(0, 0, 3.5))
  const uc = display.arc()
    .radius(50)
    .center(53, 48)

}


scene10()
