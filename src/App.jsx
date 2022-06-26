import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from "@react-three/drei"
import { EffectComposer, DepthOfField } from "@react-three/postprocessing"

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
    ref.current.position.set(data.x * width * 2, (data.y += 0.01) * 2, z * 2)
    if (data.y > height ) {
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



export default function App({ count = 200, depth = 100 }) {
  return (
    <Canvas gl={{alpha: false}} camera={{ near: 0.01, far: 500, fov: 30 }}>
      <color attach="background" args={["#2f90eb"]} />
      <Suspense fallback={null}>
        <Environment preset="sunset"/>
        { Array.from({ length: count }, (_, i) => (
          <Book key={i} z={-(i/count) * depth - 50 } />
          ))}
        <EffectComposer>
          <DepthOfField target={[0,0, 200]} focalLength={0.8} bokehScale={3} height={700}/>
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
