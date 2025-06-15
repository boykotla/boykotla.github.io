const mindarThree = new window.MINDAR.IMAGE.MindARThree({
  container: document.querySelector("#ar-container"),
  imageTargetSrc: "./assets/gokmedrese.mind"
});

const { renderer, scene, camera } = mindarThree;

async function start() {
  const anchor = mindarThree.addAnchor(0);

  // Küp
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = 0.25;
  anchor.group.add(cube);

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}

start();
