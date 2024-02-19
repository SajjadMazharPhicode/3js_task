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
    0.1,
    1000
);
camera.position.z = 5;
camera2.position.z = 5;

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
const renderer2 = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer2.setSize(window.innerWidth, window.innerHeight);
const doml1 = renderer.domElement;
doml1.style.width = "100%";
doml1.style.height = "100%";

const doml2 = renderer2.domElement;
doml2.style.width = "100%";
doml2.style.height = "100%";
document.querySelector(".split__left").appendChild(doml1);
document.querySelector(".split__right").appendChild(doml2);

const orbitCtrl1 = new OrbitControls(camera, doml1);
const orbitCtrl2 = new OrbitControls(camera2, doml2);
// Create cube
const geometry = new THREE.BoxGeometry();
const geometry2 = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
});

const material2 = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,

});
const cube = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry2, material2);
scene.add(cube);
scene2.add(cube2);

// Animation
const animate = () => {
    requestAnimationFrame(animate);

    // Rotate cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;

    // Render scene
    renderer.render(scene, camera);
    renderer2.render(scene2, camera2);
};

// Handle window resize
window.addEventListener("resize", () => {
    const leftsplit = document.querySelector("split__left")
    const rightsplit = document.querySelector("split__right")
    camera.aspect = leftsplit.innerWidth / leftsplit.innerHeight;
    camera2.aspect = rightsplit.innerWidth / rightsplit.innerHeight;
    camera.updateProjectionMatrix();
    camera2.updateProjectionMatrix();
    renderer.setSize(leftsplit.innerWidth, leftsplit.innerHeight);
    renderer2.setSize(rightsplit.innerWidth, rightsplit.innerHeight);
});

// Start animation
animate();

function initDragMiddleBar() {
    const bar = document.querySelector(".split__bar");
    const left = document.querySelector(".split__left");
    let mouse_is_down = false;

    bar.addEventListener("mousedown", (e) => {
        mouse_is_down = true;
    });

    document.addEventListener("mousemove", (e) => {
        if (!mouse_is_down) return;

        left.style.width = `${e.clientX}px`;
    });

    document.addEventListener("mouseup", () => {
        mouse_is_down = false;
    });
}
initDragMiddleBar();
