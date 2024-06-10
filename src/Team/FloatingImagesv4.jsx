import React, { forwardRef, useMemo, useRef, useState } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import {
  BufferGeometry,
  MathUtils,
  Raycaster,
  TextureLoader,
  Vector3,
} from "three";
import { Float, Html, Text } from "@react-three/drei";
import gsap from "gsap";

const imagePaths = [
  "/team-members/Abu_Sufian.jpg",
  "/team-members/Mridul-Das.png",
  "/team-members/alamin_bro.jpg",
  "/team-members/anwar.jpg",
  "/team-members/jhankar-mahbub.jpg",
  "/team-members/rasel.jpg",
  "/team-members/Fardin_Amin_Arpon.jpg",
  "/team-members/Awlad_Hossain.webp",
  "/team-members/Abul_Hashem_Mohon.webp",
  "/team-members/Asif_Mohammed_Sifat.png",
  "/team-members/Azizul_Islam_Milton.jpg",
  "/team-members/Emdadul_Hoque_Tareque.jpg",
  "/team-members/israfil.jpg",
  "/team-members/Saiful_Islam_Sojib.jpg",
  "/team-members/Muktadir-tamim.webp",
  "/team-members/Md.-Zahid-Hossain.jpg",
  "/team-members/Farhan-Elias.jpeg",
];

const generateLines = (positions) => {
  const lines = [];
  for (let i = 0; i < positions.length; i++) {
    if (i === positions.length - 1) {
      const line = new BufferGeometry().setFromPoints([
        new Vector3(...positions[i]),
        new Vector3(...positions[0]),
      ]);
      lines.push(line);
    } else {
      const line = new BufferGeometry().setFromPoints([
        new Vector3(...positions[i]),
        new Vector3(...positions[i + 1]),
      ]);
      lines.push(line);
    }
  }
  return lines;
};

