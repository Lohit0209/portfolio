'use client'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Floor() {
  return (
    <group>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-0.01,-46]} receiveShadow>
        <planeGeometry args={[30,125]} />
        <meshStandardMaterial color="#0D1525" roughness={0.25} metalness={0.45} />
      </mesh>
      {Array.from({length:15},(_,i)=>(
        <mesh key={i} rotation={[-Math.PI/2,0,0]} position={[0,0,-i*9+8]}>
          <planeGeometry args={[26,9]} />
          <meshStandardMaterial color={i%2===0?'#0E1828':'#0C1620'} roughness={0.3} metalness={0.4} />
        </mesh>
      ))}
      {/* Cyan nav path */}
      {[4,-1,-10,-16,-24,-32,-40,-48,-56,-64,-72,-88,-96].map((z,i,a)=>{
        if(i>=a.length-1) return null
        const nz=a[i+1], len=Math.abs(nz-z)
        return (
          <mesh key={z} rotation={[-Math.PI/2,0,0]} position={[0,0.008,(z+nz)/2]}>
            <planeGeometry args={[0.06,len]} />
            <meshStandardMaterial color="#59C3FF" emissive="#59C3FF" emissiveIntensity={0.9} transparent opacity={0.75} />
          </mesh>
        )
      })}
    </group>
  )
}

function Architecture() {
  const cols = useMemo(()=>{const c=[];for(let z=4;z>=-96;z-=14)c.push([-9,5,z],[9,5,z]);return c},[])
  return (
    <group>
      <mesh position={[0,10,-46]}>
        <boxGeometry args={[20,0.3,120]} />
        <meshStandardMaterial color="#0D1A2C" roughness={0.6} metalness={0.35} />
      </mesh>
      {[-4,0,4].map(x=>(
        <mesh key={x} position={[x,9.82,-46]}>
          <boxGeometry args={[0.06,0.04,115]} />
          <meshStandardMaterial emissive="#FFD6A5" emissiveIntensity={0.45} color="#FFF5E0" />
        </mesh>
      ))}
      <mesh position={[0,9.75,-46]}>
        <boxGeometry args={[20,0.04,115]} />
        <meshStandardMaterial color="#59C3FF" emissive="#59C3FF" emissiveIntensity={0.04} transparent opacity={0.08} />
      </mesh>
      {cols.map(([x,y,z],i)=>(
        <group key={i} position={[x,y,z]}>
          <mesh castShadow>
            <boxGeometry args={[0.48,10,0.48]} />
            <meshStandardMaterial color="#0F1E30" roughness={0.45} metalness={0.4} />
          </mesh>
          <mesh position={[x>0?-0.25:0.25,0,0]}>
            <boxGeometry args={[0.008,9,0.008]} />
            <meshStandardMaterial emissive="#59C3FF" emissiveIntensity={0.25} color="#59C3FF" />
          </mesh>
        </group>
      ))}
      <mesh position={[-9.3,5,-46]}><boxGeometry args={[0.18,10,120]} /><meshStandardMaterial color="#0D1828" roughness={0.5} metalness={0.25} /></mesh>
      <mesh position={[9.3,5,-46]}><boxGeometry args={[0.18,10,120]} /><meshStandardMaterial color="#0D1828" roughness={0.5} metalness={0.25} /></mesh>
    </group>
  )
}

function HoloPanel({position,rotation=[0,0,0],w=2.8,h=2}) {
  const ref=useRef()
  useFrame(({clock})=>{if(ref.current)ref.current.material.opacity=0.1+Math.sin(clock.elapsedTime*0.5+position[0])*0.04})
  return (
    <group position={position} rotation={rotation}>
      <mesh ref={ref}>
        <boxGeometry args={[w,h,0.018]} />
        <meshStandardMaterial color="#1B3A5C" emissive="#59C3FF" emissiveIntensity={0.06} transparent opacity={0.1} roughness={0.1} metalness={0.4} />
      </mesh>
      {[[0,h/2,0,[w+0.06,0.02,0.025]],[0,-h/2,0,[w+0.06,0.02,0.025]],[w/2,0,0,[0.02,h+0.06,0.025]],[-w/2,0,0,[0.02,h+0.06,0.025]]].map(([x,y,z,d],i)=>(
        <mesh key={i} position={[x,y,z]}><boxGeometry args={d} /><meshStandardMaterial emissive="#59C3FF" emissiveIntensity={0.7} color="#0A1A2C" /></mesh>
      ))}
      <pointLight position={[0,0,0.6]} color="#59C3FF" intensity={0.5} distance={5} decay={2} />
    </group>
  )
}

