'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, CatmullRomCurve3, Vector3 } from 'three'
import { useJourneyStore, ROBOT_STATES } from '@/store/journeyStore'

const WAYPOINTS = [
  new Vector3(0,0,2), new Vector3(0,0,-1), new Vector3(-1.5,0,-10),
  new Vector3(-2,0,-16), new Vector3(0,0,-24), new Vector3(1.5,0,-32),
  new Vector3(0,0,-40), new Vector3(3,0,-48), new Vector3(0,0,-56),
  new Vector3(-1,0,-64), new Vector3(0,0.5,-72), new Vector3(0,1,-78),
  new Vector3(0,1.8,-88), new Vector3(0,2.2,-94),
]
export const robotCurve = new CatmullRomCurve3(WAYPOINTS, false, 'catmullrom', 0.4)
const _p = new Vector3(), _n = new Vector3()

// ─── BIG EXPRESSIVE EYES ────────────────────────────────────────────────────
function Eyes({ state }) {
  const intensity = state === ROBOT_STATES.STANDBY ? 0.12 : state === ROBOT_STATES.SCANNING ? 1.2 : 0.5
  return (
    <>
      {[-0.13, 0.13].map((sx, i) => (
        <group key={i} position={[sx, 0.02, 0.265]}>
          {/* Socket */}
          <mesh>
            <sphereGeometry args={[0.105, 20, 16]} />
            <meshStandardMaterial color="#060810" roughness={0.05} metalness={0.1} />
          </mesh>
          {/* Iris */}
          <mesh position={[0, 0, 0.048]}>
            <sphereGeometry args={[0.068, 16, 12]} />
            <meshStandardMaterial color="#061525" emissive="#59C3FF" emissiveIntensity={intensity} roughness={0.1} metalness={0.2} />
          </mesh>
          {/* Pupil */}
          <mesh position={[sx > 0 ? -0.014 : 0.014, -0.008, 0.098]}>
            <sphereGeometry args={[0.032, 10, 8]} />
            <meshStandardMaterial color="#010204" roughness={0} metalness={0} />
          </mesh>
          {/* Bright catch light */}
          <mesh position={[sx > 0 ? -0.022 : 0.022, 0.026, 0.112]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1.5} />
          </mesh>
          {/* Secondary catch light */}
          <mesh position={[sx > 0 ? 0.016 : -0.016, -0.016, 0.108]}>
            <sphereGeometry args={[0.006, 6, 6]} />
            <meshStandardMaterial color="#E8F4FF" emissive="#E8F4FF" emissiveIntensity={0.7} />
          </mesh>
          {/* Subtle eyelid shadow */}
          <mesh position={[0, 0.085, 0.052]} rotation={[0.32, 0, 0]}>
            <sphereGeometry args={[0.09, 12, 8, 0, Math.PI*2, 0, 0.48]} />
            <meshStandardMaterial color="#0A0C12" roughness={0.4} transparent opacity={0.38} />
          </mesh>
        </group>
      ))}
    </>
  )
}

// ─── HEAD ────────────────────────────────────────────────────────────────────
function Head({ headRef, state }) {
  return (
    <group ref={headRef} position={[0, 0.66, 0]}>
      {/* Main dome — white glossy */}
      <mesh castShadow>
        <sphereGeometry args={[0.36, 30, 22]} />
        <meshStandardMaterial color="#F0F4F8" roughness={0.1} metalness={0.18} />
      </mesh>
      {/* Blue helmet band */}
      <mesh position={[0, -0.05, 0]} rotation={[0.16, 0, 0]}>
        <sphereGeometry args={[0.338, 26, 18, 0, Math.PI*2, 0.28, 0.72]} />
        <meshStandardMaterial color="#1B3A5C" roughness={0.14} metalness={0.45} />
      </mesh>
      {/* Face recess */}
      <mesh position={[0, -0.02, 0.21]}>
        <sphereGeometry args={[0.27, 20, 14, 0, Math.PI*2, 0.26, 0.66]} />
        <meshStandardMaterial color="#090E18" roughness={0.22} metalness={0.3} />
      </mesh>

      <Eyes state={state} />

      {/* Smile */}
      <mesh position={[0, -0.145, 0.278]}>
        <torusGeometry args={[0.038, 0.006, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#59C3FF" emissive="#59C3FF" emissiveIntensity={0.35} roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Cheek warm pods — gold like reference */}
      {[-1,1].map(s => (
        <group key={s} position={[s*0.275, -0.105, 0.18]}>
          <mesh>
            <sphereGeometry args={[0.046, 12, 10]} />
            <meshStandardMaterial color="#F5C050" roughness={0.18} metalness={0.65} emissive="#FFD6A5" emissiveIntensity={0.22} />
          </mesh>
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.038, 0.003, 6, 14]} />
            <meshStandardMaterial color="#C48820" roughness={0.25} metalness={0.75} />
          </mesh>
        </group>
      ))}

      {/* Forehead accent bar */}
      <mesh position={[0, 0.22, 0.23]}>
        <boxGeometry args={[0.2, 0.016, 0.012]} />
        <meshStandardMaterial emissive="#59C3FF" emissiveIntensity={1} color="#0A1520" />
      </mesh>

      {/* Ear pods — gold */}
      {[-1,1].map(s => (
        <group key={s} position={[s*0.325, 0.13, -0.07]} rotation={[0, 0, s*-0.32]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.058, 0.068, 0.095, 12]} />
            <meshStandardMaterial color="#F0B830" roughness={0.15} metalness={0.78} />
          </mesh>
          <mesh position={[0, 0.042, 0]}>
            <cylinderGeometry args={[0.048, 0.054, 0.038, 10]} />
            <meshStandardMaterial color="#C48820" roughness={0.22} metalness={0.8} />
          </mesh>
          <mesh position={[s*0.045, 0, 0]}>
            <sphereGeometry args={[0.011, 6, 6]} />
            <meshStandardMaterial color="#59C3FF" emissive="#59C3FF" emissiveIntensity={0.9} />
          </mesh>
        </group>
      ))}

      {/* Top hub + antenna */}
      <mesh position={[0.025, 0.37, 0.025]}>
        <cylinderGeometry args={[0.032, 0.038, 0.038, 10]} />
        <meshStandardMaterial color="#F0B830" roughness={0.18} metalness={0.72} />
      </mesh>
      <group position={[0.025, 0.38, 0.025]}>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.25, 6]} />
          <meshStandardMaterial color="#8AAFD6" roughness={0.25} metalness={0.82} />
        </mesh>
        <mesh position={[0, 0.27, 0]} rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[0.022, 0.004, 6, 16]} />
          <meshStandardMaterial emissive="#59C3FF" emissiveIntensity={1.2} color="#0A1520" />
        </mesh>
        <mesh position={[0, 0.27, 0]}>
          <sphereGeometry args={[0.009, 6, 6]} />
          <meshStandardMaterial emissive="#59C3FF" emissiveIntensity={2} color="#000" />
        </mesh>
      </group>
    </group>
  )
}

