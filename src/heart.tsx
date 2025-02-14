"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export default function Heart() {
  const heartRef = useRef<THREE.Group>(null)

  // Gentle floating animation
  useFrame((state) => {
    if (heartRef.current) {
      heartRef.current.rotation.y += 0.005
      heartRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff69b4" />

      {/* Heart Mesh */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#ff69b4"
          metalness={0.7}
          roughness={0.2}
          emissive="#ff1493"
          emissiveIntensity={0.2}
        />
      </mesh>
    </>
  )
}

