"use client"

import { Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from "three"

interface ButtonProps {
  text: string
  position: [number, number, number]
  onClick: () => void
}

export default function Button3D({ text, position, onClick }: ButtonProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (meshRef.current && hovered) {
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.1, 0.1)
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.1, 0.1)
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.1, 0.1)
    } else if (meshRef.current) {
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1)
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1)
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1)
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[2, 0.5, 0.2]} />
        <meshPhysicalMaterial
          color={text === "Yes" ? "#ffffff" : "#ffffff"}
          metalness={0.1}
          roughness={0}
          transmission={0.9}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.5}
          envMapIntensity={1}
        />
      </mesh>
      <Text
        position={[0, 0, 0.15]}
        fontSize={0.3}
        color={text === "Yes" ? "#ff69b4" : "#ff1493"}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  )
}

