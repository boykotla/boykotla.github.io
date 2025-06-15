// window'dan MindARThree ve THREE global objeleri geliyor
const mindarThree = new window.MindARThree({
  container: document.querySelector("#ar-container"),
  imageTargetSrc: "./assets/gokmedrese-marker.mind"
});

const {renderer, scene, camera} = mindarThree;

async function start() {
  const anchor = mindarThree.addAnchor(0);

  // Basit mavi kutu oluştur
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({color: 0x0077ff});
  const cube = new THREE.Mesh(geometry, material);

  anchor.group.add(cube);

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}

start();
