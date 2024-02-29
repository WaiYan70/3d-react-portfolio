import { useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import planeScene from '../assets/3d/plane.glb';

const Plane = ({isRotating, ...props}) => {
  const planeRef = useRef();
  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(planeScene);
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, planeRef);

  // Use an effect to control the plane's animation based on 'isRotating'
  // useEffect(()=>{
  //   if(isRotating){
  //     actions['Take 001'].play();
  //   } else {
  //     actions['Take 001'].stop();
  //   }
  // },[actions, isRotating]);

  useEffect(() => {
    actions["Take 001"].play();
  },[])

  return (
    <mesh {...props} ref={planeRef}>
      <primitive object={scene} />
    </mesh>
  );
}

export default Plane;