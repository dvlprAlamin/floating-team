import React, { useMemo, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, extend, useFrame } from "@react-three/fiber";

// Function to generate a grid of points
const generateGridPoints = (width, height, step) => {
  const points = [];
  for (let i = -width / 2; i <= width / 2; i += step) {
    for (let j = -height / 2; j <= height / 2; j += step) {
      points.push({ position: new THREE.Vector3(i, j, 0), isHovered: false });
    }
  }
  return points;
};

const PointPlane = ({ width = 2, height = 2, step = 0.1 }) => {
  const [light, lightOff] = useTexture([
    "/light-map.png",
    "/light-off-map.png",
  ]);
  const [points, setPoints] = useState(() =>
    generateGridPoints(width, height, step)
  );

  const ref = useRef();

  const positions = useMemo(() => {
    const positions = new Float32Array(points.length * 3);
    points.forEach((point, i) => {
      positions.set(point.position.toArray(), i * 3);
    });
    return positions;
  }, [points]);

  useFrame(() => {
    if (ref.current) {
      //   ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Function to handle point hover
  const handlePointerOver = (index) => {
    setPoints((prevPoints) =>
      prevPoints.map((point, i) =>
        i === index ? { ...point, isHovered: true } : point
      )
    );
  };

  // Function to handle point hover out
  const handlePointerOut = (index) => {
    setPoints((prevPoints) =>
      prevPoints.map((point, i) =>
        i === index ? { ...point, isHovered: false } : point
      )
    );
  };

  return (
    <points ref={ref} position={[0, 0, -2.6]}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          usage={THREE.DynamicDrawUsage}
          attachObject={["attributes", "position"]}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" size={12} map={lightOff} transparent />
      {points.map((point, index) => (
        <mesh
          key={index}
          position={point.position}
          onPointerOver={() => handlePointerOver(index)}
          onPointerOut={() => handlePointerOut(index)}
        >
          <planeGeometry args={[0.1, 0.1]} />
          <meshBasicMaterial
            map={point.isHovered ? light : lightOff}
            transparent
          />
        </mesh>
      ))}
    </points>
  );
};

const ShapeOverlay = () => {
  const texture = useTexture("/alpha-map.jpg");
  return (
    <mesh position={[0, 0, -2.5]}>
      <planeGeometry args={[10.5, 10.5, 64, 64]} />
      <meshBasicMaterial alphaMap={texture} transparent color={"#010313"} />
    </mesh>
  );
};

const MapParticlesV4 = () => {
  return (
    <>
      <ShapeOverlay />
      <PointPlane width={10} height={10} step={0.15} />
    </>
  );
};

export default MapParticlesV4;
