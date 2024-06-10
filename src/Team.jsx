// src/components/TeamSection.js
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, Stats } from "@react-three/drei";
import FloatingImages from "./Team/FloatingImages";
import FloatingImagesV2 from "./Team/FloatingImagesv2";
import FloatingImagesV3 from "./Team/FloatingImagesv3";
import FloatingImagesV4 from "./Team/FloatingImagesv4";

const TeamSection = () => {
  const [cursor, setCursor] = useState("default");
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
        <FloatingImagesV4 setCursor={setCursor} />
        {/* </OrthographicCamera> */}
      </Canvas>
    </div>
  );
};

export default TeamSection;