const FloatingImagesV4 = ({ setCursor }) => {
  const images = useLoader(TextureLoader, imagePaths);
  const bg = useLoader(TextureLoader, ["/bgg.png"]);
  //   const initialPositions = useMemo(
  //     () => generatePositions(imagePaths.length, 1, 1),
  //     []
  //   );
  const [lastDragIndex, setLastDragIndex] = useState(null);
  const initialPositions = [
    [-4.75, 3, 0],
    [-3.6, 2, 0],
    [-1.2, 1.4, 0],
    [0.6, 3, 0],
    [1.5, 1.4, 0],
    [4.9, 2.4, 0],
    [3.5, 0.8, 0],
    [2.5, -0.5, 0],
    [5.1, -1.2, 0],
    [3.7, -3, 0],
    [1.3, -2.5, 0],
    [0, -0.5, 0],
    [-2.2, -0.6, 0],
    [-1.2, -3, 0],
    [-4.2, -2.9, 0],
    [-3.5, -1, 0],
    [-5.2, -0, 0],
  ];

  const scale = [
    0.4, 0.65, 1.2, 0.9, 0.6, 0.6, 0.6, 0.45, 1.35, 0.5, 0.6, 1.3, 0.5, 1, 0.8,
    1, 1.3,
  ];

  const lines = useMemo(() => generateLines(initialPositions), []);
  console.log("lines", lines);
  //   const initialPositions = useMemo(
  //     () =>
  //       imagePaths.map(() => ({
  //         x: Math.random() * 10 - 5,
  //         y: Math.random() * 10 - 5,
  //         z: 0,
  //       })),
  //     []
  //   );
  const { camera } = useThree();
  const planeRef = useRef();
  // const [positions, setPositions] = useState(initialPositions);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handlePointerDown = (event, index) => {
    event.stopPropagation();
    setDraggedIndex(index);
  };

  const handlePointerUp = (event, index) => {
    setDraggedIndex(null);
    setLastDragIndex(index);

    // image.material.color.set(color); // Reset color
    // event.target.releasePointerCapture(event.pointerId);
    // event.stopPropagation();
  };

  const imagesRef = useRef([]);
  const linesRef = useRef([]);
  const raycaster = useMemo(() => new Raycaster(), []);
  const offset = useRef(Math.random() * 10000);
  useFrame(({ pointer, clock }) => {
    const t = offset.current + clock.getElapsedTime();
    let yPosition = Math.sin((t / 4) * 1) / 10;
    yPosition = MathUtils.mapLinear(yPosition, -0.1, 0.1, -0.1, 0.1);
    console.log("yPosition", yPosition);

    raycaster.setFromCamera(pointer, camera);
    const intersectsImage = raycaster.intersectObjects(imagesRef.current);
    console.log("intersectsImage", intersectsImage);
    if (intersectsImage.length > 0) {
      document.body.style.cursor = "grab";
    } else {
      document.body.style.cursor = "default";
    }
    if (draggedIndex !== null) {
      document.body.style.cursor = "grabbing";
      const image = imagesRef.current[draggedIndex];
      //   const line = linesRef.current[draggedIndex];
      //   console.log("line", line);

      const line = linesRef.current[draggedIndex];
      const previousLine =
        linesRef.current[
          draggedIndex === 0 ? initialPositions.length - 1 : draggedIndex - 1
        ];

      gsap.to(image.scale, {
        // Animate to new position smoothly
        x: 2,
        y: 2,
        z: 2, // Restrict to X and Y axes
        duration: 1, // Duration of animation
        ease: "power2.out", // Easing function
      });
      //   raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(planeRef.current);
      if (intersects.length > 0) {
        const intersect = intersects[0];
        gsap.to(image.position, {
          // Animate to new position smoothly
          x: intersect.point.x,
          y: intersect.point.y,
          z: 0.1,
          duration: 1, // Duration of animation
          ease: "power2.out", // Easing function
        });
        gsap.to(line.geometry.attributes.position.array, {
          // Animate to new position smoothly
          0: intersect.point.x,
          1: intersect.point.y,
          duration: 1, // Duration of animation
          ease: "power2.out", // Easing function
        });
        // line.geometry.attributes.position.array[0] = intersect.point.x;
        // line.geometry.attributes.position.array[1] = intersect.point.y;
        line.geometry.attributes.position.needsUpdate = true;
        gsap.to(previousLine.geometry.attributes.position.array, {
          // Animate to new position smoothly
          3: intersect.point.x,
          4: intersect.point.y,
          duration: 1, // Duration of animation
          ease: "power2.out", // Easing function
        });
        // previousLine.geometry.attributes.position.array[3] = intersect.point.x;
        // previousLine.geometry.attributes.position.array[4] = intersect.point.y;
        previousLine.geometry.attributes.position.needsUpdate = true;
      }
    }
    if (lastDragIndex !== null) {
      setTimeout(() => {
        setLastDragIndex(null);
      }, 5000);

      const image = imagesRef.current[lastDragIndex];
      const line = linesRef.current[lastDragIndex];
      const previousLine =
        linesRef.current[
          lastDragIndex === 0 ? initialPositions.length - 1 : lastDragIndex - 1
        ];
      gsap.to(image.position, {
        // Animate back to initial position smoothly
        x: initialPositions[lastDragIndex][0],
        y: initialPositions[lastDragIndex][1],
        z: 0.05, //initialPositions[lastDragIndex][2],
        duration: 2, // Duration of animation
        ease: "power2.out", // Easing function
      });
      gsap.to(image.scale, {
        // Animate to new position smoothly
        x: scale[lastDragIndex],
        y: scale[lastDragIndex],
        z: 1, // Restrict to X and Y axes
        duration: 2, // Duration of animation
        ease: "power2.out", // Easing function
      });

      gsap.to(line.geometry.attributes.position.array, {
        // Animate to new position smoothly
        0: initialPositions[lastDragIndex][0],
        1: initialPositions[lastDragIndex][1],
        duration: 2, // Duration of animation
        ease: "power2.out", // Easing function
      });

      line.geometry.attributes.position.needsUpdate = true;

      gsap.to(previousLine.geometry.attributes.position.array, {
        // Animate to new position smoothly
        3: initialPositions[lastDragIndex][0],
        4: initialPositions[lastDragIndex][1],
        duration: 2, // Duration of animation
        ease: "power2.out", // Easing function
      });
      previousLine.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      {/* {lines.map((line, index) => (
        <line key={index} ref={(el) => (linesRef.current[index] = el)}>
          <primitive attach="geometry" object={line} />
          <lineBasicMaterial attach="material" color="lightgreen" />
        </line>
      ))} */}
      {images.map((texture, index) => (
        <group key={index}>
          {/* <Float speed={2} floatIntensity={0.3}> */}

          <line key={index} ref={(el) => (linesRef.current[index] = el)}>
            <primitive attach="geometry" object={lines[index]} />
            <lineBasicMaterial attach="material" color="lightgreen" />
          </line>
          <mesh
            ref={(el) => (imagesRef.current[index] = el)}
            position={initialPositions[index]}
            scale={[scale[index], scale[index], 1]}
            onPointerDown={(event) => handlePointerDown(event, index)}
            onPointerUp={(event) => handlePointerUp(event, index)}
          >
            <circleGeometry args={[0.4, 64]} />
            {/* <Text scale={0.5}>{index}</Text> */}
            <meshBasicMaterial map={texture} />
          </mesh>
          {/* </Float> */}
        </group>
      ))}

      <mesh ref={planeRef} visible={false}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"white"} />
      </mesh>
      {/* <mesh position={[0, 0, -0.001]}>
        <planeGeometry args={[15, 10]} />
        <meshStandardMaterial map={bg[0]} />
      </mesh> */}
    </>
  );
};

export default FloatingImagesV4;

const Line = ({ start, end }) => {
  const points = useMemo(
    () => [start, end].map((p) => new Vector3(...p)),
    [start, end]
  );
  console.log("points", points);
  const lineGeometry = useMemo(
    () => new BufferGeometry().setFromPoints(points),
    []
  );
  console.log("lineGeometry", lineGeometry);
  return (
    <line>
      <primitive attach="geometry" object={lineGeometry} />
      <lineBasicMaterial attach="material" color="lightgreen" />
    </line>
  );
};
