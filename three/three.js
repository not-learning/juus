'use strict';

import * as THREE from '/assets/three_js/three.module.js'; // TODO change to min

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 15;


const xArrow = new THREE.ArrowHelper(
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(-1.15, 0, 0),
  2.3, 0x00ffff, 0.07, 0.02,
), yArrow = new THREE.ArrowHelper(
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, -1.15, 0),
  2.3, 0x00ffff, 0.07, 0.02,
)
xArrow.line.material.linewidth = 1.3
yArrow.line.material.linewidth = 1.3

const xyPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({ visible: false })
)

const arc = new THREE.Mesh(
  new THREE.RingGeometry(1, 1.005, 100),
  new THREE.MeshBasicMaterial({ color: 0x00ffff }),
)

scene.add(xyPlane.add(xArrow, yArrow), arc);


let n = 0
function animate() {
  renderer.render(scene, camera);
  n += 0.001
}
renderer.setAnimationLoop(animate);


window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
// ### TODO ### coord plane size = min(window.width, window.height)
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
}
