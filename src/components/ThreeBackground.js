/**
 * ATLAS CREA — 3D Hero Animation
 * Interactive Three.js scene with floating geometric shapes
 */
import * as THREE from 'three';

export default class AtlasHero3D {
  constructor(container) {
    this.container = container;
    this.mouse = { x: 0, y: 0 };
    this.shapes = [];
    this.init();
  }

  init() {
    const { innerWidth: w, innerHeight: h } = window;
    
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    this.camera.position.z = 12;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);
    
    // Lights
    const ambient = new THREE.AmbientLight(0x404060);
    this.scene.add(ambient);
    
    const light1 = new THREE.PointLight(0x5532E4, 2, 30);
    light1.position.set(-5, 3, 5);
    this.scene.add(light1);
    
    const light2 = new THREE.PointLight(0x15CFCC, 2, 30);
    light2.position.set(5, -3, 5);
    this.scene.add(light2);
    
    const light3 = new THREE.PointLight(0x138CFF, 1.5, 30);
    light3.position.set(0, 5, 3);
    this.scene.add(light3);
    
    // Create floating shapes
    this.createShapes();
    
    // Create particles
    this.createParticles();
    
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / w) * 2 - 1;
      this.mouse.y = -(e.clientY / h) * 2 + 1;
    });
    
    // Touch tracking
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      this.mouse.x = (touch.clientX / w) * 2 - 1;
      this.mouse.y = -(touch.clientY / h) * 2 + 1;
    }, { passive: true });
    
    // Resize
    window.addEventListener('resize', () => this.resize());
    
    // Start animation
    this.animate();
  }
  
  createShapes() {
    const geometries = [
      new THREE.TorusGeometry(0.6, 0.2, 16, 32),
      new THREE.OctahedronGeometry(0.5),
      new THREE.IcosahedronGeometry(0.45),
      new THREE.TorusKnotGeometry(0.4, 0.15, 64, 8),
      new THREE.BoxGeometry(0.6, 0.6, 0.6),
      new THREE.ConeGeometry(0.5, 0.8, 6),
      new THREE.DodecahedronGeometry(0.4),
    ];
    
    const colors = [0x5532E4, 0x15CFCC, 0x138CFF, 0x020E26];
    const emissiveColors = [0x5532E4, 0x15CFCC, 0x138CFF];
    
    for (let i = 0; i < 25; i++) {
      const geom = geometries[i % geometries.length];
      const color = colors[i % colors.length];
      const emissive = emissiveColors[i % emissiveColors.length];
      
      const mat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: emissive,
        emissiveIntensity: 0.15,
        metalness: 0.4,
        roughness: 0.3,
        transparent: true,
        opacity: 0.6 + Math.random() * 0.3,
        wireframe: Math.random() > 0.6,
      });
      
      const mesh = new THREE.Mesh(geom, mat);
      
      // Random positions in a sphere
      const radius = 6 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
      mesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
      mesh.position.z = radius * Math.cos(phi) - 2;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      
      mesh.userData = {
        speed: 0.002 + Math.random() * 0.008,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
        floatSpeed: 0.2 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        origX: mesh.position.x,
        origY: mesh.position.y,
        origZ: mesh.position.z,
        scale: 0.5 + Math.random() * 1.5,
      };
      
      mesh.scale.setScalar(mesh.userData.scale);
      
      this.scene.add(mesh);
      this.shapes.push(mesh);
    }
  }
  
  createParticles() {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 2;
      
      sizes[i] = 0.01 + Math.random() * 0.03;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
      color: 0x15CFCC,
      size: 0.04,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }
  
  animate() {
    // Run Three.js in its own loop, throttled to ~30fps for performance
    var lastTime = 0;
    var tick = function(now) {
      // Throttle to ~30fps (every ~33ms)
      if (now - lastTime >= 33) {
        lastTime = now - (now - lastTime) % 33;
        this.tick(Date.now() * 0.001);
      }
      requestAnimationFrame(tick.bind(this));
    }.bind(this);
    requestAnimationFrame(tick);
    this.tick(Date.now() * 0.001);
  }
  
  tick(time) {
    // time in seconds
    
    // Animate shapes
    this.shapes.forEach((shape, i) => {
      const { rotSpeedX, rotSpeedY, rotSpeedZ, floatSpeed, floatOffset, origX, origY, origZ } = shape.userData;
      
      shape.rotation.x += rotSpeedX;
      shape.rotation.y += rotSpeedY;
      shape.rotation.z += rotSpeedZ;
      
      // Float motion
      const float = Math.sin(time * floatSpeed + floatOffset) * 0.5;
      shape.position.x = origX + float * 0.3 + this.mouse.x * 0.3 * (i % 3 - 1);
      shape.position.y = origY + float * 0.5;
      shape.position.z = origZ + float * 0.2 + this.mouse.y * 0.3;
    });
    
    // Rotate particles slowly
    if (this.particles) {
      this.particles.rotation.x = this.mouse.y * 0.1;
      this.particles.rotation.y = this.mouse.x * 0.1;
    }
    
    // Camera following mouse
    this.camera.position.x += (this.mouse.x * 1.5 - this.camera.position.x) * 0.02;
    this.camera.position.y += (-this.mouse.y * 1.5 - this.camera.position.y) * 0.02;
    this.camera.lookAt(0, 0, -1);
    
    this.renderer.render(this.scene, this.camera);
  }
  
  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }
  
  destroy() {
    window.removeEventListener('resize', () => this.resize());
    if (this.renderer) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
  }
}
