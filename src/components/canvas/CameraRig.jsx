'use client'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MathUtils, CatmullRomCurve3, Vector3 } from 'three'
import { useJourneyStore, SECTIONS } from '@/store/journeyStore'

const CAM_POINTS = [
  new Vector3(0,3.5,16), new Vector3(-1.5,2.8,10), new Vector3(0,2.2,4),
  new Vector3(-5,4,-4), new Vector3(0,3.5,-14), new Vector3(3.5,4.5,-24),
  new Vector3(0,3.8,-34), new Vector3(7,3.2,-44), new Vector3(0,3.5,-54),
  new Vector3(-6,4,-64), new Vector3(0,5.5,-74), new Vector3(0,9,-86),
  new Vector3(0,13,-94),
]
const LOOK_POINTS = [
  new Vector3(0,1,4), new Vector3(0,0.8,2), new Vector3(0,0.6,-1),
  new Vector3(-3.5,1.5,-10), new Vector3(0,1,-20), new Vector3(2,2,-30),
  new Vector3(0,1.5,-42), new Vector3(3.5,1,-50), new Vector3(0,1.5,-60),
  new Vector3(-3.5,2,-70), new Vector3(0,2,-80), new Vector3(0,3.5,-90),
  new Vector3(0,5,-100),
]

const camCurve  = new CatmullRomCurve3(CAM_POINTS, false, 'catmullrom', 0.5)
const lookCurve = new CatmullRomCurve3(LOOK_POINTS, false, 'catmullrom', 0.5)
const _c = new Vector3(), _l = new Vector3(), _look = new Vector3()

export default function CameraRig() {
  const { camera } = useThree()
  const sp   = useJourneyStore(s => s.scrollProgress)
  const boot = useJourneyStore(s => s.bootComplete)
  const smoothT = useRef(0)

  useFrame((_, delta) => {
    if (!boot) return
    smoothT.current = MathUtils.damp(smoothT.current, sp, 1.0, delta)
    const t = MathUtils.clamp(smoothT.current, 0, 0.9999)
    camCurve.getPoint(t, _c)
    camera.position.lerp(_c, 0.045)
    lookCurve.getPoint(t, _l)
    _look.lerp(_l, 0.045)
    camera.lookAt(_look)
    camera.fov = MathUtils.damp(camera.fov, 52, 1.2, delta)
    camera.updateProjectionMatrix()
  })
  return null
}
