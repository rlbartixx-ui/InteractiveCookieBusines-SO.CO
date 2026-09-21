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
  { position: [-5.8, 2.6, -5], scale: 0.40, speed: 1.1, spin: 0.18 },
  { position: [6.0, 1.6, -6], scale: 0.52, speed: 0.9, spin: 0.12 },
  { position: [-5.0, -2.6, -4], scale: 0.30, speed: 1.4, spin: 0.22 },
  { position: [4.8, -2.4, -5], scale: 0.45, speed: 1.0, spin: 0.14 },
  { position: [0.4, 4.0, -7], scale: 0.36, speed: 0.8, spin: 0.10 },
  { position: [-2.2, -3.8, -6], scale: 0.58, speed: 1.2, spin: 0.09 },
  { position: [7.2, 0.2, -7], scale: 0.26, speed: 1.5, spin: 0.24 },
  { position: [-7.4, -0.6, -6], scale: 0.33, speed: 1.0, spin: 0.13 },
  { position: [3.0, 3.4, -5], scale: 0.22, speed: 1.6, spin: 0.20 },
]
