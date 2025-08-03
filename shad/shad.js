'use strict';

const cnv = document.querySelector('#cnv')

const gl = cnv.getContext("webgl")
if (!gl) {} // TODO

function cnvFullscreen() {
  // const size = Math.min(document.body.clientWidth, document.body.clientHeight)
  cnv.width = document.body.clientWidth
  cnv.height = document.body.clientHeight
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
}
cnvFullscreen()

window.addEventListener("resize", cnvFullscreen)

const vrtx = `
attribute vec4 a_p;

void main() {
  gl_Position = a_p;
}
`

const frg = `
precision mediump float;
uniform vec4 u_clr;

void main() {
  gl_FragColor = vec4(0, 1, 1, 1);
}
`

function createShader(gl, type, source) {
  const shdr = gl.createShader(type)
  gl.shaderSource(shdr, source)
  gl.compileShader(shdr)

  const success = gl.getShaderParameter(shdr, gl.COMPILE_STATUS)
  if (success) { return shdr }

  console.log(gl.getShaderInfoLog(shdr))
  gl.deleteShader(shdr)
}

const vrtxShdr = createShader(gl, gl.VERTEX_SHADER, vrtx)
const frgShdr = createShader(gl, gl.FRAGMENT_SHADER, frg)

function createPrg(gl, vertexShader, fragmentShader) {
  const prg = gl.createProgram()
  gl.attachShader(prg, vrtxShdr)
  gl.attachShader(prg, frgShdr)
  gl.linkProgram(prg)
  const success = gl.getProgramParameter(prg, gl.LINK_STATUS)
  if (success) { return prg }

  console.log(gl.getProgramInfoLog(prg))
  gl.deleteProgram(prg)
}

const prgrm = createPrg(gl, vrtxShdr, frgShdr)

const posAttrLoc = gl.getAttribLocation(prgrm, "a_p")
const posBuf = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)

const poss = [
  -1.0, -1.0,  -0.1,  -0.1,
  -0.1, -0.1,   0.1,  -0.1,
   0.1, -0.1,   0.1,   0.1,
   0.1,  0.1,  -0.11,  0.11,
  -0.11, 0.11, -0.1,  -0.1,
  -0.1, -0.1,   0.1,  -0.1,
   0.1, -0.1,   0.1,   0.1,
   0.1,  0.1,   1.0,   1.0,
]

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(poss), gl.STATIC_DRAW)
// gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

gl.clearColor(0, 0, 0, 0)
gl.clear(gl.COLOR_BUFFER_BIT)

gl.useProgram(prgrm)

gl.enableVertexAttribArray(posAttrLoc)
gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)

const size = 2
    , type = gl.FLOAT
    , norm = false
gl.vertexAttribPointer(posAttrLoc, size, type, norm, 0, 0)

gl.drawArrays(gl.LINES, 0, 16)
