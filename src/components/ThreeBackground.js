/**
 * ATLAS CREA — 3D Hero Animation PRO
 * Interactive Three.js scene with floating geometric shapes
 * Colors matching the brand gradient: navy → indigo → azur → cyan
 */
import * as THREE from 'three';

const COLORS = {
  navy: 0x020E26,
  indigo: 0x1A1675,
  azur: 0x3654E3,
  lightBlue: 0x2DA8E2,
  cyan: 0x22D3C5,
  white: 0xffffff,
};

export default class AtlasHero3D {
  constructor(container) {
    this.container = container;
    this.mouse = { x: 0, y: 0 };
    this.shapes = [];
    this.clock = new THREE.Clock();
    this.init();
  }

  init() {
    const { innerWidth: w, innerHeight: h } = window;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    this.camera.position.z = 14;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0x222244, 0.6);
    this.scene.add(ambient);

    // Three colored point lights to match brand gradient
    const lightPositions = [
      { color: COLORS.azur, intensity: 3, pos: [-6, 4, 6] },
      { color: COLORS.cyan, intensity: 2.5, pos: [6, -3, 5] },
      { color: COLORS.indigo, intensity: 2, pos: [0, 6, 3] },
    ];

    lightPositions.forEach(({ color, intensity, pos }) => {
      const light = new THREE.PointLight(color, intensity, 25);
      light.position.set(pos[0], pos[1], pos[2]);
      this.scene.add(light);
    });

    // Create floating shapes
    this.createShapes();
    this.createParticles();
    this.createCenterForm();

    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / w) * 2 - 1;
      this.mouse.y = -(e.clientY / h) * 2 + 1;
    });

    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      this.mouse.x = (touch.clientX / w) * 2 - 1;
      this.mouse.y = -(touch.clientY / h) * 2 + 1;
    }, { passive: true });

    window.addEventListener('resize', () => this.resize());
  }

  createShapes() {
    const geometries = [
      new THREE.IcosahedronGeometry(0.5),
      new THREE.OctahedronGeometry(0.55),
      new THREE.TorusKnotGeometry(0.4, 0.15, 64, 8),
      new THREE.TorusGeometry(0.6, 0.18, 16, 32),
      new THREE.DodecahedronGeometry(0.45),
      new THREE.ConeGeometry(0.5, 0.7, 6),
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
    ];

    const brandColors = [
      COLORS.azur, COLORS.cyan, COLORS.lightBlue, 
      COLORS.indigo, COLORS.azur, COLORS.cyan, COLORS.lightBlue
    ];
    const emissiveColors = [
      COLORS.azur, COLORS.cyan, COLORS.lightBlue,
      COLORS.indigo, COLORS.azur, COLORS.cyan, COLORS.lightBlue
    ];

    for (let i = 0; i < 30; i++) {
      const geom = geometries[i % geometries.length];
      const colorIdx = i % brandColors.length;
      const color = brandColors[colorIdx];
      const emissive = emissiveColors[colorIdx];

      const mat = new THREE.MeshPhysicalMaterial({
        color: color,
        emissive: emissive,
        emissiveIntensity: 0.08 + Math.random() * 0.12,
        metalness: 0.3,
        roughness: 0.25,
        transparent: true,
        opacity: 0.35 + Math.random() * 0.35,
        wireframe: Math.random() > 0.65,
        clearcoat: Math.random() > 0.7 ? 0.3 : 0,
      });

      const mesh = new THREE.Mesh(geom, mat);

      // Distribute in a sphere volume
      const radius = 5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      mesh.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi) - 1
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const scale = 0.4 + Math.random() * 1.6;
      mesh.scale.setScalar(scale);

      mesh.userData = {
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.015,
        },
        floatSpeed: 0.15 + Math.random() * 0.4,
        floatOffset: Math.random() * Math.PI * 2,
        origPos: mesh.position.clone(),
        mouseInfluence: 0.15 + Math.random() * 0.3,
      };

      this.scene.add(mesh);
      this.shapes.push(mesh);
    }
  }

  createParticles() {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const palette = [
      new THREE.Color(COLORS.azur),
      new THREE.Color(COLORS.cyan),
      new THREE.Color(COLORS.lightBlue),
      new THREE.Color(COLORS.indigo),
    ];

    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 1;

      // Random color from palette
      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = 0.02 + Math.random() * 0.04;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createCenterForm() {
    // A subtle central structure — a large wireframe icosahedron
    const geom = new THREE.IcosahedronGeometry(2.2, 0);
    const mat = new THREE.MeshPhysicalMaterial({
      color: COLORS.azur,
      emissive: COLORS.cyan,
      emissiveIntensity: 0.05,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    this.centerMesh = new THREE.Mesh(geom, mat);
    this.centerMesh.position.z = -1;
    this.scene.add(this.centerMesh);
    
    // Second inner ring
    const ringGeom = new THREE.TorusGeometry(1.5, 0.02, 16, 48);
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: COLORS.cyan,
      emissive: COLORS.cyan,
      emissiveIntensity: 0.1,
      transparent: true,
      opacity: 0.15,
    });
    this.ringMesh = new THREE.Mesh(ringGeom, ringMat);
    this.ringMesh.position.z = -1;
    this.ringMesh.rotation.x = Math.PI / 3;
    this.scene.add(this.ringMesh);
  }

  animate() {
    const tick = () => {
      if (!window.__lenisScrolling) {
        this.tick(this.clock.getElapsedTime());
        this.renderer.render(this.scene, this.camera);
      }
      requestAnimationFrame(tick);
    };
    // Initial render
    this.tick(0);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(tick);
  }

  tick(time) {
    // Animate shapes
    this.shapes.forEach((shape) => {
      const { rotSpeed, floatSpeed, floatOffset, origPos, mouseInfluence } = shape.userData;

      shape.rotation.x += rotSpeed.x;
      shape.rotation.y += rotSpeed.y;
      shape.rotation.z += rotSpeed.z;

      // Float + mouse react
      const float = Math.sin(time * floatSpeed + floatOffset);
      shape.position.x = origPos.x + float * 0.25 + this.mouse.x * mouseInfluence * 0.8;
      shape.position.y = origPos.y + float * 0.4;
      shape.position.z = origPos.z + float * 0.15 + this.mouse.y * mouseInfluence * 0.6;
    });

    // Center icosahedron — slow spin
    if (this.centerMesh) {
      this.centerMesh.rotation.x = time * 0.05;
      this.centerMesh.rotation.y = time * 0.08;
    }
    if (this.ringMesh) {
      this.ringMesh.rotation.x = Math.PI / 3 + time * 0.06;
      this.ringMesh.rotation.z = time * 0.04;
    }

    // Particles drift
    if (this.particles) {
      this.particles.rotation.x += (this.mouse.y * 0.008 - this.particles.rotation.x) * 0.01;
      this.particles.rotation.y += (this.mouse.x * 0.008 - this.particles.rotation.y) * 0.01;
    }
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
