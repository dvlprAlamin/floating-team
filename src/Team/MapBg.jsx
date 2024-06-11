import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import pointsData from "./mapPoints.json";
import { PointMaterial } from "@react-three/drei";
import "./CustomPointMaterial";
export const Points = () => {
  const points = useRef();
  const [hovered, setHovered] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(new THREE.Vector3());
  // const { camera } = useThree();
  // const orange = new THREE.Color("orange");
  // const raycaster = useMemo(() => new THREE.Raycaster(), []);
  // useEffect(() => {
  //   const geometry = new THREE.BufferGeometry();
  //   const positions = new Float32Array(pointsData.length * 3);
  //   const colors = new Float32Array(pointsData.length * 3);

  //   pointsData.forEach((point, i) => {
  //     positions[i * 3] = point.x * 0.1;
  //     positions[i * 3 + 1] = point.y * 0.1;
  //     positions[i * 3 + 2] = 0; // Z-coordinate
  //     colors[i * 3] = 0.5;
  //     colors[i * 3 + 1] = 0.5;
  //     colors[i * 3 + 2] = 0.5;
  //   });

  //   geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  //   geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  //   points.current.geometry = geometry;
  // }, []);

  const [positions] = useMemo(() => {
    // const positions = [...new Array(pointsData.length * 3)].map(
    //   () => 5 - Math.random() * 10
    // );
    // const colors = [...new Array(1000)].flatMap(() => orange.toArray());
    const positions = new Float32Array(pointsData.length * 3);
    // const colors = new Float32Array(pointsData.length * 3);
    pointsData.forEach((point, i) => {
      positions[i * 3] = point.x * 0.1;
      positions[i * 3 + 1] = point.y * 0.1;
      positions[i * 3 + 2] = 0; // Z-coordinate
    });
    return [positions];
  }, [pointsData.length]);

  useFrame(({ pointer, clock }) => {
    if (hovered) {
      points.current.material.uniforms.uHover.value = new THREE.Vector3(
        pointer.x,
        pointer.y,
        0
      );
    }
    points.current.material.uniforms.uTime.value = clock.getElapsedTime();
  });

  const handlePointerMove = (event) => {
    const { x, y, z } = event.point;
    // setHoveredPoint(new THREE.Vector3(x, y, z));
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };
  return (
    <points
      ref={points}
      scale={0.8}
      position={[-3.5, -4, 0]}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
    >
      {/* <pointsMaterial attach="material" size={4.5} vertexColors={true} /> */}
      <bufferGeometry>
        <bufferAttribute
          usage={THREE.DynamicDrawUsage}
          attach="attributes-position"
          args={[positions, 3]}
        />
        {/* <bufferAttribute
          usage={THREE.DynamicDrawUsage}
          attach="attributes-color"
          args={[colors, 3]}
        /> */}
      </bufferGeometry>
      <customPointsMaterial attach="material" />
    </points>
  );
};
