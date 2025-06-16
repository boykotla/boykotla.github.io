const mindarThree = new window.MINDAR.IMAGE.MindARThree({
  container: document.querySelector("#ar-container"),
  imageTargetSrc: "./assets/gokmedrese.mind",
  maxTrack: 1,
  warmupTolerance: 0.2,
  filterMinCF: 0.001,
  filterBeta: 0.001,
  uiScanning: true,
  uiLoading: "yes",
  videoConfig: {
    facingMode: "environment",
    width: { ideal: 640 },
    height: { ideal: 480 }
  }
});

const { renderer, scene, camera } = mindarThree;

// 📌 Kalite artırımı için burası önemli
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const loader = new THREE.GLTFLoader();

async function start() {
  const anchor = mindarThree.addAnchor(0);

  loader.load(
    './assets/model.glb',
    function (gltf) {
      const model = gltf.scene;
      model.scale.set(0.3, 0.3, 0.3);
      model.position.y = 0.1;
      anchor.group.add(model);
    },
    undefined,
    function (error) {
      console.error("Model yüklenemedi:", error);
    }
  );

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}

start();
