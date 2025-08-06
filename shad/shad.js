'use strict';

function start() {
  const cnv = document.querySelector('#cnv')
  initGL(cnv)
  initShaders()
  initBuffers()

  gl.clearColor(0.0, 0.0, 0.0, 0.0)
  gl.enable(gl.DEPTH_TEST)

  draw()
}


let gl
function initGL(canvas) {
  gl = cnv.getContext('webgl')
  cnv.width = cnv.clientWidth
  cnv.height = cnv.clientHeight
  gl.viewportWidth = cnv.clientWidth
  gl.viewportHeight = cnv.clientHeight

  if (!gl) { console.log("No WebGL for you, sorry!") }
}


function getShader(gl, type, str) {
  let shader
  switch (type) {
    case 'v':
      shader = gl.createShader(gl.VERTEX_SHADER); break
    case 'f':
      shader = gl.createShader(gl.FRAGMENT_SHADER); break
    default:
      return null
  }

  gl.shaderSource(shader, str)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(shader))
    return null
  }

  return shader
}

const vrtxShaderStr = `
attribute vec3 aVertexPosition;
uniform mat4 u_matP;
uniform mat4 u_matT;

void main(void) {
  gl_Position = u_matP * u_matT * vec4(aVertexPosition, 1.0);
}
`

const fragShaderStr = `
precision mediump float;
void main(void) {
  gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
}
`


let shaderProgram
function initShaders() {
  const vrtxSh = getShader(gl, "v", vrtxShaderStr)
      , fragSh = getShader(gl, "f", fragShaderStr)

  shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vrtxSh)
  gl.attachShader(shaderProgram, fragSh)
  gl.linkProgram(shaderProgram)

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log('Could not initialise shaders')
  }

  gl.useProgram(shaderProgram)

  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition")
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute)

  shaderProgram.u_matP = gl.getUniformLocation(shaderProgram, "u_matP")
  shaderProgram.u_matT = gl.getUniformLocation(shaderProgram, "u_matT")
}


let lineBuf, squareBuf
function initBuffers() {
  lineBuf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, lineBuf)
  const d = -2
  let vrtx = [
  -1.0,  0.0,  0,
  -0.1, -0.1,  0,
  -0.1, -0.1,  0,
   0.1, -0.1,  0,
   0.1, -0.1,  0,
   0.1,  0.1,  0,
   0.1,  0.1,  0,
  -0.1,  0.1,  0,
  -0.1,  0.1,  0,
  -0.1, -0.1,  0,
   0.1,  0.1,  0,
   1.0,  0.0,  0,

  -0.1, -0.1,  d,
   0.1, -0.1,  d,
   0.1, -0.1,  d,
   0.1,  0.1,  d,
   0.1,  0.1,  d,
  -0.1,  0.1,  d,
  -0.1,  0.1,  d,
  -0.1, -0.1,  d,

  -0.1, -0.1,  0,
  -0.1, -0.1,  d,
   0.1, -0.1,  0,
   0.1, -0.1,  d,
   0.1,  0.1,  0,
   0.1,  0.1,  d,
  -0.1,  0.1,  0,
  -0.1,  0.1,  d,
]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrtx), gl.STATIC_DRAW)
  lineBuf.itemSize = 3
  lineBuf.numItems = 28

  squareBuf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, squareBuf)
  vrtx = [
    1.0,  1.0,  0.0,
   -1.0,  1.0,  0.0,
    1.0, -1.0,  0.0,
   -1.0, -1.0,  0.0,
  ]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrtx), gl.STATIC_DRAW)
  squareBuf.itemSize = 3
  squareBuf.numItems = 4
}


const m4 = {
  translate: (tx, ty, tz) => [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    tx, ty, tz, 1,
  ],
  perspective: (fov, aspect, near, far) => {
    const f = Math.tan((Math.PI - fov) / 2)
      , rangeInv = 1.0 / (near - far)
      , aspW = Math.max(aspect, 1)
      , aspH = Math.min(aspect, 1)
    return [
      f / aspW, 0, 0, 0,
      0, f * aspH, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0,
    ]
  },
  setMatrixUniforms: (mp, mt) => {
    gl.uniformMatrix4fv(shaderProgram.u_matP, false, mp)
    gl.uniformMatrix4fv(shaderProgram.u_matT, false, mt)
  }
}


function draw() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  const matP = m4.perspective(Math.PI / 4, gl.viewportWidth / gl.viewportHeight, 0.01, 100)

  let matT = m4.translate(0, 0, -2.7)
  gl.bindBuffer(gl.ARRAY_BUFFER, lineBuf)
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, lineBuf.itemSize, gl.FLOAT, false, 0, 0)
  m4.setMatrixUniforms(matP, matT)
  gl.drawArrays(gl.LINES, 0, lineBuf.numItems)

  // matT = m4.translate(0.0, 0.0, -20.0)
  // gl.bindBuffer(gl.ARRAY_BUFFER, squareBuf)
  // gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareBuf.itemSize, gl.FLOAT, false, 0, 0)
  // m4.setMatrixUniforms(matP, matT)
  // gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareBuf.numItems)
}

start()
