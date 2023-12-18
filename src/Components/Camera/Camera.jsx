import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import React, { useEffect, useState } from 'react'

const Camera = () => {

  const [cameraZoom, setCameraZoom] = useState(window.innerHeight)

  useEffect(()=>{
    const changeCameraZoom = () =>{
      setCameraZoom(window.innerHeight)
    }

    window.addEventListener('resize',()=>changeCameraZoom())
    return window.removeEventListener('resize',()=>changeCameraZoom())
  },[])



  return (
    <>
      
      {
        <PerspectiveCamera makeDefault position={[0,5,5]} args={[60, window.innerWidth/window.innerHeight,1,1000]}/>
        //<OrthographicCamera makeDefault zoom={cameraZoom} position={[0,0,0.9]} args={[-0.5,0.5,0.5,-0.5,0.1,100]}/>
      }
    </>
  )
}

export default Camera