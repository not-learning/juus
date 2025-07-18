"use strict";

// ### Drawings ###
const D = {
  unitCircle: () => Shape.arc()
    .radius(100)
    .stroke('mediumspringgreen')
    .fill('transparent')
}


// ### Shots ###
function pre10() {
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
    pre20()
  }
}


function pre20() {
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
    pre30()
  }
}

// TODO
function pre30() {
  subtitles.textContent = 'Как считаешь, куда лучше его поместить?'
  Shape.clear()
  const crd = Shape.coord()
    .centerCoord(0, 0, 3.5)
  const uc = D.unitCircle()
    .radius(50)
    .center(53, 48)

  uc.mousedown((ev) => 
    uc.mousemove((e) => {
      const ep = ctmInv(e.x, e.y)
      uc.center(ep.x, ep.y)
  }))
  uc.on('mouseup mouseout', () => uc.mousemove(null))

  uc.touchmove((e) => {
    const crd = ctmInv(e.touches[0].clientX, e.touches[0].clientY)
    uc.center(crd.x, crd.y)
  })

  // if (true) pre40()
}


function pre40() {
  subtitles.textContent = 'Как считаешь, куда лучше его поместить?'
  Shape.clear()
  const crd = Shape.coord()
    .centerCoord(0, 0, 3.5)
  const uc = D.unitCircle()
    .radius(50)
    .center(53, 48)

}


pre10()

// function pre30() {
//   subtitles.textContent = 'В самый центр'
//   Shape.clear()
//   const crd = Shape.coord()
//     .centerCoord(0, 0, 3.5)
//   const uc = D.unitCircle()
//     .radius(50)
//     .center(53, 48)

//   let eez = ease()
//     , startCrdX = crd.attr('cx')
//     , startCrdY = crd.attr('cy')
//     , startUcX = uc.attr('cx')
//     , startUcY = uc.attr('cy')

//   shot10()
//   function shot10() {
//     const k = eez()
//       , crdX = myAnim(k, startCrdX, 0)
//       , crdY = myAnim(k, startCrdY, 0)
//       , ucX = myAnim(k, startUcX, 0)
//       , ucY = myAnim(k, startUcY, 0)
//     crd.centerCoord(crdX, crdY)
//     uc.center(ucX, ucY)
//     if (k < 1) {
//       window.requestAnimationFrame(shot10)
//       return
//     }
//     console.log('done')
//   }
// }

// subtitles.textContent = 'Возьмем систему координат'
// subtitles.textContent = 'И поместим в систему координат'
// subtitles.textContent = 'Возьмем круг'
