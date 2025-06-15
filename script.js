const mindarThree = new window.MINDAR.IMAGE.MindARThree({
  container: document.querySelector("#ar-container"),
  imageTargetSrc: "./assets/gokmedrese.mind"
});

const { renderer, scene, camera } = mindarThree;

const loader = new THREE.GLTFLoader();

async function start() {
  const anchor = mindarThree.addAnchor(0);

  loader.load(
    './assets/model.glb', // ← Model yolun
    function (gltf) {
      const model = gltf.scene;
      model.scale.set(0.3, 0.3, 0.3); // boyutu ayarla
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
