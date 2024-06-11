import React, { useMemo, useRef, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const generateGridPoints = (width, height, step) => {
  const points = [];
  for (let i = -width / 2; i <= width / 2; i += step) {
    for (let j = -height / 2; j <= height / 2; j += step) {
      points.push(new THREE.Vector3(i, j, 0));
    }
  }
  return points;
};

const PointPlane = ({ width = 2, height = 2, step = 0.1 }) => {
  const [light, lightOff] = useTexture([
    "/light-map.png",
    "/light-off-map.png",
  ]);
  const points = useMemo(
    () => generateGridPoints(width, height, step),
    [width, height, step]
  );
  const ref = useRef();

  const positions = useMemo(() => {
    const positions = new Float32Array(points.length * 3);
    points.forEach((point, i) => {
      positions.set(point.toArray(), i * 3);
    });
    return positions;
  }, [points]);

  return (
    <points ref={ref} position={[0, 0, -2.6]}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          usage={THREE.DynamicDrawUsage}
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" size={12} map={lightOff} transparent />
    </points>
  );
};

const ShapeOverlay = ({}) => {
  const texture = useTexture("/alpha-map.jpg");
  return (
    <mesh position={[0, 0, -2.5]}>
      <meshBasicMaterial alphaMap={texture} transparent color={"#010313"} />
      <planeGeometry args={[10.5, 10.5, 64, 64]} />
    </mesh>
  );
};

const App = () => {
  return (
    <>
      <ShapeOverlay />
      <PointPlane width={10} height={10} step={0.15} />
    </>
  );
};

export default App;
