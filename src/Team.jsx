// src/components/TeamSection.js
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import FloatingImages from "./Team/FloatingImages";
import FloatingImagesV2 from "./Team/FloatingImagesv2";
import FloatingImagesV3 from "./Team/FloatingImagesv3";

const TeamSection = () => {
  const [cursor, setCursor] = useState("default");
  return (
    <div
      style={{
        cursor,
        height: "100vh",
        backgroundColor: "#010313",
        backgroundImage: "url('/map.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <OrbitControls /> */}
        <FloatingImagesV2 setCursor={setCursor} />
      </Canvas>
    </div>
  );
};

export default TeamSection;
