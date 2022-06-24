import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box() {
  const ref = useRef()
  const [clicked, setClicked] = useState(false)

  /* update loop */
  useFrame((state)=> {
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime)
  })

  return (
    <mesh ref={ref} position={[0, 0, clicked ? 1 : 0]} onClick={() => setClicked(!clicked) }>
      <boxGeometry/>
      <meshBasicMaterial color='orange' />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <Box />
    </Canvas>
  )
}
