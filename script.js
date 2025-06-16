import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import { MindARThree } from 'https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-three.prod.js';

const mindarThree = new MindARThree({
  container: document.querySelector("#ar-container"),
  imageTargetSrc: "./assets/gokmedrese.mind",
  maxTrack: 1,
  warmupTolerance: 0.2,
  filterMinCF: 0.001,
  filterBeta: 0.001,
  uiScanning: true,
  videoConfig: {
    facingMode: "environment",
    width: { ideal: 640 },
    height: { ideal: 480 }
  }
});

const { renderer, scene, camera } = mindarThree;

// Işıkları ekle
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 2, 3);
scene.add(directionalLight);

const loader = new GLTFLoader();

async function start() {
  const anchor = mindarThree.addAnchor(0);

  loader.load(
    './assets/model.glb',
    (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.3, 0.3, 0.3);
      model.position.y = 0.1;
      anchor.group.add(model);
    },
    undefined,
    (error) => {
      console.error("Model yüklenemedi:", error);
    }
  );

  await mindarThree.start();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}

start();
