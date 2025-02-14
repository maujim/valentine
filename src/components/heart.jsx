import * as THREE from 'three';
import { useEffect,useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function HeartMesh() {
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

  // Add a slight rotation animation
  useFrame(() => {
    if (heartRef.current) {
      heartRef.current.rotation.y += 0.01; // Slow rotation
    }
  });

  useEffect(() => {
    if (heartRef.current) {
      heartRef.current.geometry.center(); // Centers geometry around its own origin
    }
  }, []);

  return (
    <mesh ref={heartRef}>
      <extrudeGeometry args={[createHeartShape(), extrudeSettings]} />
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
