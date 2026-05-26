'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { useJourneyStore } from '@/store/journeyStore'

export default function AtmosphericLights() {
  const keyRef = useRef()
  const sp = useJourneyStore(s => s.scrollProgress)

  useFrame(({ scene }, delta) => {
    if (keyRef.current) {
      keyRef.current.position.z = -sp * 94 - 5
      keyRef.current.target.position.z = -sp * 94 - 14
      keyRef.current.target.updateMatrixWorld()
    }
    if (scene.fog) {
      scene.fog.near = MathUtils.damp(scene.fog.near, 28, 1.5, delta)
      scene.fog.far  = MathUtils.damp(scene.fog.far,  90, 1.5, delta)
    }
  })

  return (
    <>
      {/* Strong ambient — makes everything visible */}
      <ambientLight color="#2A4060" intensity={2.2} />
      {/* Main key spotlight tracking robot */}
      <spotLight ref={keyRef} color="#FFFFFF" intensity={8} position={[4, 18, 0]}
        angle={0.42} penumbra={0.8} decay={1.0} distance={130}
        castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0003} />
      {/* Warm sunset fill from above-front */}
      <directionalLight color="#FFD6A5" intensity={1.4} position={[0, 14, 15]} />
      {/* Cool sky fill */}
      <directionalLight color="#89B4D9" intensity={1.0} position={[-8, 12, -30]} />
      {/* Hemisphere: sky blue to ground steel */}
      <hemisphereLight color="#3E5F84" groundColor="#1A2D3E" intensity={1.2} />
      {/* Warm accent from front */}
      <pointLight color="#FFD6A5" intensity={1.2} position={[0, 4, 12]} distance={50} decay={1.2} />
      {/* Rim light from behind */}
      <directionalLight color="#89B4D9" intensity={0.5} position={[0, 6, -100]} />
    </>
  )
}
