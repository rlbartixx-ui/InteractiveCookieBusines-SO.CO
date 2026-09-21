import { Canvas } from '@react-three/fiber'
import { HeroCookie } from './HeroCookie'
import { BgCookie, DEFAULT_BG_COOKIES } from './BgCookie'
import { SceneLights } from './SceneLights'

export interface CookieSceneProps {
  mouse: React.MutableRefObject<[number, number]>
}

export function CookieScene({ mouse }: CookieSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 4.2], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneLights />
      <HeroCookie mouse={mouse} />
      {DEFAULT_BG_COOKIES.map((props, i) => (
        <BgCookie key={i} {...props} />
      ))}
    </Canvas>
  )
}

export default CookieScene
