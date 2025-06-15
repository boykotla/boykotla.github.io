
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { MindARThree } from 'https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-three.prod.js';

document.addEventListener("DOMContentLoaded", async () => {
  const mindarThree = new MindARThree({
    container: document.body,
    imageTargetSrc: "./assets/gokmedrese-marker.mind",
  });
  const { renderer, scene, camera } = mindarThree;

  const anchor = mindarThree.addAnchor(0);
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x0077ff })
  );
  box.name = "gokbox";
  anchor.group.add(box);

  anchor.onTargetFound = () => {
    document.getElementById("infoBox").style.display = "block";
  };
  anchor.onTargetLost = () => {
    document.getElementById("infoBox").style.display = "none";
  };

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
});
