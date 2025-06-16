const mindarThree = new window.MINDAR.IMAGE.MindARThree({
  container: document.querySelector("#ar-container"),
  imageTargetSrc: "./assets/gokmedrese.mind",
  maxTrack: 1,
  warmupTolerance: 0.2,
  filterMinCF: 0.001,
  filterBeta: 0.001,
  uiScanning: true,
  // Çözünürlük artırmak için burayı ekle:
  videoConfig: {
    facingMode: "environment", // veya "user" (ön kamera)
    width: { ideal: 1280 },
    height: { ideal: 720 }
  }
});

const { renderer, scene, camera } = mindarThree;

// --- BURADAN İTİBAREN IŞIKLANDIRMA KODU EKLENMİŞTİR ---

// Ortam ışığı: Tüm nesneleri eşit şekilde aydınlatır, gölge oluşturmaz.
// Genel bir aydınlık sağlamak için kullanılır.
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Renk: Beyaz, Yoğunluk: %100
scene.add(ambientLight);

// Yönsel ışık: Belirli bir yönden gelen güneş ışığı gibi davranır.
// Daha belirgin gölgeler ve vurgular oluşturur.
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Renk: Beyaz, Yoğunluk: %80
// Işığın pozisyonunu belirleyin. Bu, ışığın hangi yönden geldiğini kontrol eder.
// X, Y, Z koordinatları (burada: sağdan, yukarıdan, önden hafifçe gelir)
directionalLight.position.set(1, 1, 1).normalize(); // .normalize() ile yönü standartlaştırıyoruz
scene.add(directionalLight);

// İsteğe bağlı olarak ekleyebileceğiniz başka bir ışık: HemisphereLight
// Gökyüzü ve zemin renklerini simüle eder, genellikle daha doğal bir aydınlatma sağlar.
// const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1); // Gökyüzü rengi, Zemin rengi, Yoğunluk
// scene.add(hemisphereLight);

// --- IŞIKLANDIRMA KODU BURADA SONA ERER ---

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
    undefined, // Yükleme sırasında ilerlemeyi bildiren isteğe bağlı bir fonksiyon
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
