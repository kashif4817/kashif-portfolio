'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

function Blob() {
  const mesh = useRef()

  useFrame((state, delta) => {
    if (!mesh.current) return
    const { x, y } = state.pointer
    // Ease the blob's rotation toward the pointer + slow constant drift
    mesh.current.rotation.x += (y * 0.35 - mesh.current.rotation.x) * 0.04
    mesh.current.rotation.y += (x * 0.55 - mesh.current.rotation.y) * 0.04
    mesh.current.rotation.z += delta * 0.05
  })

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={1.1}>
      <mesh ref={mesh} scale={1.9}>
        <icosahedronGeometry args={[1, 48]} />
        <MeshDistortMaterial color="#151515" roughness={0.22} metalness={0.9} distort={0.38} speed={1.6} />
      </mesh>
    </Float>
  )
}

export default function HeroShape() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.5], fov: 42 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 6]} intensity={1.2} color="#f2f2ee" />
      <pointLight position={[-5, -3, 2]} intensity={14} color="#d1fa3c" />
      <pointLight position={[4, -2, -4]} intensity={9} color="#5a6cff" />
      <Blob />
    </Canvas>
  )
}
