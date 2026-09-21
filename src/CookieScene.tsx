import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Chip data: [x, z, radius, height] ─── */
const CHIPS: [number, number, number, number][] = [
  [ 0.18,  0.22, 0.075, 0.048],
  [-0.24,  0.10, 0.065, 0.042],
  [ 0.05, -0.28, 0.072, 0.045],
  [-0.10,  0.38, 0.058, 0.038],
  [ 0.36, -0.12, 0.068, 0.044],
  [-0.38, -0.20, 0.062, 0.040],
  [ 0.14,  0.52, 0.055, 0.036],
  [-0.42,  0.18, 0.070, 0.046],
  [ 0.44,  0.28, 0.060, 0.039],
  [ 0.00, -0.46, 0.074, 0.048],
  [-0.20, -0.42, 0.058, 0.038],
  [ 0.28, -0.36, 0.066, 0.043],
  [ 0.52,  0.04, 0.052, 0.034],
  [-0.16,  0.58, 0.063, 0.041],
  [ 0.32,  0.44, 0.057, 0.037],
]

/* ─── Small sesame-like dots ─── */
const DOTS: [number, number][] = [
  [0.55, 0.32], [-0.50, 0.44], [0.44, -0.46],
  [-0.34, -0.54], [0.12, 0.64], [0.62, -0.18],
  [-0.60, -0.08], [0.22, -0.60], [-0.46, 0.56],
]

/* ─── Hero cookie — mouse-tilting, auto-spinning ─── */
function HeroCookie({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const group  = useRef<THREE.Group>(null)
  const topRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!group.current) return
    const [mx, my] = mouse.current
    // Tilt toward mouse, continuous spin on Z
    group.current.rotation.y  += (mx * 0.55  - group.current.rotation.y)  * 0.055
    group.current.rotation.x  += (-my * 0.30 - group.current.rotation.x)  * 0.055
    group.current.rotation.z  += delta * 0.10
  })

  return (
    <group ref={group}>
      {/* ── Bottom rim — slightly darker, crumbly edge ── */}
      <mesh>
        <cylinderGeometry args={[0.98, 0.94, 0.28, 72, 1]} />
        <meshStandardMaterial color="#A8703F" roughness={0.94} metalness={0.0} />
      </mesh>

      {/* ── Inner body — slightly lighter crumb interior ── */}
      <mesh>
        <cylinderGeometry args={[0.88, 0.88, 0.26, 72, 1]} />
        <meshStandardMaterial color="#C8894F" roughness={0.90} metalness={0.0} />
      </mesh>

      {/* ── Top baked surface — warm golden with wobble texture ── */}
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

      {/* ── Center slightly darker ── */}
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

      {/* ── Crinkle ring lines ── */}
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

      {/* ── Chocolate chips ── */}
      {CHIPS.map(([x, z, radius, h], i) => (
        <group key={i} position={[x, 0.14, z]}>
          {/* Chip body — dome-shaped capsule approximation */}
          <mesh>
            <sphereGeometry args={[radius, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
            <meshStandardMaterial color="#2A1508" roughness={0.65} metalness={0.12} />
          </mesh>
          {/* Chip base disc */}
          <mesh position={[0, -h * 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[radius * 0.85, 12]} />
            <meshStandardMaterial color="#1E0F04" roughness={0.7} metalness={0.1} />
          </mesh>
        </group>
      ))}

      {/* ── Sesame / oat fleck dots ── */}
      {DOTS.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.148, z]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial color="#C8A868" roughness={0.96} metalness={0.0} />
        </mesh>
      ))}

      {/* ── Subtle underside shadow disc ── */}
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

/* ─── Floating background cookie ─── */
type BgCookieProps = {
  position: [number, number, number]
  scale: number
  speed: number
  spin: number
}

function BgCookie({ position, scale, speed, spin }: BgCookieProps) {
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

const BG_COOKIES: BgCookieProps[] = [
  { position: [-5.8,  2.6, -5], scale: 0.40, speed: 1.1, spin: 0.18 },
  { position: [ 6.0,  1.6, -6], scale: 0.52, speed: 0.9, spin: 0.12 },
  { position: [-5.0, -2.6, -4], scale: 0.30, speed: 1.4, spin: 0.22 },
  { position: [ 4.8, -2.4, -5], scale: 0.45, speed: 1.0, spin: 0.14 },
  { position: [ 0.4,  4.0, -7], scale: 0.36, speed: 0.8, spin: 0.10 },
  { position: [-2.2, -3.8, -6], scale: 0.58, speed: 1.2, spin: 0.09 },
  { position: [ 7.2,  0.2, -7], scale: 0.26, speed: 1.5, spin: 0.24 },
  { position: [-7.4, -0.6, -6], scale: 0.33, speed: 1.0, spin: 0.13 },
  { position: [ 3.0,  3.4, -5], scale: 0.22, speed: 1.6, spin: 0.20 },
]

/* ─── Scene lighting ─── */
function Lights() {
  return (
    <>
      <ambientLight intensity={1.0} color="#FFF4E8" />
      {/* Warm key — upper left */}
      <directionalLight position={[-3, 5, 4]}  intensity={2.4} color="#FFE4B5" />
      {/* Cool fill — lower right */}
      <directionalLight position={[ 4, -2, 2]}  intensity={0.7} color="#EFE9E3" />
      {/* Rim from behind */}
      <directionalLight position={[ 0, 1, -4]}  intensity={0.5} color="#D9CFC7" />
      {/* Warm point under the cookie for glow */}
      <pointLight position={[0, -1.5, 2]} intensity={0.6} color="#C9B59C" distance={5} />
      {/* Soft top fill */}
      <pointLight position={[0,  3.0, 2]} intensity={0.5} color="#FFF8EE" distance={6} />
    </>
  )
}

/* ─── Exported canvas ─── */
export default function CookieScene({
  mouse,
}: {
  mouse: React.MutableRefObject<[number, number]>
}) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 4.2], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Lights />
      <HeroCookie mouse={mouse} />
      {BG_COOKIES.map((props, i) => (
        <BgCookie key={i} {...props} />
      ))}
    </Canvas>
  )
}
