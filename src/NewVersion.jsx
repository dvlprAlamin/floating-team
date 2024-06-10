import React, { useMemo, useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap"; // Import gsap for easing
import { Sphere } from "./App";

function createPositions(start, end, count) {
  const positions = [];
  const step = [
    (end[0] - start[0]) / (count - 1),
    (end[1] - start[1]) / (count - 1),
    (end[2] - start[2]) / (count - 1),
  ];

  for (let i = 0; i < count; i++) {
    positions.push([
      start[0] + step[0] * i,
      start[1] + step[1] * i,
      start[2] + step[2] * i,
    ]);
  }

  return positions;
}

function DraggableMesh({ position, color, initialPosition }) {
  const meshRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const { camera, scene, gl } = useThree();
  const planeRef = useRef();

  const onPointerDown = (event) => {
    setIsDragging(true);
    meshRef.current.material.color.set(0xff0000); // Change color on drag start
    event.stopPropagation();
    event.target.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event) => {
    setIsDragging(false);
    gsap.to(meshRef.current.position, {
      // Animate back to initial position smoothly
      x: initialPosition[0],
      y: initialPosition[1],
      z: initialPosition[2],
      duration: 0.5, // Duration of animation
      ease: "power2.out", // Easing function
    });
    meshRef.current.material.color.set(color); // Reset color
    event.target.releasePointerCapture(event.pointerId);
    event.stopPropagation();
  };
  useFrame(({ mouse }) => {
    if (isDragging) {
      // const mouse = new THREE.Vector2(
      //   (event.clientX / gl.domElement.clientWidth) * 2 - 1,
      //   -(event.clientY / gl.domElement.clientHeight) * 2 + 1
      // );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(planeRef.current);
      if (intersects.length > 0) {
        const intersect = intersects[0];
        gsap.to(meshRef.current.position, {
          // Animate to new position smoothly
          x: intersect.point.x + 15,
          y: intersect.point.y + 15,
          z: initialPosition[2], // Restrict to X and Y axes
          duration: 0.5, // Duration of animation
          ease: "power2.out", // Easing function
        });
      }
    }
  });
  const onPointerMove = (event) => {
    if (isDragging) {
      const mouse = new THREE.Vector2(
        (event.clientX / gl.domElement.clientWidth) * 2 - 1,
        -(event.clientY / gl.domElement.clientHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(planeRef.current);
      if (intersects.length > 0) {
        const intersect = intersects[0];
        gsap.to(meshRef.current.position, {
          // Animate to new position smoothly
          x: intersect.point.x + 15,
          y: intersect.point.y + 15,
          z: initialPosition[2], // Restrict to X and Y axes
          duration: 0.5, // Duration of animation
          ease: "power2.out", // Easing function
        });
      }
    }
  };
  //   const onPointerMove = (event) => {
  //     if (isDragging) {
  //       const mouse = new THREE.Vector2(
  //         (event.clientX / gl.domElement.clientWidth) * 2 - 1,
  //         -(event.clientY / gl.domElement.clientHeight) * 2 + 1
  //       );

  //       const raycaster = new THREE.Raycaster();
  //       raycaster.setFromCamera(mouse, camera);

  //       const intersects = raycaster.intersectObject(planeRef.current);
  //       if (intersects.length > 0) {
  //         const intersect = intersects[0];
  //         const { width, height } = meshRef.current.geometry.parameters;
  //         // Adjust position to align mesh's center with mouse pointer
  //         meshRef.current.position.x = intersect.point.x - width / 2;
  //         meshRef.current.position.y = intersect.point.y - height / 2;
  //         meshRef.current.position.z = initialPosition[2]; // Restrict to X and Y axes
  //       }
  //     }
  //   };
  return (
    <>
      <mesh
        ref={meshRef}
        position={position}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
      >
        <Sphere image={"/team-members/jhankar-mahbub.jpg"} scale={0.8} />
        {/* <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={color} /> */}
      </mesh>
      <mesh ref={planeRef} visible={false}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
}

function Letter({ positions, color }) {
  return (
    <>
      {positions.map((pos, index) => (
        <DraggableMesh
          key={index}
          position={pos}
          color={color}
          initialPosition={pos}
        />
      ))}
    </>
  );
}

function NewVersion() {
  const groupRef = useRef();

  //   const letterPPositions = useMemo(() => {
  //     let positions = [];
  //     positions = positions.concat(createPositions([0, 0, 0], [0, 3, 0], 15)); // Vertical line
  //     positions = positions.concat(createPositions([0, 3, 0], [1.5, 1.5, 0], 15)); // Diagonal line
  //     positions = positions.concat(
  //       createPositions([1.5, 1.5, 0], [0, 1.5, 0], 10)
  //     ); // Horizontal line
  //     return positions;
  //   }, []);

  //   const letterHPositions = useMemo(() => {
  //     let positions = [];
  //     positions = positions.concat(createPositions([2, 0, 0], [2, 3, 0], 15)); // Left vertical line
  //     positions = positions.concat(createPositions([3, 0, 0], [3, 3, 0], 15)); // Right vertical line
  //     positions = positions.concat(createPositions([2, 1.5, 0], [3, 1.5, 0], 10)); // Middle horizontal line
  //     return positions;
  //   }, []);
  const letterPPositions = useMemo(() => {
    let positions = [];
    positions = positions.concat(createPositions([0, 0, 0], [0, 30, 0], 25)); // Vertical line
    positions = positions.concat(createPositions([0, 30, 0], [15, 18, 0], 15)); // Diagonal line
    positions = positions.concat(createPositions([0, 12, 0], [15, 18, 0], 15)); // Diagonal line
    // positions = positions.concat(createPositions([1.5, 1.5, 0], [0, 1.5, 0], 10)); // Horizontal line
    return positions;
  }, []);

  const letterHPositions = useMemo(() => {
    let positions = [];
    positions = positions.concat(createPositions([20, 0, 0], [20, 30, 0], 25)); // Left vertical line
    positions = positions.concat(createPositions([30, 0, 0], [30, 30, 0], 25)); // Right vertical line
    positions = positions.concat(createPositions([20, 15, 0], [30, 15, 0], 10)); // Middle horizontal line
    return positions;
  }, []);
  return (
    <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 20 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group position={[-15, -15, 0]}>
        <Letter positions={letterPPositions} />
        <Letter positions={letterHPositions} />
      </group>
    </Canvas>
  );
}

export default NewVersion;
