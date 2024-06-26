import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xFEFEFE);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(6, 8, 14);
orbit.update();
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);


const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);
const glTFLoader=new GLTFLoader();
const rgbe=new RGBELoader();
let car;
glTFLoader.load('assets/statics/scene.gltf',function(gltf){
const model =gltf.scene;
scene.add(model);
car=model;
});
function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});