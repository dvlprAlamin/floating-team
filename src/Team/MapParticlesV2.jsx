import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { DynamicDrawUsage } from "three";

const MapParticlesV2 = () => {
  const pointsRef = useRef();
  const [map, lightMap] = useTexture(["/alpha-map.jpg", "/light-map.png"]);

  const position = useMemo(() => {
    const position = new Float32Array(4096 * 3);

    for (let i = -32; i <= 31; i++) {
      for (let j = 31; j >= -32; j--) {
        position[i * 3] = i;
        position[i * 3 + 1] = j;
        position[i * 3 + 2] = 0;
      }
    }

    return position;
  }, []);
  useFrame(() => {
    console.log("pointsRef.current", pointsRef.current);
    pointsRef.current.geometry.attributes;
  });
  return (
    <group scale={0.8}>
      {/* <mesh position={[0, 0, -0.5]}>
        <meshBasicMaterial alphaMap={map} transparent color={"#010313"} />
        <planeGeometry args={[10.5, 10.5, 64, 64]} />
      </mesh> */}
      <points ref={pointsRef} position={[0, 0, -0.6]}>
        <pointsMaterial map={lightMap} size={6} />
        {/* <planeGeometry args={[10, 10, 64, 64]} /> */}

        <bufferGeometry>
          <bufferAttribute
            usage={DynamicDrawUsage}
            attach="attributes-position"
            args={[position, 3]}
          />
          {/* <bufferAttribute
          usage={THREE.DynamicDrawUsage}
          attach="attributes-color"
          args={[colors, 3]}
        /> */}
        </bufferGeometry>
      </points>
    </group>
  );
};

export default MapParticlesV2;
