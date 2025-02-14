"use client"

import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from "three"

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  color: THREE.Color
  life: number
}

export default function Fireworks() {
  const particles = useRef<Particle[]>([])
  const points = useRef<THREE.Points>(null)
  // Reduced total possible particles from 1000 to 500
  const [positions] = useState(() => new Float32Array(500 * 3))
  const [colors] = useState(() => new Float32Array(500 * 3))

  const createExplosion = (origin: THREE.Vector3, particleCount: number, color: THREE.Color) => {
    for (let i = 0; i < particleCount; i++) {
      const angle1 = Math.random() * Math.PI * 2
      const angle2 = Math.random() * Math.PI * 2
      const velocity = new THREE.Vector3(
        Math.sin(angle1) * Math.cos(angle2),
        Math.cos(angle1),
        Math.sin(angle1) * Math.sin(angle2),
        // Reduced velocity for gentler explosions
      ).multiplyScalar(0.05 + Math.random() * 0.05)

      particles.current.push({
        position: origin.clone(),
        velocity,
        // Reduced color intensity
        color: color.clone().multiplyScalar(0.6),
        life: 1.0,
      })
    }
  }

  useFrame((state) => {
    // Reduced spawn rate from 0.1 to 0.05
    if (particles.current.length < 500 && Math.random() < 0.05) {
      const x = (Math.random() - 0.5) * 3 // Reduced spread from 4 to 3
      const y = Math.random() * 2
      const z = (Math.random() - 0.5) * 3 // Reduced spread from 4 to 3
      createExplosion(
        new THREE.Vector3(x, y, z),
        30, // Reduced particles per explosion from 50 to 30
        new THREE.Color().setHSL(Math.random(), 0.8, 0.5), // Reduced saturation and lightness
      )
    }

    let particleIndex = 0
    particles.current = particles.current.filter((particle) => {
      particle.position.add(particle.velocity)
      particle.velocity.y -= 0.001 // gravity
      particle.life -= 0.02 // Increased fade rate slightly

      if (particle.life > 0 && particleIndex < 500) {
        positions[particleIndex * 3] = particle.position.x
        positions[particleIndex * 3 + 1] = particle.position.y
        positions[particleIndex * 3 + 2] = particle.position.z

        colors[particleIndex * 3] = particle.color.r
        colors[particleIndex * 3 + 1] = particle.color.g
        colors[particleIndex * 3 + 2] = particle.color.b

        particleIndex++
        return true
      }
      return false
    })

    if (points.current) {
      points.current.geometry.attributes.position.needsUpdate = true
      points.current.geometry.attributes.color.needsUpdate = true
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={2} // Reduced particle size from 4 to 2
        vertexColors
        transparent
        opacity={0.8} // Added some transparency
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

