// src/components/TeamSection.js
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, Stats } from "@react-three/drei";
import FloatingImages from "./Team/FloatingImages";
import FloatingImagesV2 from "./Team/FloatingImagesv2";
import FloatingImagesV3 from "./Team/FloatingImagesv3";
import FloatingImagesV4 from "./Team/FloatingImagesv4";
import FloatingImagesV5 from "./Team/FloatingImagesv5";

const TeamSection = () => {
  return (
    <div
      style={{
        maxWidth: "100vw",
        aspectRatio: "15/7",
        backgroundColor: "#010313",
        backgroundImage: "url('/map.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <Canvas>
        <Stats />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <OrbitControls /> */}
        {/* <OrthographicCamera makeDefault position={[0, 0, -1]} zoom={100}> */}
        {/* <FloatingImagesV5 /> */}
        {/* </OrthographicCamera> */}
      </Canvas>
    </div>
  );
};

export default TeamSection;
