import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeJSRenderer({ shape }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (shape) {
      const canvas = canvasRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      // Here you would typically create a Three.js object from the shape data
      // For now, we'll just create a simple cube as a placeholder
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate();

      return () => {
        // Clean up Three.js resources when component unmounts
        scene.remove(cube);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    }
  }, [shape]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "400px" }} />;
}
