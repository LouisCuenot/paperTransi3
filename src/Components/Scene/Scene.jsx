import React, {useState, useEffect} from 'react'
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'

import planeMaterialFrag from './shaders/planeMaterial.frag?raw'
import planeMaterialVert from './shaders/planeMaterial.vert?raw'
import { useRef } from 'react'

const PlaneMaterial = shaderMaterial(
  {
    uTime:0,
    uDecalage:0,
    uPlaneWidth:0,
    uColor:0
  },
  planeMaterialVert,
  planeMaterialFrag
)

extend({PlaneMaterial})

const Scene = () => {

  const [planeWidth, setPlaneWidth] = useState(window.innerWidth/window.innerHeight)

  const planeMaterialRef = useRef()
  const planeMaterialRef1 = useRef()

  useFrame((state, delta)=>{
    if(planeMaterialRef.current){
      planeMaterialRef.current.uniforms.uTime.value += delta 
      planeMaterialRef.current.uniforms.uDecalage.value = Math.sin(state.clock.elapsedTime)*0.5+0.5
      console.log(Math.sin(state.clock.elapsedTime)*0.5+0.5)
    }
    if(planeMaterialRef1.current){
      planeMaterialRef1.current.uniforms.uTime.value += delta 
      planeMaterialRef1.current.uniforms.uDecalage.value = Math.sin(state.clock.elapsedTime)*0.5+0.5
    }
  })

  useEffect(()=>{
    if(planeMaterialRef.current){
      planeMaterialRef.current.side = 0
    }
  },[planeMaterialRef.current])

  useEffect(()=>{
    if(planeMaterialRef1.current){
      planeMaterialRef1.current.side = 1
    }
  },[planeMaterialRef1.current])


  useEffect(()=>{
    const handleResize = () => {
      setPlaneWidth(window.innerWidth/window.innerHeight)
    }



    window.addEventListener('resize', ()=>handleResize())
    return window.removeEventListener('resize',()=>handleResize())
  },[])

  return (
    <>
  
        <mesh>
            <planeGeometry args={[planeWidth,1,64,64]}/>
            <planeMaterial 
              ref={planeMaterialRef} 
              uTime={0}
              uDecalage={0}
              uPlaneWidth={planeWidth}
              uColor={0.7}
            />
        </mesh>
        <mesh>
            <planeGeometry args={[planeWidth,1,64,64]}/>
            <planeMaterial 
              ref={planeMaterialRef1} 
              uTime={0}
              uDecalage={0}
              uPlaneWidth={planeWidth}
              uColor={0.6}
            />
        </mesh>
    </>
  )
}

export default Scene