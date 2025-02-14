import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export default function Fireworks() {
  const particles = useRef([]);
  const points = useRef(null);
  const [positions] = useState(() => new Float32Array(500 * 3));
  const [colors] = useState(() => new Float32Array(500 * 3));

  const createExplosion = (origin, particleCount, color) => {
    for (let i = 0; i < particleCount; i++) {
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;
      const velocity = new THREE.Vector3(
        Math.sin(angle1) * Math.cos(angle2),
        Math.cos(angle1),
        Math.sin(angle1) * Math.sin(angle2),
      ).multiplyScalar(0.05 + Math.random() * 0.05);

      particles.current.push({
        position: origin.clone(),
        velocity,
        color: color.clone().multiplyScalar(0.6),
        life: 1.0,
      });
    }
  };

  useFrame(() => {
    if (particles.current.length < 500 && Math.random() < 0.05) {
      const x = (Math.random() - 0.5) * 3;
      const y = Math.random() * 2;
      const z = (Math.random() - 0.5) * 3;
      createExplosion(new THREE.Vector3(x, y, z), 30, new THREE.Color().setHSL(Math.random(), 0.8, 0.5));
    }

    let particleIndex = 0;
    particles.current = particles.current.filter(particle => {
      particle.position.add(particle.velocity);
      particle.velocity.y -= 0.001;
      particle.life -= 0.025;

      if (particle.life > 0 && particleIndex < 500) {
        positions[particleIndex * 3] = particle.position.x;
        positions[particleIndex * 3 + 1] = particle.position.y;
        positions[particleIndex * 3 + 2] = particle.position.z;

        colors[particleIndex * 3] = particle.color.r;
        colors[particleIndex * 3 + 1] = particle.color.g;
        colors[particleIndex * 3 + 2] = particle.color.b;

        particleIndex++;
        return true;
      }
      return false;
    });

    if (points.current) {
      points.current.geometry.attributes.position.needsUpdate = true;
      points.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={1} vertexColors transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </points>
  );
}
