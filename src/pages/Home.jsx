import { Suspense } from "react";
import { Canvas } from '@react-three/fiber';

import Loader from "../components/Loader";

import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";

const Home = () => {
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let screenRotation = [0.1, 4.7, 0];

    if(window.innerWidth < 768){
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, screenRotation]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <Canvas
        className="w-full h-screen bg-transparent"
        camera={{near: 0.1, far: 1000}}
      > 
        <Suspense fallback={<Loader />}>
          {/* directional light come from a distance Source like Sun's light */}
          <directionalLight 
            position={[  2, 1, 1]}
            intensity={2}
          />
          {/* ambient light illuminates all objects in the scene equally without casting Shadows */}
          <ambientLight 
            intensity={0.5}
          />
          {/* point light emits lights in all direction from sigle point */}
          {/* <pointLight /> */}
          {/* spot light is similar to point light */}
          {/* <spotLight /> */}

          {/* hemisphere light illuminates the scene with a gradient */}
          <hemisphereLight 
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          <Bird />
          <Sky />
          <Island 
            position = {islandPosition}
            scale = {islandScale}
            rotation = {islandRotation}
          />
          <Plane />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home;