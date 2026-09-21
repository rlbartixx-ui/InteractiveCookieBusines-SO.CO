export function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.0} color="#FFF4E8" />
      {/* Warm key — upper left */}
      <directionalLight position={[-3, 5, 4]} intensity={2.4} color="#FFE4B5" />
      {/* Cool fill — lower right */}
      <directionalLight position={[4, -2, 2]} intensity={0.7} color="#EFE9E3" />
      {/* Rim from behind */}
      <directionalLight position={[0, 1, -4]} intensity={0.5} color="#D9CFC7" />
      {/* Warm point under the cookie for glow */}
      <pointLight position={[0, -1.5, 2]} intensity={0.6} color="#C9B59C" distance={5} />
      {/* Soft top fill */}
      <pointLight position={[0, 3.0, 2]} intensity={0.5} color="#FFF8EE" distance={6} />
    </>
  )
}
