import { useEffect, useRef, useState } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import birdScene from '../assets/3d/bird.glb';

const Bird = () => {
  const birdRef = useRef();
  const { scene, animations } = useGLTF(birdScene);
  const { actions } = useAnimations(animations, birdRef);

  const targetRotation = useRef(0); // Target rotation for smooth transition
  const rotationSpeed = 0.02; 

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
      // birdRef.current.rotation.y = Math.PI;
      targetRotation.current = Math.PI;
    } else if(birdRef.current.position.x < camera.position.x - 8){
      // change direction forward and reset the bird's direction
      // birdRef.current.rotation.y = 0;
      targetRotation.current = 0;
    }

    // Smoothly interpolate rotation towards target rotation
    birdRef.current.rotation.y += (targetRotation.current - birdRef.current.rotation.y) * rotationSpeed;

    // Update the X and Z positions based on the direction (Y position)
    // if(birdRef.current.rotation.y === 0){}
    if(targetRotation.current === 0){
      // Moving Forward
      birdRef.current.position.x += 0.01;
      birdRef.current.position.z -= 0.01;
    } else {
      // Moving Backward
      birdRef.current.position.x -= 0.01;
      birdRef.current.position.z += 0.01;
    }
  });

  return (
    <mesh 
      position={[ -3, 2, 1]} 
      scale={[0.003, 0.003, 0.003]} 
      ref={birdRef}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Bird;