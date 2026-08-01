import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroMinimalistBrutalist() {
  const containerRef = useRef(null);
  const kineticRefs = useRef([]);

  useEffect(() => {
    // Kinetic Typography Drift
    let targetX = 0;
    let targetY = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      targetX = x * 50;
      targetY = y * 50;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    const animateKineticText = () => {
      kineticRefs.current.forEach(el => {
        if (!el) return;
        const driftFactor = parseFloat(el.getAttribute('data-drift'));
        
        // Custom parsed logic from inline script
        let currentX = el._currentX || 0;
        let currentY = el._currentY || 0;
        
        const nextX = currentX + (targetX * driftFactor * 100 - currentX) * 0.1;
        const nextY = currentY + (targetY * driftFactor * 100 - currentY) * 0.1;

        el.style.transform = `translate(${nextX}px, ${nextY}px)`;
        el._currentX = nextX;
        el._currentY = nextY;
      });
      animationFrameId = requestAnimationFrame(animateKineticText);
    };
    animateKineticText();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    // Three.js setup
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.5,
      thickness: 2,
      transparent: true,
      opacity: 0.8,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.2
    });

    const core = new THREE.Mesh(geometry, material);
    coreGroup.add(core);

    for (let i = 0; i < 12; i++) {
      const shardGeom = new THREE.BoxGeometry(0.1, 2, 0.1);
      const shardMat = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.4
      });
      const shard = new THREE.Mesh(shardGeom, shardMat);
      const angle = (i / 12) * Math.PI * 2;
      shard.position.set(Math.cos(angle) * 3, Math.sin(angle) * 3, (Math.random() - 0.5) * 4);
      shard.rotation.set(Math.random(), Math.random(), Math.random());
      coreGroup.add(shard);
    }

    const pointLight = new THREE.PointLight(0x00f0ff, 5, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    camera.position.z = 10;

    let mouseX = 0, mouseY = 0;
    const handleThreeMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleThreeMouseMove);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      coreGroup.rotation.y += 0.002;
      coreGroup.rotation.x += 0.001;
      
      coreGroup.position.x += (mouseX * 1.5 - coreGroup.position.x) * 0.05;
      coreGroup.position.y += (mouseY * 1.5 - coreGroup.position.y) * 0.05;
      
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      window.removeEventListener('mousemove', handleThreeMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <main className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* 3D Interstitial Layer */}
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full z-20 pointer-events-none mix-blend-screen opacity-90" 
      ></div>
      
      {/* Massive Typography Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        
        {/* Layer 1: Code (Behind 3D) */}
        <div className="absolute top-[10%] md:top-[15%] w-full text-center z-10">
          <h1 
            ref={(el) => kineticRefs.current[0] = el}
            className="text-[80px] md:text-[250px] font-extrabold text-on-surface uppercase tracking-tighter" 
            data-drift="0.02"
            style={{ lineHeight: '0.8', letterSpacing: '-0.05em' }}
          >
            Code.
          </h1>
        </div>
        
        {/* Layer 2: Build (In front of some 3D, colored) */}
        <div className="absolute top-[40%] md:top-[35%] w-full text-center z-30">
          <h1 
            ref={(el) => kineticRefs.current[1] = el}
            className="text-[80px] md:text-[250px] font-extrabold text-[#00dbe9] uppercase tracking-tighter" 
            data-drift="-0.03"
            style={{ lineHeight: '0.8', letterSpacing: '-0.05em' }}
          >
            Build.
          </h1>
        </div>
        
        {/* Layer 3: Create (Extreme foreground) */}
        <div className="absolute top-[70%] md:top-[55%] w-full text-center z-40">
          <h1 
            ref={(el) => kineticRefs.current[2] = el}
            className="text-[80px] md:text-[250px] font-extrabold text-on-surface uppercase tracking-tighter mix-blend-difference" 
            data-drift="0.04"
            style={{ lineHeight: '0.8', letterSpacing: '-0.05em' }}
          >
            Create.
          </h1>
        </div>
      </div>
    </main>
  );
}
