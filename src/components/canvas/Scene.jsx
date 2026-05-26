'use client'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import CameraRig from './CameraRig'
import Robot from './Robot'
import LabEnvironment from './LabEnvironment'
import AtmosphericLights from './AtmosphericLights'

export default function Scene() {
  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', stencil: false }}
      camera={{ fov: 52, near: 0.1, far: 250, position: [0, 3.5, 16] }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
    >
      {/* Lighter fog — #16263D so environment is visible */}
      <fog attach="fog" args={['#16263D', 28, 90]} />
      <color attach="background" args={['#0E1A2B']} />
      <AtmosphericLights />
      <Suspense fallback={null}>
        <LabEnvironment />
        <Robot />
      </Suspense>
      <CameraRig />
    </Canvas>
  )
}
