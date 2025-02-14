"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import Heart from "./heart"
import Button3D from "./3d-button"
import ShatterButton from "./shatter-button"
import Fireworks from "./fireworks"
import { Howl } from "howler"

// Preload success sound
const yesSound = new Howl({
  src: ["https://assets.codepen.io/28963/success.mp3"], // Using a reliable hosted sound
  preload: true,
})

export default function Page() {
  const [showFireworks, setShowFireworks] = useState(false)

  const handleYesClick = () => {
    yesSound.play()
    setShowFireworks(true)
    setTimeout(() => {
      alert("Yay! Happy Valentine's Day! ❤️")
    }, 500)
  }

  return (
    <main className="relative h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="absolute left-1/2 top-12 -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl font-bold text-rose-100 mb-4">Will you be my Valentine?</h1>
      </div>
      <div className="h-full w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <color attach="background" args={["#1a1a1a"]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff69b4" />

            <Heart />

            {/* 3D Buttons */}
            <Button3D text="Yes" position={[-1.5, -2, 0]} onClick={handleYesClick} />
            <ShatterButton position={[1.5, -2, 0]} />

            {showFireworks && <Fireworks />}

            <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5} />
            <Environment preset="warehouse" />
          </Suspense>
        </Canvas>
      </div>
    </main>
  )
}

