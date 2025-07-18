import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three-stdlib';

const AsciiDonut: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();

    useEffect(() => {
        if (!containerRef.current) return;
        
        const container = containerRef.current;
        
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0, 0, 0);

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
        effect.setSize(window.innerWidth, window.innerHeight);
        effect.domElement.style.color = 'white';
        effect.domElement.style.backgroundColor = '#222222';

        containerRef.current.appendChild(effect.domElement);

        const geometry = new THREE.TorusGeometry(1, 0.4, 32, 64);
        
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            flatShading: true,
        });

        const donut = new THREE.Mesh(geometry, material);
        scene.add(donut);

        const light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(1, 1, 1);
        scene.add(light1);

        const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
        light2.position.set(-1, -1, -1);
        scene.add(light2);

        const animate = () => {
            donut.rotation.x += 0.005;
            donut.rotation.y += 0.005;

            effect.render(scene, camera);
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            effect.setSize(window.innerWidth, window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            if (container && effect.domElement.parentNode) {
                container.removeChild(effect.domElement);
            }
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            // Dispose of resources
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [containerRef]);

    return <div ref={containerRef} className="ascii" />;
};

export default AsciiDonut;
