import { useGLTF } from '@react-three/drei';
import planeScene from '../assets/3d/plane.glb';

const Plane = () => {
  const {scene, animation} = useGLTF(planeScene);
  return (
    <mesh>
      <primitive object={scene} />
    </mesh>
  );
}

export default Plane;