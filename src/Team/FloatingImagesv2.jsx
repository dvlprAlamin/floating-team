import React, { useMemo, useRef, useState } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { Raycaster, TextureLoader } from "three";
import { Html, Text } from "@react-three/drei";
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

const FloatingImagesV2 = ({ setCursor }) => {
  const images = useLoader(TextureLoader, imagePaths);
  const bg = useLoader(TextureLoader, ["/bgg.png"]);
  //   const initialPositions = useMemo(
  //     () => generatePositions(imagePaths.length, 1, 1),
  //     []
  //   );
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

  console.log("initialPositions", initialPositions);
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

  const handlePointerDown = (index) => {
    setDraggedIndex(index);
  };

  const handlePointerUp = (event, index) => {
    setDraggedIndex(null);
    console.log("index", index);
    const image = imagesRef.current[index];
    gsap.to(image.position, {
      // Animate back to initial position smoothly
      x: initialPositions[index][0],
      y: initialPositions[index][1],
      z: 0, //initialPositions[index][2],
      duration: 2, // Duration of animation
      ease: "power2.out", // Easing function
    });
    gsap.to(image.scale, {
      // Animate to new position smoothly
      x: scale[index],
      y: scale[index],
      z: 1, // Restrict to X and Y axes
      duration: 1, // Duration of animation
      ease: "power2.out", // Easing function
    });
    // image.material.color.set(color); // Reset color
    event.target.releasePointerCapture(event.pointerId);
    event.stopPropagation();
  };

  const imagesRef = useRef([]);

  const raycaster = useMemo(() => new Raycaster(), []);
  useFrame(({ pointer }) => {
    if (draggedIndex !== null) {
      const image = imagesRef.current[draggedIndex];

      gsap.to(image.scale, {
        // Animate to new position smoothly
        x: 2,
        y: 2,
        z: 2, // Restrict to X and Y axes
        duration: 1, // Duration of animation
        ease: "power2.out", // Easing function
      });
      raycaster.setFromCamera(pointer, camera);
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
      }
    }
  });

  return (
    <>
      {images.map((texture, index) => (
        // <DraggableImage

        //   key={index}
        //   texture={texture}
        //   position={initialPositions[index]}
        //   onPointerDown={() => handlePointerDown(index)}
        //   onPointerUp={handlePointerUp}
        //   // onPointerMove={handlePointerMove}
        // />
        <mesh
          key={index}
          ref={(el) => (imagesRef.current[index] = el)}
          position={initialPositions[index]}
          scale={[scale[index], scale[index], 1]}
          onPointerDown={() => handlePointerDown(index)}
          onPointerUp={(event) => handlePointerUp(event, index)}
        >
          <circleGeometry args={[0.4, 64]} />
          {/* <Text scale={0.5}>{index}</Text> */}
          <meshBasicMaterial map={texture} />
        </mesh>
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

const DraggableImage = ({
  texture,
  position,
  // onPointerDown,
  // onPointerUp,
  // onPointerMove,
}) => {
  const imageRef = useRef(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handlePointerDown = (index) => {
    setDraggedIndex(index);
  };

  const handlePointerUp = () => {
    setDraggedIndex(null);
    if (imageRef.current) {
      imageRef.current.position.x = position.x;
      imageRef.current.position.y = position.y;
      // imageRef.current.position.set(position);
    }
    // setPositions(initialPositions);
  };

  const handlePointerMove = (event) => {
    if (draggedIndex !== null) {
      const { x, y } = event.point;
      if (imageRef.current) {
        console.log("imageRef.current", imageRef.current);
        imageRef.current.position.x = x;
        imageRef.current.position.y = y;
      }
    }
  };
  return (
    <mesh
      ref={imageRef}
      position={[position.x, position.y, position.z]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <circleGeometry args={[0.4, 32]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default FloatingImagesV2;
