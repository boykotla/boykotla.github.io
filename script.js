const mindarThree = new window.MINDAR.IMAGE.MindARThree({
  container: document.querySelector("#ar-container"),
  imageTargetSrc: "./assets/gokmedrese.mind", // Hedef dosyanızın adı
  maxTrack: 1,
  warmupTolerance: 0.2,
  filterMinCF: 0.002, // Ayarladığınız değerler (daha stabil olması için)
  filterBeta: 0.002,  // Ayarladığınız değerler (daha stabil olması için)
  uiScanning: true,
  uiLoading: "yes",
  videoConfig: {
    facingMode: "environment",
    width: { ideal: 1280 },
    height: { ideal: 720 }
  }
});

const { renderer, scene, camera } = mindarThree;

// Işıklandırma kodunuz (önceki haliyle)
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

const loader = new THREE.GLTFLoader();

async function start() {
  const anchor = mindarThree.addAnchor(0);

  loader.load(
    './assets/model.glb', // Model yolunuz
    function (gltf) {
      const model = gltf.scene;

      // Ana modelinizin boyut ve konum ayarları (sizin son istediğiniz gibi)
      model.scale.set(1.0, 1.0, 1.0); // Modeli orijinal boyutunda göster
      model.position.set(0.0, -0.7, 0.0); // Hedefin altında ve ortalı konumlandır

      anchor.group.add(model);

      // --- BURADAN İTİBAREN YENİ KÜRE KODU EKLENMİŞTİR ---

      // Küre geometrisi oluşturun (yarıçap: 0.05, segmentler: 32x32)
      const sphereGeometry = new THREE.SphereGeometry(0.05, 32, 32);
      // Küre materyali oluşturun (örneğin parlak altın rengi)
      const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 }); // Altın rengi
      // Küre nesnesini oluşturun
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

      // Kürenin konumunu ayarlayın. Hedefin bir köşesine yerleştireceğiz.
      // X: Sağ/Sol eksen (Pozitif: Sağ, Negatif: Sol)
      // Y: Yukarı/Aşağı eksen (Pozitif: Yukarı, Negatif: Aşağı)
      // Z: İleri/Geri eksen (Pozitif: Kameraya yakın, Negatif: Kameradan uzak)
      // Bu değerler hedef görüntünüzün boyutuna göre ayarlanmalıdır.
      // Örneğin, hedefin sağ üst köşesine yakın bir yer.
      sphere.position.set(0.4, 0.4, 0.0); // Hedefin sağ üst köşesine yakın bir nokta
                                       // Değerleri deneyerek en uygun köşeyi bulabilirsiniz.

      // Küreyi anchor grubuna ekleyin, böylece hedefle birlikte hareket eder.
      anchor.group.add(sphere);

      // --- KÜRE KODU BURADA SONA ERER ---

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