// ─── BODY ─────────────────────────────────────────────────────────────────
function Body({ state }) {
  const ledIntensity = state === ROBOT_STATES.CONNECTING ? 1.2 : state === ROBOT_STATES.DOCKING ? 0.8 : 0.4
  return (
    <group position={[0, 0.25, 0]}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.29, 24, 18, 0, Math.PI*2, 0, Math.PI*0.72]} />
        <meshStandardMaterial color="#E8EDF3" roughness={0.1} metalness={0.22} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.268, 0.228, 0.13, 18]} />
        <meshStandardMaterial color="#C8D4E0" roughness={0.18} metalness={0.28} />
      </mesh>
      {/* Chest panel */}
      <mesh position={[0, 0.09, 0.24]}>
        <boxGeometry args={[0.18, 0.12, 0.022]} />
        <meshStandardMaterial color="#0D1A2A" roughness={0.3} metalness={0.55} />
      </mesh>
      {/* Chest LED */}
      <mesh position={[0, 0.09, 0.255]}>
        <boxGeometry args={[0.075, 0.016, 0.004]} />
        <meshStandardMaterial emissive="#59C3FF" emissiveIntensity={ledIntensity} color="#000" />
      </mesh>
      {[-1,1].map(s => (
        <mesh key={s} position={[s*0.232, 0.06, 0.1]}>
          <boxGeometry args={[0.016, 0.14, 0.075]} />
          <meshStandardMaterial color="#59C3FF" emissive="#59C3FF" emissiveIntensity={0.18} roughness={0.25} metalness={0.45} transparent opacity={0.45} />
        </mesh>
      ))}
    </group>
  )
}

// ─── ARMS ─────────────────────────────────────────────────────────────────
function Arms({ state }) {
  const lRef = useRef(), rRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const swing = state === ROBOT_STATES.NAVIGATING ? Math.sin(t*2.4)*0.18 : 0
    if (lRef.current) lRef.current.rotation.x =  swing
    if (rRef.current) rRef.current.rotation.x = -swing
  })
  return (
    <>
      {[-1,1].map((s,i) => (
        <group key={i} ref={i===0?lRef:rRef} position={[s*0.335, 0.31, 0]}>
          <mesh castShadow rotation={[0, 0, s*0.52]}>
            <capsuleGeometry args={[0.042, 0.155, 8, 10]} />
            <meshStandardMaterial color="#C0CCDA" roughness={0.22} metalness={0.38} />
          </mesh>
          <mesh position={[s*0.08, -0.135, 0]}>
            <sphereGeometry args={[0.055, 10, 8]} />
            <meshStandardMaterial color="#E8EDF3" roughness={0.14} metalness={0.22} />
          </mesh>
          {/* Gold shoulder joint */}
          <mesh>
            <sphereGeometry args={[0.05, 10, 8]} />
            <meshStandardMaterial color="#F0B830" roughness={0.16} metalness={0.76} />
          </mesh>
        </group>
      ))}
    </>
  )
}

