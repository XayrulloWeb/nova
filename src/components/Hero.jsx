import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import Countdown from './Countdown';

export default function Hero() {
  const shaderContainerRef = useRef(null);
  const threeContainerRef = useRef(null);
  const { theme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    // ----------------------------------------------------
    // 1. WEBGL SHADER BACKGROUND (Cinematic Void)
    // ----------------------------------------------------
    const canvas = shaderContainerRef.current;
    if (!canvas) return;

    function syncSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', syncSize);
    syncSize();

    const gl = canvas.getContext('webgl');
    if (!gl) return;
    
    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_isLight;
      varying vec2 v_texCoord;

      float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
          vec2 uv = v_texCoord;
          vec3 darkColor = vec3(0.005, 0.005, 0.01);
          vec3 lightColor = vec3(0.97, 0.97, 0.98);
          vec3 baseColor = mix(darkColor, lightColor, u_isLight);

          // Dynamic light rays
          float rays = sin(uv.x * 2.0 + u_time * 0.2) * sin(uv.y * 1.5 - u_time * 0.1);
          vec3 rayColor = mix(vec3(0.0, 0.94, 1.0), vec3(0.0, 0.5, 0.6), u_isLight);
          baseColor += rayColor * max(0.0, rays) * 0.05;

          // Vignette
          float d = distance(uv, vec2(0.5));
          baseColor *= mix((1.2 - d * 1.5), (1.0 - d * 0.2), u_isLight);

          gl_FragColor = vec4(baseColor, 1.0);
      }
    `;
    
    const compileShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uIsLight = gl.getUniformLocation(prog, 'u_isLight');
    
    let animationId;
    function render(t) {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uIsLight) gl.uniform1f(uIsLight, theme === 'light' ? 1.0 : 0.0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }
    render(0);

    return () => {
      window.removeEventListener('resize', syncSize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  useEffect(() => {
    // ----------------------------------------------------
    // 2. THREE.JS FOREGROUND (Stunning 3D Geometric Scene)
    // ----------------------------------------------------
    const container = threeContainerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const coreGeom = new THREE.IcosahedronGeometry(6, 1);
    
    const coreMat = theme === 'light' 
      ? new THREE.MeshBasicMaterial({ color: 0xf8f9fa })
      : new THREE.MeshStandardMaterial({
          color: 0x111111,
          metalness: 0.9,
          roughness: 0.1
        });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    mainGroup.add(coreMesh);

    const wireMat = new THREE.MeshBasicMaterial({
      color: theme === 'light' ? 0x009ca6 : 0x00dbe9,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireMesh = new THREE.Mesh(coreGeom, wireMat);
    wireMesh.scale.set(1.05, 1.05, 1.05);
    mainGroup.add(wireMesh);

    const particleCount = isMobile ? 300 : 1000;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        pPos[i] = (Math.random() - 0.5) * 50;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ 
        color: theme === 'light' ? 0x495057 : 0xffffff, 
        size: 0.1, 
        transparent: true, 
        opacity: theme === 'light' ? 0.2 : 0.5 
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    
    const pointLight = new THREE.PointLight(theme === 'light' ? 0x00dbe9 : 0x00f0ff, 50, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 20, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;

      coreMesh.rotation.y += 0.005;
      coreMesh.rotation.x += 0.002;
      wireMesh.rotation.y += 0.005;
      wireMesh.rotation.x += 0.002;

      mainGroup.position.y = Math.sin(time) * 1.5;

      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme]);

  return (
    <section className="relative overflow-hidden bg-background pt-[120px] pb-[80px] lg:pt-[160px] lg:pb-[120px] min-h-[100vh] flex items-center z-10" id="home">
      
      {/* Background Shader */}
      <div className="absolute inset-0 z-0">
        <canvas ref={shaderContainerRef} className="w-full h-full block pointer-events-none"></canvas>
      </div>

      {/* 3D Foreground Scene */}
      <div ref={threeContainerRef} className={`absolute inset-0 z-10 pointer-events-none ${theme === 'light' ? 'mix-blend-normal' : 'mix-blend-screen'}`}></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-20 w-full text-center pointer-events-none">
        
        {/* Background "NOVA" text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none pointer-events-none flex justify-center w-full opacity-[0.04]">
          <span className="text-[180px] sm:text-[280px] md:text-[400px] lg:text-[500px] font-black tracking-tighter uppercase whitespace-nowrap text-on-surface">
            NOVA
          </span>
        </div>

        <div className="mx-auto max-w-4xl flex flex-col items-center" style={{ mixBlendMode: theme === 'light' ? 'normal' : 'difference', color: theme === 'light' ? '#000' : '#fff' }}>
          
          {/* Badge */}
          <div className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-8 font-label-caps text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(0,219,233,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t('hero.badge')}
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-extrabold tracking-tight text-on-surface mb-6 leading-[1.1] uppercase">
            NOVA <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container animate-pulse-slow inline-block">
              International AI School
            </span>
          </h1>
          
          {/* Subtitle */}

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto pointer-events-auto">
            <Link 
              to="/apply" 
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-on-surface text-surface font-semibold text-xl hover:scale-105 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center"
            >
              {t('hero.applyBtn')}
            </Link>
            <Link 
              to="/about" 
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-transparent border-2 border-outline/50 text-on-surface font-semibold text-xl hover:bg-surface-container hover:border-outline-variant transition-all duration-300 flex items-center justify-center"
            >
              {t('hero.aboutBtn')}
            </Link>
          </div>

          {/* Countdown Timer */}
          <Countdown targetDate="2026-09-03T00:00:00" />
        </div>
      </div>
    </section>
  );
}
