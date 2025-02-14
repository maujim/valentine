'use client';

import { useState } from 'react';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { Text } from '@react-three/drei';
import { Howl } from 'howler';

const shatterSound = new Howl({
  src: ['/glass-break.wav'],
  preload: true,
});

function ShatterPiece({ position, rotation = [0, 0, 0], velocity = [0, 0, 0], angularVelocity = [0, 0, 0] }) {
  const [ref] = useBox(() => ({
    mass: 0.1,
    position,
    rotation,
    velocity,
    angularVelocity,
    args: [0.3, 0.1, 0.05],
  }));

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[0.3, 0.1, 0.05]} />
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.1}
        roughness={0}
        transmission={0.9}
        thickness={0.5}
        clearcoat={1}
        clearcoatRoughness={0}
        ior={1.5}
      />
    </mesh>
  );
}

function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -15, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
  );
}

export default function ShatterButton({ position }) {
  const [shattered, setShattered] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleShatter = () => {
    shatterSound.play();
    setShattered(true);
  };

  return shattered ? (
    <Physics gravity={[0, -2.5, 0]}>
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const force = 2 + Math.random() * 2;
        const xVel = Math.cos(angle) * force;
        const yVel = Math.sin(angle) * force + 2;
        const zVel = (Math.random() - 0.5) * 3;

        return (
          <ShatterPiece
            key={i}
            position={[
              position[0] + (Math.random() - 0.5) * 0.2,
              position[1] + (Math.random() - 0.5) * 0.2,
              position[2] + (Math.random() - 0.5) * 0.2,
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            velocity={[xVel, yVel, zVel]}
            angularVelocity={[(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5]}
          />
        );
      })}
      <Ground />
    </Physics>
  ) : (
    <group
      position={position}
      onClick={handleShatter}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <mesh>
        <boxGeometry args={[2, 0.5, 0.2]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0}
          transmission={0.9}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.5}
        />
      </mesh>
      <Text position={[0, 0, 0.15]} fontSize={0.3} color="#ff1493" anchorX="center" anchorY="middle">
        No
      </Text>
    </group>
  );
}
