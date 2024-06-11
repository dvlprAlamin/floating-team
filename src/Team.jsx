// src/components/TeamSection.js
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, Stats } from "@react-three/drei";
import FloatingImages from "./Team/FloatingImages";
import FloatingImagesV2 from "./Team/FloatingImagesv2";
import FloatingImagesV3 from "./Team/FloatingImagesv3";
import FloatingImagesV4 from "./Team/FloatingImagesv4";
import FloatingImagesV5 from "./Team/FloatingImagesv5";
import { Points } from "./Team/MapBg";
import MapParticles from "./Team/MapParticles";
import MapParticlesV2 from "./Team/MapParticlesV2";
import MapParticlesV3 from "./Team/MapParticlesV3";
import MapParticlesV4 from "./Team/MapParticlesV4";

const TeamSection = () => {
  return (
    <div
      style={{
        maxWidth: "100vw",
        aspectRatio: "15/7",
        // backgroundColor: "#010313",
        // backgroundImage: "url('/map.png')",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "contain",
        // backgroundPosition: "center",
      }}
    >
      <Canvas orthographic camera={{ zoom: 80 }}>
        <Stats />
        {/* <ambientLight />
        <pointLight position={[10, 10, 10]} /> */}
        {/* <OrbitControls /> */}
        {/* <OrthographicCamera makeDefault position={[0, 0, -1]} zoom={100}> */}
        <FloatingImagesV5 />
        {/* <Points /> */}
        {/* <MapParticlesV2 /> */}
        {/* <MapParticlesV3 /> */}
        {/* </OrthographicCamera> */}
      </Canvas>
    </div>
  );
};

export default TeamSection;
