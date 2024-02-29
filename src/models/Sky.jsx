import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

import skyScene from '../assets/3d/sky.glb';
import { useFrame } from '@react-three/fiber';

const Sky = ({isRotating}) => {
    const skyRef = useRef();
    const sky = useGLTF(skyScene);
    
    useFrame((_,delta)=>{
        if (!isRotating) {
            skyRef.current.rotation.y += 0.15 * delta;
        } else if(isRotating){
            skyRef.current.rotation.y += 0.25 * delta;
        }
    });

    return (
        // mesh is known as primitive element
        <mesh ref={skyRef}>
            <primitive object={sky.scene}/>
        </mesh>
    )
}

export default Sky;