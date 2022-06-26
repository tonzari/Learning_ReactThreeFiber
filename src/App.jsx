import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from "@react-three/drei"

function Book({z}) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/scene-transformed.glb')

  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])


  const [data] = useState(
    {
      x: THREE.MathUtils.randFloatSpread(35),
      y: THREE.MathUtils.randFloatSpread(height),
      rX: Math.random() * Math.PI,
      rY: Math.random() * Math.PI,
      rZ: Math.random() * Math.PI,
    }
  )

  /* update loop */

  useFrame((state)=> {
    ref.current.rotation.set(data.rX + 0.001, data.rY += 0.001, data.rZ + 0.001)
    ref.current.position.set(data.x * width, (data.y += 0.01), z)
    if (data.y > height * 2) {
      data.y = -height * 2
    }
  })

  return (
    <group ref={ref} position={[0,-10,-50]} rotation={[0,0,-1.6]}>
    <mesh geometry={nodes.book_a_open_0.geometry} material={materials.book_a} />
    <mesh geometry={nodes.book_a_open_1.geometry} material={materials.book_a_pages} />
  </group>
  )
}

// function Book() {
//   const { scene } = useGLTF('/Book/scene.gltf')
//   return <primitive position={[-10,-10,-50]} object={ scene } />
// }



export default function App({ count = 100 }) {
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <spotLight position={[10,10,10]} intensity={0.5} />
      <Suspense fallback={null}>
        <Environment preset="sunset"/>
      { Array.from({ length: count }, (_, i) => (<Book key={i} z={-i} />))}
      </Suspense>
    </Canvas>
  )
}
