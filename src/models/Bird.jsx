import { useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';

import birdScene from '../assets/3d/bird.glb';
import { useFrame } from '@react-three/fiber';

const Bird = () => {
  const birdRef = useRef();
  const {scene, animations} = useGLTF(birdScene);
  const {actions} = useAnimations(animations, birdRef);

  useEffect(()=>{
    actions['Take 001'].play();
  },[]);  

  // useFrame function to update every frame rate
  useFrame(({clock, camera})=>{
    // Updating this Y position to up and down movement by using Sin Wave formula
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;
    // if the bird reach a certain endpoint in the map, it will change the bird's direction
    if(birdRef.current.position.x > camera.position.x + 8){
      // change direction backward and rotate the bird 180 degree on y axis
      birdRef.current.rotation.y = Math.PI;
    } else if(birdRef.current.position.x < camera.position.x - 8){
      // change direction forward and reset the bird's direction
      birdRef.current.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction (Y position)
    if(birdRef.current.rotation.y === 0){
      // Moving forward
      birdRef.current.position.x  += 0.01;
      birdRef.current.position.z -= 0.01;
    } else {
      //Moving backward
      birdRef.current.position.x -= 0.01;
      birdRef.current.position.z += 0.01;
    }
  });

  return (
    <mesh 
      position={[ -5, 2, 1]} 
      scale={[0.003, 0.003, 0.003]} 
      ref={birdRef}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Bird;