function AVFleet() {
  return (
    <group>
      {[[-3.5,-27,0],[0,-31,0.2],[3.5,-29,0]].map(([x,z,r],i)=>(
        <group key={i} position={[x,0.34,z]} rotation={[0,r,0]}>
          <mesh castShadow><boxGeometry args={[1.3,0.4,2.6]} /><meshStandardMaterial color={['#1A2D45','#142238','#1E3350'][i]} roughness={0.12} metalness={0.5} /></mesh>
          <mesh position={[0,0.36,-0.14]} castShadow><boxGeometry args={[1.1,0.34,1.55]} /><meshStandardMaterial color="#0E1E30" roughness={0.05} metalness={0.5} transparent opacity={0.8} /></mesh>
          <mesh position={[0,0.58,0]}><cylinderGeometry args={[0.065,0.065,0.075,10]} /><meshStandardMaterial color="#F0B830" emissive="#FFD6A5" emissiveIntensity={0.35} roughness={0.15} metalness={0.72} /></mesh>
          {[-0.34,0.34].map(lx=>(
            <mesh key={lx} position={[lx,0.06,1.32]}><sphereGeometry args={[0.044,8,6]} /><meshStandardMaterial emissive="#FFFAF0" emissiveIntensity={1.4} color="#fff" /></mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

function Servers() {
  return (
    <group>
      {[-5.5,-3.3,-1.1,1.1,3.3,5.5].map((x,i)=>(
        <group key={i} position={[x,1.5,-51]}>
          <mesh castShadow><boxGeometry args={[0.72,3,0.52]} /><meshStandardMaterial color="#0E1A28" roughness={0.22} metalness={0.45} /></mesh>
          <mesh position={[0,0.48,0.268]}><boxGeometry args={[0.58,1.15,0.01]} /><meshStandardMaterial color="#0A1420" emissive="#59C3FF" emissiveIntensity={0.07} roughness={0.3} metalness={0.25} /></mesh>
          <mesh position={[0.28,1.18,0.268]}><sphereGeometry args={[0.016,6,6]} /><meshStandardMaterial emissive={['#59C3FF','#4DFFA0','#FFD6A5'][i%3]} emissiveIntensity={2} color="#000" /></mesh>
        </group>
      ))}
    </group>
  )
}

function Archives() {
  const refs=useRef([])
  useFrame(({clock})=>refs.current.forEach((r,i)=>{if(r?.material)r.material.emissiveIntensity=0.06+Math.sin(clock.elapsedTime*0.4+i)*0.04}))
  return (
    <group>
      {[[-4,-65],[-2,-61],[2,-63],[4,-62],[-3,-69],[0,-67],[3,-70]].map(([x,z],i)=>(
        <group key={i} position={[x,0,z]}>
          <mesh ref={el=>refs.current[i]=el} castShadow><boxGeometry args={[0.42,3+(i%3)*0.65,0.13]} /><meshStandardMaterial color="#0F1E30" roughness={0.14} metalness={0.52} emissive="#59C3FF" emissiveIntensity={0.06} /></mesh>
          <mesh position={[0,(3+(i%3)*0.65)/2+0.015,0]}><boxGeometry args={[0.42,0.022,0.13]} /><meshStandardMaterial emissive="#59C3FF" emissiveIntensity={1.1} color="#0A1A2C" /></mesh>
        </group>
      ))}
      <mesh position={[0,0.008,-66]} rotation={[-Math.PI/2,0,0]}>
        <ringGeometry args={[5.4,5.55,48]} />
        <meshStandardMaterial emissive="#59C3FF" emissiveIntensity={0.35} color="#0A1A2C" transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

function NeuralNet() {
  const g=useRef()
  const nodes=useMemo(()=>Array.from({length:20},(_,i)=>{const a=(i/20)*Math.PI*2,r=3+(i%3)*1.1;return{x:Math.cos(a)*r,y:1.6+Math.sin(a*2)*1.2,z:-78}}),[])
  useFrame(({clock})=>{if(!g.current)return;nodes.forEach((n,i)=>{const c=g.current.children[i];if(c)c.position.y=n.y+Math.sin(clock.elapsedTime*0.5+i*0.8)*0.09})})
  return (
    <group ref={g}>
      {nodes.map((n,i)=>(
        <group key={i} position={[n.x,n.y,n.z]}>
          <mesh><sphereGeometry args={[0.09,10,8]} /><meshStandardMaterial color="#1A3050" emissive="#59C3FF" emissiveIntensity={0.45} roughness={0.2} metalness={0.45} /></mesh>
        </group>
      ))}
      <mesh position={[0,2,-78]}><sphereGeometry args={[0.26,18,14]} /><meshStandardMaterial color="#1A3A5C" emissive="#59C3FF" emissiveIntensity={0.65} roughness={0.1} metalness={0.5} /></mesh>
      <pointLight position={[0,2,-78]} color="#59C3FF" intensity={2} distance={12} decay={2} />
    </group>
  )
}

function ObsDeck() {
  return (
    <group>
      <mesh position={[0,3.2,-90]} receiveShadow><boxGeometry args={[16,0.28,14]} /><meshStandardMaterial color="#0D1A2C" roughness={0.32} metalness={0.45} /></mesh>
      <mesh position={[0,4.8,-84]}><boxGeometry args={[16,3.2,0.055]} /><meshStandardMaterial color="#1A3A5C" roughness={0.03} metalness={0.12} transparent opacity={0.15} /></mesh>
      {[-6,-3,0,3,6].map(x=><pointLight key={x} position={[x,3.6,-90]} color="#FFD6A5" intensity={0.55} distance={7} decay={2} />)}
      {/* Futuristic city silhouette */}
      {[[-6,2,-98],[-3.5,3.5,-98],[0,2.8,-98],[3.5,4,-98],[6,2.2,-98],[-7.5,1.5,-98],[7.5,1.8,-98]].map(([x,h,z],i)=>(
        <group key={i} position={[x,h/2,z]}>
          <mesh><boxGeometry args={[0.8,h,0.8]} /><meshStandardMaterial color="#0C1828" roughness={0.5} metalness={0.35} /></mesh>
          <mesh position={[0,h/2+0.04,0]}><boxGeometry args={[0.8,0.06,0.8]} /><meshStandardMaterial emissive="#59C3FF" emissiveIntensity={0.4} color="#0A1A2C" /></mesh>
        </group>
      ))}
    </group>
  )
}

function Swarm() {
  const g=useRef()
  useFrame(({clock})=>{if(!g.current)return;g.current.children.forEach((c,i)=>{c.position.y=4+Math.sin(clock.elapsedTime*0.9+i*0.85)*0.22})})
  return (
    <group ref={g}>
      {Array.from({length:8},(_,i)=>{const a=(i/8)*Math.PI*2,r=1.6+(i%2)*1.1;return(
        <group key={i} position={[Math.cos(a)*r,4,-38+Math.sin(a)*r]}>
          <mesh><boxGeometry args={[0.13,0.042,0.13]} /><meshStandardMaterial color="#1A2E45" roughness={0.22} metalness={0.48} /></mesh>
          <mesh position={[0,0.014,0]}><sphereGeometry args={[0.02,6,6]} /><meshStandardMaterial emissive="#59C3FF" emissiveIntensity={2.2} color="#000" /></mesh>
        </group>
      )})}
    </group>
  )
}

export default function LabEnvironment() {
  return (
    <group>
      <Floor /><Architecture />
      <HoloPanel position={[-4,3,-12]} rotation={[0,0.3,0]} />
      <HoloPanel position={[4,2.5,-16]} rotation={[0,-0.25,0]} w={2.2} h={1.6} />
      <HoloPanel position={[-3,3.5,-20]} rotation={[0,0.2,0]} w={3} h={1.8} />
      <AVFleet /><Swarm /><Servers /><Archives /><NeuralNet /><ObsDeck />
    </group>
  )
}
