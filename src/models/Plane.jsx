import { useGLTF } from '@react-three/drei';
import planeScene from '../assets/3d/plane.glb';

const Plane = ({isRotating, ...props}) => {
  const {scene, animation} = useGLTF(planeScene);
  return (
    <mesh {...props}>
      <primitive object={scene} />
    </mesh>
  );
}

export default Plane;