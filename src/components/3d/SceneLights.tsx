export function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.0} color="#FFF4E8" />
      {/* Warm key — upper left */}
      <directionalLight position={[-3, 5, 4]} intensity={2.4} color="#FFE4B5" />
      {/* Cool fill — lower right */}
      <directionalLight position={[4, -2, 2]} intensity={0.7} color="#FFF7E4" />
      {/* Rim light from behind */}
      <directionalLight position={[0, 1, -4]} intensity={0.5} color="#E7D7BE" />
      {/* Warm under-bounce simulating bakery counter reflection */}
      <pointLight position={[0, -1.5, 2]} intensity={0.6} color="#F6C453" distance={5} />
      {/* Soft top fill */}
      <pointLight position={[0, 3.0, 2]} intensity={0.5} color="#FFF8EE" distance={6} />
    </>
  )
}
