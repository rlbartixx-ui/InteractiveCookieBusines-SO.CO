import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export interface BgCookieProps {
  position: [number, number, number]
  scale: number
  speed: number
  spin: number
}

export function BgCookie({ position, scale, speed, spin }: BgCookieProps) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.z += delta * spin
    mesh.current.rotation.x += delta * spin * 0.3
  })

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.9} position={position}>
      <mesh ref={mesh} scale={scale}>
        <cylinderGeometry args={[1, 0.95, 0.25, 40, 1]} />
        <meshStandardMaterial color="#C49050" roughness={0.92} metalness={0.0} />
      </mesh>
    </Float>
  )
}

export const DEFAULT_BG_COOKIES: BgCookieProps[] = [
  { position: [-3.8, 3.0, -6], scale: 0.35, speed: 1.1, spin: 0.18 },
  { position: [4.8, 2.2, -5], scale: 0.44, speed: 0.9, spin: 0.12 },
  { position: [3.8, -2.4, -5], scale: 0.36, speed: 1.0, spin: 0.14 },
  { position: [0.8, 3.6, -7], scale: 0.30, speed: 0.8, spin: 0.10 },
  { position: [-1.2, -3.8, -7], scale: 0.42, speed: 1.2, spin: 0.09 },
  { position: [5.2, 0.4, -6], scale: 0.26, speed: 1.5, spin: 0.24 },
  { position: [2.2, 3.2, -5], scale: 0.20, speed: 1.6, spin: 0.20 },
]
