const mindarThree = new window.MINDAR.IMAGE.MindARThree({
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

// Kalite artırma
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;

// Işık ekle
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(0, 10, 10);
scene.add(dirLight);

const loader = new THREE.GLTFLoader();

async function start() {
  const anchor = mindarThree.addAnchor(0);

  loader.load(
    './assets/model.glb',
    (gltf) => {
      const model = gltf.scene;

      model.traverse((child) => {
        if (child.isMesh) {
          child.material.side = THREE.DoubleSide;
          child.material.encoding = THREE.sRGBEncoding;
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.needsUpdate = true;
        }
      });

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

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}

start();
