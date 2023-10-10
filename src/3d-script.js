/* ======================================================
IMPORT
====================================================== */
// import THREE
import * as THREE from "three";
// import ORBIT CONTROLL
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import GSAP
import gsap from "gsap";
// import BOOTSTRAP
// Import our custom CSS
import "/style.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

/* ======================================================
CANVAS
====================================================== */
const canvas = document.querySelector("canvas.webgl");

/* ======================================================
SCENE
====================================================== */
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x092c26, 1, 10.5);

/* ======================================================
GROUP
====================================================== */
const group = new THREE.Scene();
scene.add(group);

/* ======================================================
LIGHT
====================================================== */
// Point Light
const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

// Ambient Light
const light = new THREE.AmbientLight(0x404040, 2);
scene.add(light);

// Group Light + BodyLight
const bodyLight = new THREE.Group();
bodyLight.rotation.z = Math.PI * 0.25;
group.add(bodyLight);

// Move Light 1
const movelight_1 = new THREE.PointLight(0x6becf9, 0.4);
movelight_1.intensity = 0.8;
bodyLight.add(movelight_1);

/* =========================================================
TEXTURE
========================================================= */

const textureLoader = new THREE.TextureLoader();
// Terra
const earthColorTexture = textureLoader.load(
  "/textures/earth/Rock_Moss_001_basecolor.jpg"
);
const earthAmbientOcclusionTexture = textureLoader.load(
  "/textures/earth/Rock_Moss_001_ambientOcclusion.jpg"
);
const earthHeightTexture = textureLoader.load(
  "/textures/earth/Rock_Moss_001_height.png"
);
const earthNormalTexture = textureLoader.load(
  "/textures/earth/Rock_Moss_001_normal.jpg"
);
const earthRoughnessTexture = textureLoader.load(
  "/textures/earth/Rock_Moss_001_roughness.jpg"
);

// Stars
const particlesTexture = textureLoader.load("/textures/particles/4.png");


/* ======================================================
OBJECT
====================================================== */

// planet geometry
const earthgeometry = new THREE.SphereGeometry(1, 32, 32);
// planet material
const earthMaterial = new THREE.MeshStandardMaterial();
earthMaterial.metalness = 0.6;
earthMaterial.map = earthColorTexture;
earthMaterial.aoMap = earthAmbientOcclusionTexture;
earthMaterial.displacementMap = earthHeightTexture;
earthMaterial.displacementScale = 0.05;
earthMaterial.normalMap = earthNormalTexture;
earthMaterial.roughnessMap = earthRoughnessTexture;

earthColorTexture.repeat.set(10, 10);
earthAmbientOcclusionTexture.repeat.set(10, 10);
earthHeightTexture.repeat.set(10, 10);
earthNormalTexture.repeat.set(10, 10);
earthRoughnessTexture.repeat.set(10, 10);

earthColorTexture.wrapS = THREE.RepeatWrapping;
earthAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
earthHeightTexture.wrapS = THREE.RepeatWrapping;
earthNormalTexture.wrapS = THREE.RepeatWrapping;
earthRoughnessTexture.wrapS = THREE.RepeatWrapping;

earthColorTexture.wrapT = THREE.RepeatWrapping;
earthAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
earthHeightTexture.wrapT = THREE.RepeatWrapping;
earthNormalTexture.wrapT = THREE.RepeatWrapping;
earthRoughnessTexture.wrapT = THREE.RepeatWrapping;

const earth = new THREE.Mesh(earthgeometry, earthMaterial);
group.add(earth);

// glass_1 geometry
const glassgeometry = new THREE.SphereGeometry(1.05, 64, 64);
const glassmaterial = new THREE.MeshStandardMaterial();
glassmaterial.color = new THREE.Color(0x6becf9);
glassmaterial.metalness = 0.8;
glassmaterial.roughness = 0.3;
glassmaterial.transparent = true;
glassmaterial.opacity = 0.2;
const glass = new THREE.Mesh(glassgeometry, glassmaterial);

