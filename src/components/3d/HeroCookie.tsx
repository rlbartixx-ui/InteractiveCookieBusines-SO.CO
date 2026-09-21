import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'
import type { Cookie3DVisuals } from '../../types'

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

/* ─── Fleck dots (salt / sesame / crumbs) ─── */
const DOTS: [number, number][] = [
  [0.55, 0.32], [-0.50, 0.44], [0.44, -0.46],
  [-0.34, -0.54], [0.12, 0.64], [0.62, -0.18],
  [-0.60, -0.08], [0.22, -0.60], [-0.46, 0.56],
  [0.08, -0.15], [-0.12, -0.10], [0.25, 0.12],
]

interface HeroCookieProps {
  mouse: React.MutableRefObject<[number, number]>
  visuals: Cookie3DVisuals
  isInspectMode?: boolean
}

export function HeroCookie({ mouse, visuals, isInspectMode = false }: HeroCookieProps) {
  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!group.current) return
    if (isInspectMode) {
      // Gentle slow float rotation in inspect mode
      group.current.rotation.z += delta * 0.05
    } else {
      const [mx, my] = mouse.current
      // Tilt toward mouse, continuous spin on Z
      group.current.rotation.y += (mx * 0.55 - group.current.rotation.y) * 0.055
      group.current.rotation.x += (-my * 0.30 - group.current.rotation.x) * 0.055
      group.current.rotation.z += delta * 0.10
    }
  })

  return (
    <group ref={group}>
      {/* Bottom rim — slightly darker, crumbly edge */}
      <mesh>
        <cylinderGeometry args={[0.98, 0.94, 0.28, 72, 1]} />
        <meshStandardMaterial
          color={visuals.crustColor}
          roughness={Math.min(visuals.roughness + 0.06, 1)}
          metalness={0.0}
        />
      </mesh>

      {/* Inner body — crumb interior */}
      <mesh>
        <cylinderGeometry args={[0.88, 0.88, 0.26, 72, 1]} />
        <meshStandardMaterial
          color={visuals.innerColor}
          roughness={visuals.roughness}
          metalness={0.0}
        />
      </mesh>

      {/* Top baked surface with wobble texture */}
      <mesh position={[0, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.92, 72]} />
        <MeshWobbleMaterial
          color={visuals.topColor}
          roughness={visuals.roughness}
          metalness={0.02}
          factor={visuals.wobbleFactor}
          speed={visuals.speed}
        />
      </mesh>

      {/* Center baked variation */}
      <mesh position={[0, 0.145, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.45, 48]} />
        <MeshDistortMaterial
          color={visuals.centerColor}
          roughness={visuals.roughness + 0.02}
          metalness={0.0}
          distort={0.05}
          speed={visuals.speed * 0.8}
        />
      </mesh>

      {/* Crinkle ring lines */}
      {[0.70, 0.82].map((r, i) => (
        <mesh key={i} position={[0, 0.142, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.012, r, 60]} />
          <meshStandardMaterial
            color={visuals.ringColor}
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Chocolate / cream chips */}
      {CHIPS.map(([x, z, radius, h], i) => (
        <group key={i} position={[x, 0.14, z]}>
          <mesh>
            <sphereGeometry args={[radius, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
            <meshStandardMaterial
              color={visuals.chipColor}
              roughness={0.65}
              metalness={0.12}
            />
          </mesh>
          <mesh position={[0, -h * 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[radius * 0.85, 12]} />
            <meshStandardMaterial
              color={visuals.chipBaseColor}
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Accent fleck dots (salt / sesame / powdered sugar) */}
      {DOTS.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.148, z]}>
          <sphereGeometry args={[0.024, 6, 6]} />
          <meshStandardMaterial
            color={visuals.accentDotColor}
            roughness={0.96}
            metalness={0.0}
          />
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
