import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry";
import gsap from "gsap";

// Animation and configuration settings
const CONFIG = {
  // Mobius strip settings
  twists: 4,
  size: {
    radius: 1,
    pointSize: 0.022,
    pointDetail: 16,
  },

  // Particle physics
  physics: {
    springStrength: 0.01,
    velocityDamping: 0.9,
    repelStrength: 0.01,
    repelDistance: 0.5,
  },

  // Colors and appearance
  colors: {
    background: 0xd9d9d9,
    points: 0x101010,
  },

  // Camera and animation
  camera: {
    fov: 60,
    initialZ: 5,
    scrollFactor: 45, // How much camera pulls back on scroll
  },

  // Animation timing
  animation: {
    phaseSpeed: 0.005,
    transitionDuration: 0.3,
    fadeThreshold: 0.1,
    rotationFactor: 1.5, // Rotation speed multiplier
  },
};

const MobiusStrip: React.FC = () => {
  const mobiusRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const mount = mobiusRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CONFIG.camera.fov,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = CONFIG.camera.initialZ;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(CONFIG.colors.background, 1);
    mount.appendChild(renderer.domElement);

    const balls = new THREE.Group();
    scene.add(balls);

    const sphereGeometry = new THREE.SphereGeometry(
      CONFIG.size.pointSize,
      CONFIG.size.pointDetail,
      CONFIG.size.pointDetail
    );
    const material = new THREE.MeshStandardMaterial({
      color: CONFIG.colors.points,
      transparent: true,
      opacity: 1,
    });

    const ballsPhysics: Array<{
      originalPosition: THREE.Vector3;
      velocity: THREE.Vector3;
      force: THREE.Vector3;
    }> = [];

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const mouseWorldPos = new THREE.Vector3();
    const invertedBallMatrix = new THREE.Matrix4();
    const springForce = new THREE.Vector3();
    const repelForce = new THREE.Vector3();

    const createMobiusPoints = (phase: number) => {
      while (balls.children.length > 0) {
        balls.remove(balls.children[0]);
      }
      ballsPhysics.length = 0;

      const geometry = new ParametricGeometry(
        (u, v, target) => {
          u *= Math.PI * 2;
          v = v * 2 - 1;

          const R = CONFIG.size.radius;
          const twistFactor = Math.sin(phase);
          const x =
            (R +
              (v / 2) *
                Math.cos((CONFIG.twists * u) / 2 + twistFactor * Math.PI)) *
            Math.cos(u);
          const y =
            (R +
              (v / 2) *
                Math.cos((CONFIG.twists * u) / 2 + twistFactor * Math.PI)) *
            Math.sin(u);
          const z =
            (v / 2) * Math.sin((CONFIG.twists * u) / 2 + twistFactor * Math.PI);

          target.set(x, y, z);
        },
        100,
        20
      );

      const positions = geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const ball = new THREE.Mesh(sphereGeometry, material);
        ball.position.set(positions[i], positions[i + 1], positions[i + 2]);

        const distanceFromCenter = Math.sqrt(
          positions[i] * positions[i] +
            positions[i + 1] * positions[i + 1] +
            positions[i + 2] * positions[i + 2]
        );

        const scale = Math.max(0.4, 1 - distanceFromCenter * 0.5);
        ball.scale.set(scale, scale, scale);

        balls.add(ball);

        ballsPhysics.push({
          originalPosition: ball.position.clone(),
          velocity: new THREE.Vector3(0, 0, 0),
          force: new THREE.Vector3(0, 0, 0),
        });
      }

      geometry.dispose();
    };

    const ambientLight = new THREE.AmbientLight(0x404040);
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight, pointLight);

    let phase = 0;
    let opacity = 1;

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      phase += CONFIG.animation.phaseSpeed;
      if (phase >= 2 * Math.PI) {
        phase = 0;
      }

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.at(5, mouseWorldPos);
      invertedBallMatrix.copy(balls.matrixWorld).invert();
      mouseWorldPos.applyMatrix4(invertedBallMatrix);

      for (let i = 0; i < balls.children.length; i++) {
        const ball = balls.children[i] as THREE.Mesh;
        const physics = ballsPhysics[i];

        springForce.subVectors(physics.originalPosition, ball.position);
        springForce.multiplyScalar(CONFIG.physics.springStrength);
        physics.force.copy(springForce);

        const distToMouse = ball.position.distanceTo(mouseWorldPos);
        if (distToMouse < CONFIG.physics.repelDistance) {
          repelForce.subVectors(ball.position, mouseWorldPos);
          repelForce.normalize();
          repelForce.multiplyScalar(
            CONFIG.physics.repelStrength / (distToMouse * distToMouse + 0.01)
          );
          physics.force.add(repelForce);
        }

        physics.velocity.add(physics.force);
        physics.velocity.multiplyScalar(CONFIG.physics.velocityDamping);
        ball.position.add(physics.velocity);

        const ballMaterial = ball.material as THREE.MeshStandardMaterial;
        ballMaterial.opacity = opacity;
      }

      renderer.render(scene, camera);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      if (!cameraRef.current) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, scrollTop / scrollHeight));

      const targetZ =
        CONFIG.camera.initialZ - scrollProgress * CONFIG.camera.scrollFactor;

      const fadeThreshold = CONFIG.animation.fadeThreshold;
      const newOpacity =
        scrollProgress < fadeThreshold
          ? 1
          : Math.max(
              0,
              1 - (scrollProgress - fadeThreshold) / (0.15 - fadeThreshold)
            );

      gsap.to(cameraRef.current.position, {
        z: targetZ,
        duration: CONFIG.animation.transitionDuration,
        ease: "power1.out",
      });

      gsap.to(
        { value: opacity },
        {
          value: newOpacity,
          duration: CONFIG.animation.transitionDuration,
          ease: "power1.out",
          onUpdate: function () {
            opacity = this.targets()[0].value;
          },
        }
      );

      gsap.to(renderer.domElement, {
        opacity: newOpacity,
        duration: CONFIG.animation.transitionDuration,
        ease: "power1.out",
      });

      gsap.to(balls.rotation, {
        z: scrollProgress * Math.PI * CONFIG.animation.rotationFactor,
        duration: CONFIG.animation.transitionDuration,
        ease: "power1.out",
      });

      if (scrollProgress < 0.166) {
        document.body.style.color = newOpacity < 0.5 ? "#fff" : "";
        document.body.style.backgroundColor = newOpacity < 0.5 ? "#050505" : "";
      }
    };

    createMobiusPoints(0);
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      if (!cameraRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      mount.removeChild(renderer.domElement);
      sphereGeometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="mobius"
      ref={mobiusRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default MobiusStrip;