// ─── WHEEL SYSTEM ─────────────────────────────────────────────────────────
function Wheels({ state }) {
  const refs = useRef([])
  useFrame((_, delta) => {
    const spd = state === ROBOT_STATES.NAVIGATING ? 3.8 : 0
    refs.current.forEach(w => { if (w) w.rotation.x += delta * spd })
  })
  const pos = [[-0.21,0,0.13],[0.21,0,0.13],[-0.21,0,-0.1],[0.21,0,-0.1]]
  return (
    <group>
      <mesh position={[0,-0.025,0]}>
        <boxGeometry args={[0.54,0.055,0.27]} />
        <meshStandardMaterial color="#A8B8C8" roughness={0.32} metalness={0.55} />
      </mesh>
      {pos.map(([x,y,z],i) => (
        <group key={i} position={[x,y,z]}>
          <mesh ref={el=>refs.current[i]=el} rotation={[0,0,Math.PI/2]}>
            <cylinderGeometry args={[0.072,0.072,0.052,14]} />
            <meshStandardMaterial color="#1B3050" roughness={0.4} metalness={0.62} />
          </mesh>
          <mesh rotation={[0,0,Math.PI/2]} position={[x>0?0.028:-0.028,0,0]}>
            <cylinderGeometry args={[0.025,0.025,0.005,8]} />
            <meshStandardMaterial color="#F0B830" roughness={0.14} metalness={0.82} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// ─── MAIN ROBOT ────────────────────────────────────────────────────────────
export default function Robot() {
  const groupRef = useRef()
  const headRef  = useRef()
  const smooth   = useRef(0)
  const bob      = useRef(0)
  const scan     = useRef(0)

  const sp     = useJourneyStore(s => s.scrollProgress)
  const state  = useJourneyStore(s => s.robotState)
  const booted = useJourneyStore(s => s.bootComplete)
  const cursor = useJourneyStore(s => s.cursorNDC)

  useFrame((_, delta) => {
    if (!groupRef.current || !booted) return

    smooth.current = MathUtils.damp(smooth.current, sp, state === ROBOT_STATES.NAVIGATING ? 1.8 : 3.5, delta)
    const t = MathUtils.clamp(smooth.current, 0, 0.9999)
    robotCurve.getPoint(t, _p)
    groupRef.current.position.lerp(_p, 0.05)

    robotCurve.getPoint(Math.min(t+0.006, 0.9999), _n)
    const dx = _n.x-_p.x, dz = _n.z-_p.z
    if (Math.abs(dx+dz) > 0.001)
      groupRef.current.rotation.y = MathUtils.damp(groupRef.current.rotation.y, Math.atan2(dx,dz), 2.5, delta)

    bob.current += delta * (state === ROBOT_STATES.NAVIGATING ? 2.0 : 0.65)
    const hover = state === ROBOT_STATES.STANDBY ? 0.2 : state === ROBOT_STATES.CONNECTING ? 0.55 : 0.3
    groupRef.current.position.y = _p.y + hover + Math.sin(bob.current) * (state === ROBOT_STATES.NAVIGATING ? 0.022 : 0.008)
    groupRef.current.scale.setScalar(1.65)
    groupRef.current.rotation.x = MathUtils.damp(groupRef.current.rotation.x, state === ROBOT_STATES.NAVIGATING ? -0.09 : 0, 2.5, delta)

    if (headRef.current) {
      if (state === ROBOT_STATES.SCANNING) {
        scan.current += delta * 1.1
        headRef.current.rotation.y = Math.sin(scan.current) * 0.55
        headRef.current.rotation.x = Math.sin(scan.current*0.6) * 0.12
      } else if (state === ROBOT_STATES.DOCKING || state === ROBOT_STATES.RETRIEVING) {
        headRef.current.rotation.y = MathUtils.damp(headRef.current.rotation.y, 0, 2.5, delta)
        headRef.current.rotation.x = MathUtils.damp(headRef.current.rotation.x, 0.18, 2.5, delta)
      } else if (state === ROBOT_STATES.STANDBY) {
        headRef.current.rotation.x = MathUtils.damp(headRef.current.rotation.x, 0.22, 1.2, delta)
        headRef.current.rotation.y = MathUtils.damp(headRef.current.rotation.y, 0, 1.2, delta)
      } else if (state === ROBOT_STATES.CONNECTING) {
        scan.current += delta * 0.55
        headRef.current.rotation.y = Math.sin(scan.current*0.8) * 0.32
        headRef.current.rotation.x = MathUtils.damp(headRef.current.rotation.x, -0.2, 2, delta)
      } else {
        headRef.current.rotation.y = MathUtils.damp(headRef.current.rotation.y, cursor.x*0.38, 3.5, delta)
        headRef.current.rotation.x = MathUtils.damp(headRef.current.rotation.x, -cursor.y*0.16, 3.5, delta)
      }
    }
  })

  if (!booted) return null
  return (
    <group ref={groupRef}>
      <Head headRef={headRef} state={state} />
      <Body state={state} />
      <Arms state={state} />
      <Wheels state={state} />
      <pointLight position={[0,0.55,0.45]} color="#E8F4FF" intensity={0.9} distance={3} decay={2} />
      <pointLight position={[0,-0.1,0]} color="#59C3FF" intensity={0.35} distance={2.5} decay={2} />
    </group>
  )
}
