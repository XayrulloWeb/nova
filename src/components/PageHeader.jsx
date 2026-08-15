import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PageHeader({ title, subtitle, showBack = true }) {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    function syncSize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', syncSize);
    syncSize();

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_isLight;
      varying vec2 v_uv;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv.x *= u_resolution.x / u_resolution.y;

        // Abstract wave animation
        vec3 color = vec3(0.0);
        
        float t = u_time * 0.5;
        
        vec2 p = uv * 2.0 - vec2(2.0, 1.0);
        
        for(float i = 1.0; i < 4.0; i++) {
            vec2 newp = p;
            newp.x += 0.6 / i * sin(i * p.y + t + 0.3) + 0.5;
            newp.y += 0.6 / i * cos(i * p.x + t + 0.3) - 0.5;
            p = newp;
        }
        
        float val = 0.5 * sin(3.0 * p.x) + 0.5 * cos(3.0 * p.y);
        
        vec3 col1 = vec3(0.0, 0.85, 0.91); // Cyan
        vec3 col2 = vec3(0.0, 0.4, 0.6);   // Darker Cyan
        
        vec3 finalColor = mix(col1, col2, val);
        
        // Dark/Light theme base
        vec3 baseBg = mix(vec3(0.05, 0.05, 0.07), vec3(0.95, 0.95, 0.98), u_isLight);
        
        // Blend wave into background
        finalColor = mix(baseBg, finalColor, 0.3 + 0.2 * sin(u_time * 0.5));
        
        gl_FragColor = vec4(finalColor, 1.0);
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

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center overflow-hidden pt-20 border-b border-outline/10">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0"></canvas>
      <div className="absolute inset-0 bg-background/50 z-10 pointer-events-none mix-blend-overlay"></div>
      
      {showBack && (
        <div className="absolute top-[100px] left-4 md:left-12 z-30">
          <Link to="/" className="inline-flex items-center gap-2 text-on-surface hover:text-primary transition-all duration-300 font-label-caps uppercase text-xs tracking-widest bg-surface-container/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-outline-variant/30 hover:border-primary/50 shadow-lg hover:shadow-xl hover:-translate-x-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span style={{ mixBlendMode: theme === 'light' ? 'normal' : 'difference', color: theme === 'light' ? '#000' : '#fff' }} className="font-bold">{t('header.home') || 'Asosiy'}</span>
          </Link>
        </div>
      )}

      <div className="relative z-20 text-center px-4" style={{ mixBlendMode: theme === 'light' ? 'normal' : 'difference', color: theme === 'light' ? '#000' : '#fff' }}>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase mb-4 text-shimmer">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl font-medium opacity-90 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
