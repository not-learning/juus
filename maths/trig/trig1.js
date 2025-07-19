"use strict";

// ### Drawings ###
const D = {
  unitCircle: () => Shape.arc()
    .radius(100)
    .stroke('mediumspringgreen')
    .fill('transparent')
}


// ### Scenes ###
function scene10() {
  subtitles.textContent = 'Возьмем круг'
  Shape.clear()
  const uc = D.unitCircle()
    .radius(50)
    .center(53, 48)

  let ang = 0
    , k = ease()

  shot10()
  function shot10() {
    ang = k() * pi2
    uc.arcAngles(0, ang)
    if (ang < pi2) {
      window.requestAnimationFrame(shot10)
      return
    }
    scene20()
  }
}


function scene20() {
  subtitles.textContent = 'и систему координат'
  Shape.clear()
  const crd = Shape.coord()
    .opacity(0)
    .centerCoord(10, 20, 3.5)
  const uc = D.unitCircle()
    .radius(50)
    .center(53, 48)

  let k = ease()

  shot10()
  function shot10() {
    let op = k()
    crd.opacity(op)
    if (op < 1) {
      window.requestAnimationFrame(shot10)
      return
    }
    scene30()
  }
}


function scene30() {
  subtitles.textContent = 'Как считаешь, куда лучше его поместить?'
  Shape.clear()
  const crd = Shape.coord()
    .centerCoord(40, 50, 3.5)
  const uc = D.unitCircle()
    .radius(50)
    .center(53, 48)

  uc.mousedown((ev) => 
    uc.mousemove((e) => {
      const ep = ctmInv(e.x, e.y)
      uc.center(ep.x, ep.y)
      crd.centerCoord(ep.x, ep.y, (ep.x + 1) / 10)
  }))
  uc.on('mouseup mouseout', () => uc.mousemove(null))

  uc.touchmove((e) => {
    const ep = ctmInv(e.touches[0].clientX, e.touches[0].clientY)
    uc.center(ep.x, ep.y)
  })

  // if (true) scene40()
}


function scene40() {
  subtitles.textContent = 'Как считаешь, куда лучше его поместить?'
  Shape.clear()
  const crd = Shape.coord()
    .centerCoord(0, 0, 3.5)
  const uc = D.unitCircle()
    .radius(50)
    .center(53, 48)

}


scene20()
