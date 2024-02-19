import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";
import { PLYLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/PLYLoader";

const scene = new THREE.Scene();
const scene2 = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const camera2 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.2,
    1000
)
camera.position.z = 5;
camera2.position.z =5

// Create renderer
const renderer = new THREE.WebGLRenderer();
const renderer2 = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".split__left").appendChild(renderer.domElement);
// document.querySelector(".split__right").appendChild(renderer.domElement)

// Create cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
});

const material2 = new THREE.MeshBasicMaterial({
    color:0x00ff00
})
const cube = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material2)
scene.add(cube);
// scene2.add(cube2)

// Animation
const animate = () => {
    requestAnimationFrame(animate);

    // Rotate cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render scene
    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();

function initDragMiddleBar(){
    const bar = document.querySelector('.split__bar');
    const left = document.querySelector('.split__left');
    let mouse_is_down = false;
    
    bar.addEventListener('mousedown', (e) => {
      mouse_is_down = true;
    })
    
    document.addEventListener('mousemove', (e) => {
      if (!mouse_is_down) return;
    
      left.style.width = `${e.clientX}px`;
    })
    
    document.addEventListener('mouseup', () => {
      mouse_is_down = false;
    })
}
initDragMiddleBar()
