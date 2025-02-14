import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function MyModel() {
  const model = useLoader(GLTFLoader, '/heart-yousef.glb');
  return <primitive object={model.scene} />;
}

export default function HeartMesh({ fireworks }) {
  const heartRef = useRef();

  // Create a heart shape
  const createHeartShape = () => {
    const x = 0,
      y = 0;
    const heartShape = new THREE.Shape();

    heartShape.moveTo(x, y);
    heartShape.bezierCurveTo(x - 0.5, y + 0.5, x - 1.2, y - 0.3, x, y - 1.5);
    heartShape.bezierCurveTo(x + 1.2, y - 0.3, x + 0.5, y + 0.5, x, y);

    return heartShape;
  };

  // Extrude settings for depth and smoothness
  const extrudeSettings = {
    depth: 0.5, // Thickness of the heart
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.05,
    bevelSegments: 10,
  };

  const geometry = new THREE.ExtrudeGeometry(createHeartShape(), extrudeSettings);
  geometry.center();

  // Add a slight rotation animation
  useFrame(() => {
    if (heartRef.current) {
      heartRef.current.rotation.y += 0.01; // Slow rotation
    }
  });

  return (
    <mesh ref={heartRef} geometry={geometry}>
      <meshStandardMaterial
        color="#ff69b4"
        metalness={0.8}
        roughness={0.2}
        emissive="#ff1493"
        emissiveIntensity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