// glass_2 geometry
const glassgeometry_2 = new THREE.SphereGeometry(1.2, 64, 64);
const glassmaterial_2 = new THREE.MeshStandardMaterial();
glassmaterial_2.color = new THREE.Color(0x6becf9);
glassmaterial_2.metalness = 0.8;
glassmaterial_2.roughness = 0.3;
glassmaterial_2.transparent = true;
glassmaterial_2.opacity = 0.2;
const glass_2 = new THREE.Mesh(glassgeometry_2, glassmaterial_2);

group.add(glass, glass_2);

// Light Body
const lightBodyGeometry = new THREE.SphereGeometry(0.02, 32, 32);
const lightBodyMaterial = new THREE.MeshStandardMaterial();
lightBodyMaterial.color = new THREE.Color(0xabf1f8);
lightBodyMaterial.transparent = true;
lightBodyMaterial.metalness = 0.8;
lightBodyMaterial.opacity = 0.2;
const lightBody = new THREE.Mesh(lightBodyGeometry, lightBodyMaterial);
bodyLight.add(lightBody);

/* ======================================================
PARTICLES
====================================================== */
const particlesGeometry = new THREE.BufferGeometry();
const count = 1000;

const position = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  position[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(position, 3)
  );
  
  //material
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x4fffe1,
    size: 0.15,
    sizeAttenuation: true,
    map: particlesTexture,
    transparent: true,
    alphaMap: particlesTexture,
    depthTest: false,
  });
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

/* ======================================================
SIZES
====================================================== */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/* ======================================================
CAMERA
====================================================== */
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6.8;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/* ======================================================
RENDERER
====================================================== */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* ======================================================
SCROLL
====================================================== */
let scrollY = window.scrollY;
let currentSection = 0;

let positionX;
let positionY;
let positionZ;
let movmentDirection;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.height);
  if (newSection !== currentSection) {
    if (newSection < currentSection) {
      movmentDirection = 1;
    } else {
      movmentDirection = 0;
    }

    currentSection = newSection;
    console.log("section", currentSection);
    gsap.to(earth.rotation, {
      duration: 1.5,
      ease: "power2.inOut",
      x: "+=6",
      y: "+=3",
      z: "+=1.5",
    });

    if (movmentDirection == 0) {
      switch (newSection) {
        case 1:
          positionX = "+=1.5";
          positionZ = "+=1.5";
          positionY = "-=0.5";
          break;
        case 2:
          positionX = "-=0.5";
          positionZ = "+=1";
          positionY = "+=0.5";
      }
    } else {
      switch (newSection) {
        case 0:
          positionX = "-=1.5";
          positionZ = "-=1.5";
          positionY = "+=0.5";
          break;
        case 1:
          positionX = "+=0.5";
          positionZ = "-=1";
          positionY = "-=0.5";
          break;
      }
    }

    gsap.to(group.position, {
      duration: 1.5,
      ease: "power2.inOut",
      z: positionZ,
      x: positionX,
      y: positionY,
    });

    controls.update();
  }
});

/* ======================================================
ANIMATE
====================================================== */

const clock = new THREE.Clock();
const objectDistance = 6.5;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // earth animation
  earth.rotation.y = elapsedTime * 0.2;

  // Animation Light 1
  movelight_1.position.x = Math.cos(elapsedTime);

  // earth Orbit
  const orbitAngle = elapsedTime * 0.5;
  movelight_1.position.x = Math.cos(orbitAngle) * 1.2;
  movelight_1.position.z = Math.sin(orbitAngle) * 1.2;

  lightBody.position.x = Math.cos(orbitAngle) * 1.2;
  lightBody.position.z = Math.sin(orbitAngle) * 1.2;

  bodyLight.rotation.x = Math.cos(orbitAngle) * 1.2;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

gsap.from(camera.position, {
  duration: 3.5,
  ease: "power2.inOut",
  z: 12.5,
});