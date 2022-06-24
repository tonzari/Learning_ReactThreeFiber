import { Canvas } from '@react-three/fiber'

export default function App() {
  return <Canvas>
    <mesh position={[0,0,0]}>
      <boxGeometry/>
      <meshBasicMaterial color='orange' />
    </mesh>
  </Canvas>
}
