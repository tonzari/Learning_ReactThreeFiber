import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from "@react-three/drei"

function Box({z}) {
  const ref = useRef()
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])


  const [data] = useState(
    {
      x: THREE.MathUtils.randFloatSpread(2),
      y: THREE.MathUtils.randFloatSpread(height),
    }
  )

  /* update loop */

  useFrame((state)=> {
    ref.current.position.set(data.x * width, (data.y += 0.01), z)
    if (data.y > height * 0.7) {
      data.y = -height * 0.7
    }
  })

  return (
    <mesh ref={ref}>
      <boxGeometry/>
      <meshBasicMaterial map='/Book/textures/book_a_baseColor.png' color='orange' />
    </mesh>
  )
}

function Book() {
  const { scene } = useGLTF('/Book/scene.gltf')
  return <primitive position={[-10,-10,-50]} object={ scene } />
}

export default function App({ count = 100 }) {
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <spotLight position={[10,10,10]} intensity={0.5} />
      <Suspense fallback={null}>
        <Book />
        <Environment preset="sunset"/>
      </Suspense>
      {/* { Array.from({ length: count }, (_, i) => (<Box key={i} z={-i} />))} */}
    </Canvas>
  )
}
