import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { useTranslation } from 'react-i18next';

// This is the component that actually loads and renders the GLTF model
function UniformModel({ gender }) {
  const filename = gender === 'female' ? '/female-uniform.glb' : '/male-uniform.glb';
  const { scene } = useGLTF(filename);
  
  // Делаем текстуру максимально матовой (как на референсе)
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.roughness = 1.0; // Полностью матовая ткань
      child.material.metalness = 0.0; // Никакого металла
      child.material.envMapIntensity = 0.0; // Полностью убираем блики от окружения
    }
  });

  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
}

export default function SchoolUniform() {
  const { t } = useTranslation();
  const [gender, setGender] = useState('female');

  return (
    <div className="py-24 bg-surface-container-lowest relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="material-symbols-outlined text-primary text-sm">apparel</span>
              <span className="text-primary font-bold text-sm tracking-widest uppercase">Premium Sifat</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface mb-6">
              Bizning Maxsus Formamiz
            </h2>
            
            <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
              Nova International AI School o'quvchilari uchun maxsus dizayn qilingan qulay, zamonaviy va yuqori sifatli maktab formasi. Har bir detal o'quvchining qulayligi va maktab nufuzini hisobga olib yaratilgan.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">eco</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Tabiiy mato</h4>
                  <p className="text-on-surface-variant text-sm mt-1">Nafas oluvchi, alergiya chaqirmaydigan yuqori sifatli paxta.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">design_services</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Zamonaviy dizayn</h4>
                  <p className="text-on-surface-variant text-sm mt-1">Har qanday mavsum uchun ideal va chiroyli bichim.</p>
                </div>
              </li>
            </ul>

            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setGender('female')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${gender === 'female' ? 'bg-primary text-on-primary shadow-lg shadow-primary/30' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'}`}
              >
                Qizlar uchun
              </button>
              <button 
                onClick={() => setGender('male')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${gender === 'male' ? 'bg-primary text-on-primary shadow-lg shadow-primary/30' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'}`}
              >
                O'g'il bolalar uchun
              </button>
            </div>

            <button className="magnetic-btn">
              Batafsil ma'lumot
            </button>
          </div>

          {/* 3D Model Viewer */}
          <div className="order-1 lg:order-2 h-[500px] lg:h-[600px] w-full relative bg-surface-container/30 rounded-3xl border border-outline/10 shadow-2xl overflow-hidden">
            {/* 3D Canvas */}
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
              
              {/* Убираем Environment (отражения) чтобы модель выглядела ровной, как на фото */}
              
              {/* Мягкий рассеянный свет */}
              <ambientLight intensity={1.5} />
              
              {/* Легкий направленный свет спереди, чтобы подчеркнуть детали без сильных бликов */}
              <directionalLight position={[0, 5, 10]} intensity={1.5} />
              <directionalLight position={[-5, 5, -5]} intensity={0.5} />

              <Suspense fallback={null}>
                <UniformModel gender={gender} />
                
                {/* Beautiful soft shadows on the floor */}
                <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2} far={4} />
              </Suspense>

              {/* Restrict camera rotation: only left-right, no up-down, no zoom */}
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                minPolarAngle={Math.PI / 2} // Lock vertical angle (90 degrees)
                maxPolarAngle={Math.PI / 2} // Lock vertical angle (90 degrees)
                autoRotate={true}
                autoRotateSpeed={2}
              />
            </Canvas>

            {/* Overlay hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-on-surface-variant/70 text-sm font-medium backdrop-blur-md bg-surface-container-highest/30 px-4 py-2 rounded-full pointer-events-none">
              <span className="material-symbols-outlined text-base">360</span>
              Aylantirib ko'rish
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

useGLTF.preload('/female-uniform.glb');
useGLTF.preload('/male-uniform.glb');
