const draw = SVG().addTo('body')
draw.fill('none').stroke({width: 0.5})//.stroke('white')
  .viewbox(-120, -120, 240, 240)
  // .attr('vector-effect', 'non-scaling-stroke')
  .scale(1, -1)

const bodyEl = document.getElementsByTagName('body')[0]

const hh = document.createElement('h1')
hh.textContent = '______________'
bodyEl.insertBefore(hh, bodyEl.firstChild)

const subtitles = document.createElement('p')
subtitles.textContent = 'Welcome to my personal hell.'
bodyEl.appendChild(subtitles)
