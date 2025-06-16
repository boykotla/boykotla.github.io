const mindarThree = new window.MINDAR.IMAGE.MindARThree({
  container: document.querySelector("#ar-container"),
  imageTargetSrc: "./assets/gokmedrese.mind",
  maxTrack: 1,
  warmupTolerance: 0.2,
  filterMinCF: 0.005, // Biraz daha hızlı tepki için
  filterBeta: 0.005, 
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
    './assets/model.glb', // ← Model yolunuz
    function (gltf) {
      const model = gltf.scene;

      // Modelin boyutunu ayarla: Daha büyük görünmesini istiyorsanız değerleri artırın.
      // Örneğin, 0.3 yerine 0.5 yaparak %66 daha büyük görünmesini sağlayabilirsiniz.
      model.scale.set(1, 1, 1); // Her eksende aynı oranda büyütmek için genellikle hepsi aynı değerde tutulur.

      // Modelin konumunu ayarla: Algılanan hedefe göre pozisyonu değiştirir.
      // Varsayılan olarak y=0.1 idi (hedefin biraz üstünde).
      // Eğer hedeften dışarıda (örneğin sağında veya solunda) olmasını isterseniz x veya z değerlerini ayarlayın.
      // Y: modelin yukarı/aşağı hareketi (hedefin üzerindeki yüksekliği)
      // X: modelin sağa/sola hareketi
      // Z: modelin ileri/geri hareketi
      model.position.set(0.0, -5, 0.5); // Örnek: Y ekseninde (yukarı doğru) biraz daha yüksekte olsun.
                                        // Eğer sağa kaydırmak isterseniz (0.1, 0.2, 0.0) gibi.
                                        // Eğer hedefin önünde veya arkasında olmasını isterseniz Z değerini ayarlayın.
                                        // Bu değerler, hedefin boyutuna ve istediğiniz mesafeye göre değişecektir.

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
