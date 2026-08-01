import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TechnologyGeometricParallax() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });

    const points = [];
    for (let i = 0; i < 70; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 15
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        const s = Math.random() * 0.5 + 0.1;
        mesh.scale.set(s, s, s);
        scene.add(mesh);
        points.push({
            mesh,
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.005,
                (Math.random() - 0.5) * 0.005,
                (Math.random() - 0.5) * 0.005
            )
        });
    }

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    camera.position.z = 10;

    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const scrollContainer = scrollRef.current;
    
    function animate() {
        animationId = requestAnimationFrame(animate);
        
        points.forEach(p => {
            p.mesh.position.add(p.velocity);
            p.mesh.rotation.x += 0.002;
            p.mesh.rotation.y += 0.002;
            
            if (Math.abs(p.mesh.position.x) > 20) p.velocity.x *= -1;
            if (Math.abs(p.mesh.position.y) > 15) p.velocity.y *= -1;
        });
        
        // Gentle camera pan based on mouse
        camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.02;
        
        // Parallax camera panning based on scroll position
        if (scrollContainer) {
          const scrollFactor = (scrollContainer.scrollLeft / scrollContainer.scrollWidth) * 10;
          camera.position.x += scrollFactor * 0.1;
        }

        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
        }
        renderer.dispose();
    };
  }, []);

  const handleScroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const scrollX = scrollContainer.scrollLeft;
    const parallaxElements = scrollContainer.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax') || '0');
        const xVal = scrollX * speed * 0.5;
        el.style.transform = `translateX(${xVal}px)`;
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-surface-container-lowest">
      {/* 3D Background Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none blend-adaptive opacity-70"></div>
      
      {/* Horizontal Scroll Canvas */}
      <main 
        ref={scrollRef} 
        onScroll={handleScroll}
        className="absolute inset-0 w-full h-full flex overflow-x-auto overflow-y-hidden scroll-container hide-scrollbar z-10"
      >
        {/* Screen 1 - Typography Midground */}
        <section className="scroll-section min-w-[100vw] h-full flex items-center justify-start pl-margin-mobile md:pl-[300px] shrink-0 relative">
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-64 h-96 bg-primary-fixed-dim rounded-full blur-[150px] opacity-10 pointer-events-none" data-parallax="0.2"></div>
          
          <div className="flex flex-col gap-6 z-10 max-w-[80vw]" data-parallax="0.5">
            <h2 className="text-primary-fixed-dim font-label-caps tracking-widest text-sm uppercase">O'quv Dasturi Yo'lboshchisi</h2>
            <h1 className="text-[80px] md:text-[180px] font-extrabold text-on-surface leading-[0.8] tracking-tighter uppercase cursor-default">
              Front.<br/>
              <span className="text-primary-fixed-dim">Back.</span><br/>
              S.I.
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-lg mt-8 opacity-80" data-parallax="0.6">
              Zamonaviy dasturiy injiniring asoslariga chuqur sho'ng'ish. Haqiqiy loyihalar, zamonaviy texnologiyalar va faqat sanoat standartlariga asoslangan amaliy ta'limni his eting.
            </p>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-margin-desktop right-margin-desktop hidden md:flex items-center gap-2 text-on-surface-variant opacity-50 animate-pulse z-50">
            <span className="font-label-caps uppercase text-xs tracking-widest">Aylantiring</span>
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </div>
        </section>

        {/* Screen 2 - Right Content (Visual Focus) */}
        <section className="scroll-section min-w-[100vw] h-full flex items-center justify-center shrink-0 relative overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop relative h-full flex items-center justify-center">
            
            {/* Midground Text */}
            <h2 className="absolute top-1/4 -left-[10%] text-[100px] md:text-[150px] font-extrabold text-surface-bright opacity-30 whitespace-nowrap z-0" data-parallax="-0.3">
                ZAMONAVIY
            </h2>
            <h2 className="absolute bottom-1/4 -right-[10%] text-[100px] md:text-[150px] font-extrabold text-surface-bright opacity-30 whitespace-nowrap z-0" data-parallax="-0.5">
                STACK
            </h2>

            {/* Foreground Centerpiece */}
            <div className="relative w-full md:w-[70%] aspect-video z-20" data-parallax="0.8">
              <div className="w-full h-full glass-card rounded-2xl overflow-hidden relative shadow-[0_0_80px_rgba(0,219,233,0.1)] transition-transform duration-1000 hover:scale-[1.02]">
                <img 
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity" 
                  alt="Student Coding Environment" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOK8DYGvAT_EcGcevZObvSH-QwY5Nt99zJ6EdlEJxPKDGJZV_GKjVsG6ziQ04tntM7TVc_LMDm0tT8CshKtoYMNGonDpeAEq2REoClVuGcqSASJYsKkvAcEnM4k5klJ2NiVasU-xQXZsN-gtcVf4igZErhqM2cixDqPPoe8nebJKZjmLzmgR5tayZwWID5lQmmWYnV1Lzs3noNPfrmeNYsmCueeqH74-75yzjagmX2DFfOutRt4eZJ" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              </div>
            </div>

            {/* UI Fragment */}
            <div className="absolute bottom-[20%] left-[5%] w-64 md:w-80 glass-card rounded-xl p-6 z-30 animate-[float_8s_ease-in-out_infinite_reverse]" data-parallax="1.0">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center text-primary-fixed-dim">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase text-on-surface">Avto-Baholash</div>
                  <div className="text-body-md text-primary-fixed-dim">Barcha testlar o'tdi.</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary-fixed-dim w-[100%] shadow-[0_0_10px_#00dbe9]"></div>
                </div>
                <div className="h-2 w-[70%] bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-on-surface-variant w-[80%]"></div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
