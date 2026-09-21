import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { HeroCookie } from './HeroCookie'
import { BgCookie, DEFAULT_BG_COOKIES } from './BgCookie'
import { SceneLights } from './SceneLights'
import type { Cookie3DVisuals } from '../../types'

export interface CookieSceneProps {
  mouse: React.MutableRefObject<[number, number]>
  visuals: Cookie3DVisuals
  isInspectMode?: boolean
}

export function CookieScene({ mouse, visuals, isInspectMode = false }: CookieSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 4.2], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneLights />
      <HeroCookie mouse={mouse} visuals={visuals} isInspectMode={isInspectMode} />
      {!isInspectMode &&
        DEFAULT_BG_COOKIES.map((props, i) => (
          <BgCookie key={i} {...props} />
        ))}
      {isInspectMode && (
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.4}
          maxDistance={5.8}
          autoRotate={false}
        />
      )}
    </Canvas>
  )
}

export default CookieScene
