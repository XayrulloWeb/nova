import React, { useEffect, useRef } from 'react';

export default function TechnologyFluidKinetic() {
  const shaderContainerRef = useRef(null);

  useEffect(() => {
    const canvas = shaderContainerRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const vertexShaderSource = `
        attribute vec2 a_position;
        varying vec2 v_texCoord;
        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            v_texCoord = a_position * 0.5 + 0.5;
        }
    `;

    const fragmentShaderSource = `
        precision highp float;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        varying vec2 v_texCoord;

        float noise(vec3 p) {
            vec3 i = floor(p);
            vec4 a = dot(i, vec3(1.0, 57.0, 21.0)) + vec4(0.0, 57.0, 21.0, 78.0);
            vec3 f = cos((p-i)*acos(-1.0))*(-0.5)+0.5;
            a = mix(sin(cos(a)*abs(sin(a))), sin(cos(a+1.0)*abs(sin(a+1.0))), f.x);
            a.xy = mix(a.xz, a.yw, f.y);
            return mix(a.x, a.y, f.z);
        }

        void main() {
            vec2 uv = v_texCoord;
            vec2 mouse = u_mouse / u_resolution;
            
            float n = noise(vec3(uv * 3.0, u_time * 0.2));
            float m = distance(uv, mouse);
            
            vec3 color1 = vec3(0.05, 0.05, 0.07); // Deep noir
            vec3 color2 = vec3(0.0, 0.94, 1.0);  // Kinetic Cyan
            
            float glow = 0.05 / (m + 0.5);
            vec3 finalColor = mix(color1, color2 * 0.2, n);
            finalColor += color2 * glow * 0.3;
            
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `;

    const compileShader = (source, type) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    const handleMouseMove = (e) => {
        mouseX = e.clientX;
        mouseY = window.innerHeight - e.clientY;
    };
    document.addEventListener('mousemove', handleMouseMove);

    const startTime = Date.now();
    let animationId;
    const render = () => {
        const time = (Date.now() - startTime) / 1000;
        gl.uniform1f(timeLocation, time);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.uniform2f(mouseLocation, mouseX, mouseY);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="h-screen w-full flex overflow-x-auto overflow-y-hidden scroll-container relative z-10" id="fluid-kinetic">
      {/* Full Screen WebGL Shader Background */}
      <canvas ref={shaderContainerRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none"></canvas>
      
      {/* Screen 1 - Left Content */}
      <div className="scroll-section min-w-[100vw] h-full flex items-center justify-start pl-margin-mobile md:pl-[300px] shrink-0 relative z-10">
        <div className="flex flex-col gap-6 z-10 max-w-[80vw]">
          <h1 className="text-[80px] md:text-[200px] font-extrabold text-on-surface leading-none">
            <span className="inline-block hover:transform hover:translate-x-2 transition-transform duration-300 opacity-0 animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards] cursor-default">Code.</span><br/>
            <span className="text-primary-fixed-dim inline-block hover:transform hover:translate-x-2 transition-transform duration-300 opacity-0 animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards] cursor-default">Build.</span><br/>
            <span className="inline-block hover:transform hover:translate-x-2 transition-transform duration-300 opacity-0 animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_0.6s_forwards] cursor-default">Create.</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-lg mt-8 opacity-0 animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_0.8s_forwards]">
              Enter the environment where raw logic meets uncompromising design. The laboratory is ready.
          </p>
          <div className="mt-12 flex items-center gap-4 opacity-0 animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_1s_forwards]">
            <button className="glass-card text-on-surface px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group">
                Initialize Core
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-margin-desktop right-margin-desktop hidden md:flex items-center gap-2 text-on-surface-variant opacity-0 animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_1.2s_forwards_pulse]">
          <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </div>
      </div>

      {/* Screen 2 - Right Content */}
      <div className="scroll-section min-w-[100vw] h-full flex items-center justify-center shrink-0 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop relative h-[819px]">
          
          {/* Centerpiece: MacBook Placeholder */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[60%] aspect-video z-20">
            <div className="w-full h-full glass-card rounded-2xl overflow-hidden relative shadow-[0_0_80px_rgba(0,219,233,0.1)] transition-transform duration-1000 hover:scale-[1.02]">
              <img className="w-full h-full object-cover opacity-80 mix-blend-luminosity" alt="MacBook" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOK8DYGvAT_EcGcevZObvSH-QwY5Nt99zJ6EdlEJxPKDGJZV_GKjVsG6ziQ04tntM7TVc_LMDm0tT8CshKtoYMNGonDpeAEq2REoClVuGcqSASJYsKkvAcEnM4k5klJ2NiVasU-xQXZsN-gtcVf4igZErhqM2cixDqPPoe8nebJKZjmLzmgR5tayZwWID5lQmmWYnV1Lzs3noNPfrmeNYsmCueeqH74-75yzjagmX2DFfOutRt4eZJ" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
          
          {/* Floating Element 1: Glass Cube */}
          <div className="absolute top-[15%] right-[10%] w-48 h-48 md:w-64 md:h-64 z-30 animate-[float_6s_ease-in-out_infinite]">
            <img className="w-full h-full object-contain drop-shadow-2xl opacity-90" alt="Glass Cube" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWWydoN9FS1QpYzEf0KszKS8WpV2s_enu-68a1jpzr0JGCbmiHAFH96H4oUtOu-mHZiNLq-f1sYhSY-HKytuR7rzK14GlpMW1QLg4aFIWd4ZbMIHVrcoz1LZUVmofC5z3zVn0kFYgA1CivZA_Cbp1uN2oz1sa2qQ1a-vg_cjJqiUaRvooLS6kbx7UwEZMhRuommXD4m1-zYSh3FkbO-YjghHJboGUFnLYUtwg9Y8qN8NA7GV76U3vz" />
          </div>
          
          {/* Floating Element 2: UI Fragment */}
          <div className="absolute bottom-[20%] left-[5%] w-64 md:w-80 glass-card rounded-xl p-6 z-30 animate-[float_8s_ease-in-out_infinite_reverse]">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center text-primary-fixed-dim">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
              </div>
              <div>
                <div className="text-xs font-bold tracking-widest uppercase text-on-surface">System Status</div>
                <div className="text-body-md text-primary-fixed-dim">Fluid Dynamics Active.</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary-fixed-dim w-[85%] shadow-[0_0_10px_#00dbe9]"></div>
              </div>
              <div className="h-2 w-[70%] bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-on-surface-variant w-[40%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
