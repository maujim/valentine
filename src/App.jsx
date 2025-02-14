import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Heart from './components/heart';
import Button3D from './components/3d-button';
import ShatterButton from './components/shatter-button';
import Fireworks from './components/fireworks';
import { Howl } from 'howler';

const yesSound = new Howl({
  src: ['/fireworks.wav'],
  preload: true,
});

export default function App() {
  const [showFireworks, setShowFireworks] = useState(false);

  const handleYesClick = () => {
    yesSound.play();
    setShowFireworks(true);
    // setTimeout(() => {
    //   alert("Yay! Happy Valentine's Day! ❤️")
    // }, 500)
  };

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to bottom, #1a1a1a, #2a2a2a)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '48px',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 10,
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
          }}
        >
          Will you be my Valentine?
        </h1>
      </div>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#1a1a1a']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff69b4" />

          <Heart />

          <Button3D text="Yes" position={[-1.5, -2, 0]} onClick={handleYesClick} />
          <ShatterButton position={[1.5, -2, 0]} />

          {showFireworks && <Fireworks />}

          <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5} />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </main>
  );
}
