"use strict";

const display = SVG().addTo('body')
display.fill('none').stroke({width: 0.5}).stroke('white')
  .viewbox(-120, -120, 240, 240)
  // .attr('vector-effect', 'non-scaling-stroke')
  .scale(1, -1)

// const hh = document.createElement('h1')
// hh.textContent = '______________'
// bodyEl.insertBefore(hh, bodyEl.firstChild)

const subtitles = document.body.appendChild(
  document.createElement('p')
)

const pi = Math.PI
    , pi2 = 2 * pi
    , pi_2 = pi / 2
