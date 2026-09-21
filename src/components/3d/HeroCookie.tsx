import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Chip data: [x, z, radius, height] ─── */
const CHIPS: [number, number, number, number][] = [
  [0.18, 0.22, 0.075, 0.048],
  [-0.24, 0.10, 0.065, 0.042],
  [0.05, -0.28, 0.072, 0.045],
  [-0.10, 0.38, 0.058, 0.038],
  [0.36, -0.12, 0.068, 0.044],
  [-0.38, -0.20, 0.062, 0.040],
  [0.14, 0.52, 0.055, 0.036],
  [-0.42, 0.18, 0.070, 0.046],
  [0.44, 0.28, 0.060, 0.039],
  [0.00, -0.46, 0.074, 0.048],
  [-0.20, -0.42, 0.058, 0.038],
  [0.28, -0.36, 0.066, 0.043],
  [0.52, 0.04, 0.052, 0.034],
  [-0.16, 0.58, 0.063, 0.041],
  [0.32, 0.44, 0.057, 0.037],
]

/* ─── Small sesame-like dots ─── */
const DOTS: [number, number][] = [
  [0.55, 0.32], [-0.50, 0.44], [0.44, -0.46],
  [-0.34, -0.54], [0.12, 0.64], [0.62, -0.18],
  [-0.60, -0.08], [0.22, -0.60], [-0.46, 0.56],
]

interface HeroCookieProps {
  mouse: React.MutableRefObject<[number, number]>
}

export function HeroCookie({ mouse }: HeroCookieProps) {
  const group = useRef<THREE.Group>(null)
  const topRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!group.current) return
    const [mx, my] = mouse.current
    // Tilt toward mouse, continuous spin on Z
    group.current.rotation.y += (mx * 0.55 - group.current.rotation.y) * 0.055
    group.current.rotation.x += (-my * 0.30 - group.current.rotation.x) * 0.055
    group.current.rotation.z += delta * 0.10
  })

  return (
    <group ref={group}>
      {/* Bottom rim — slightly darker, crumbly edge */}
      <mesh>
        <cylinderGeometry args={[0.98, 0.94, 0.28, 72, 1]} />
        <meshStandardMaterial color="#A8703F" roughness={0.94} metalness={0.0} />
      </mesh>

      {/* Inner body — slightly lighter crumb interior */}
      <mesh>
        <cylinderGeometry args={[0.88, 0.88, 0.26, 72, 1]} />
        <meshStandardMaterial color="#C8894F" roughness={0.90} metalness={0.0} />
      </mesh>

      {/* Top baked surface — warm golden with wobble texture */}
      <mesh ref={topRef} position={[0, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.92, 72]} />
        <MeshWobbleMaterial
          color="#D4A05A"
          roughness={0.88}
          metalness={0.02}
          factor={0.04}
          speed={0.8}
        />
      </mesh>

      {/* Center slightly darker */}
      <mesh position={[0, 0.145, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.45, 48]} />
        <MeshDistortMaterial
          color="#C49048"
          roughness={0.92}
          metalness={0.0}
          distort={0.05}
          speed={0.6}
        />
      </mesh>

      {/* Crinkle ring lines */}
      {[0.70, 0.82].map((r, i) => (
        <mesh key={i} position={[0, 0.142, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.012, r, 60]} />
          <meshStandardMaterial
            color="#B87840"
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Chocolate chips */}
      {CHIPS.map(([x, z, radius, h], i) => (
        <group key={i} position={[x, 0.14, z]}>
          <mesh>
            <sphereGeometry args={[radius, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
            <meshStandardMaterial color="#2A1508" roughness={0.65} metalness={0.12} />
          </mesh>
          <mesh position={[0, -h * 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[radius * 0.85, 12]} />
            <meshStandardMaterial color="#1E0F04" roughness={0.7} metalness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Sesame / oat fleck dots */}
      {DOTS.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.148, z]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial color="#C8A868" roughness={0.96} metalness={0.0} />
        </mesh>
      ))}

      {/* Subtle underside shadow disc */}
      <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.15, 48]} />
        <meshStandardMaterial
          color="#2C1A0E"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
