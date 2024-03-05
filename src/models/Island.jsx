/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: nimzu (https://sketchfab.com/nimzuk)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907
Title: Fox's islands
*/

import { a } from '@react-spring/three';
import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber';
import islandScene from '../assets/3d/island.glb';

const Island = ({isRotating, setIsRotating, setCurrentStage, ...props}) => {
    const islandRef = useRef();
    const {gl, viewport} = useThree();
    const { nodes, materials } = useGLTF(islandScene);
    
    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.95;
    
    // if the mouse's cursor is held and dragged
    const handlePointerDown = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setIsRotating(true);
    
        // Calculate the clientX based on whether it's a touch event or a mouse event
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    
        // Store the current clientX position for reference
        lastX.current = clientX;
    };
    
    // if the mouse's cursor is released
    const handlePointerUp = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setIsRotating(false);
    };
    // if the mouse's cursor drag and move
    const handlePointerMove = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (isRotating) {
          // If rotation is enabled, calculate the change in clientX position
          const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    
          // calculate the change in the horizontal position of the mouse cursor or touch input,
          // relative to the viewport's width
          const delta = (clientX - lastX.current) / viewport.width;
    
          // Update the island's rotation based on the mouse/touch movement
          islandRef.current.rotation.y += delta * 0.01 * Math.PI;
    
          // Update the reference for the last clientX position
          lastX.current = clientX;
    
          // Update the rotation speed
          // Normal speed is "0.01"
          rotationSpeed.current = delta * 0.005 * Math.PI;
        }
      };
    // user using move with keyoard
    const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft'){
            if(!isRotating) setIsRotating(true);
            islandRef.current.rotation.y += 0.01 * Math.PI;
            rotationSpeed.current = 0.0125;
        } else if (event.key === 'ArrowRight'){
            if (!isRotating) setIsRotating(true);
            islandRef.current.rotation.y -= 0.01 * Math.PI;
            rotationSpeed.current = -0.0125;
        }
    }
    const handleKeyUp = (event) => {
        if(event.key === 'ArrowLeft' || event.key === 'ArrowRight'){
            setIsRotating(false);
        }
    }
    
    // This function is called on each frame update
    useFrame(()=>{
        // if not rotatin apply damping to slow down the rotation smoothly.
        if(!isRotating){
            // Apply Damping factor
            rotationSpeed.current *= dampingFactor;
            // stop rotation when speed is very small
            if(Math.abs(rotationSpeed.current )< 0.001){
                rotationSpeed.current = 0;
            }
            islandRef.current.rotation.y += rotationSpeed.current;
        } else {
            // When rotation, determine the current stage based on island's orientation
            const rotation = islandRef.current.rotation.y;
            const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
            // set the current stage based on the island's location
            switch (true) {
                case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
                    setCurrentStage(4);
                    break;
                case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
                    setCurrentStage(3);
                    break;
                case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
                    setCurrentStage(2);
                    break;
                case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
                    setCurrentStage(1);
                    break;
                default:
                    setCurrentStage(null);
              }
        }
    });

    useEffect(()=>{
        const canvas = gl.domElement;
        canvas.addEventListener("pointerdown", handlePointerDown);
        canvas.addEventListener("pointerup", handlePointerUp);
        canvas.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        
        return () => {
            canvas.removeEventListener("pointerdown", handlePointerDown);
            canvas.removeEventListener("pointerup", handlePointerUp);
            canvas.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    },[gl, handlePointerDown, handlePointerUp, handlePointerMove]);

    return (
        // it is not primitive element
        <a.group ref={islandRef} {...props}>
            <mesh
                geometry={nodes.polySurface944_tree_body_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface945_tree1_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface946_tree2_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface947_tree1_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface948_tree_body_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface949_tree_body_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.pCube11_rocks1_0.geometry}
                material={materials.PaletteMaterial001}
            />
        </a.group>
  );
}

useGLTF.preload("/island.glb");

export default Island;