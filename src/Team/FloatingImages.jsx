// // src/components/FloatingImages.js
// import React, { useRef, useState, useEffect } from "react";
// import { useFrame, useLoader, useThree } from "@react-three/fiber";
// import { TextureLoader } from "three";
// import { DragControls, Line } from "@react-three/drei";

// const imagePaths = [
//   "/team-members/alamin_bro.jpg",
//   "/team-members/Mridul-Das.png",
//   "/team-members/alamin_bro.jpg",
//   "/team-members/Mridul-Das.png",
//   "/team-members/alamin_bro.jpg",
//   "/team-members/Mridul-Das.png",
//   "/team-members/alamin_bro.jpg",
//   "/team-members/Mridul-Das.png",
//   "/team-members/alamin_bro.jpg",
//   "/team-members/Mridul-Das.png",
//   "/team-members/alamin_bro.jpg",
//   "/team-members/Mridul-Das.png",
//   "/team-members/alamin_bro.jpg",
//   "/team-members/Mridul-Das.png",
//   // Add more image paths
// ];

// const FloatingImages = () => {
//   const { camera, gl } = useThree();
//   const controls = useRef();
//   const [dragged, setDragged] = useState(null);
//   const images = useLoader(TextureLoader, imagePaths);
//   const [positions, setPositions] = useState(
//     imagePaths.map(() => ({
//       x: Math.random() * 10 - 5,
//       y: Math.random() * 10 - 5,
//       z: Math.random() * 10 - 5,
//     }))
//   );

//   const initialPositions = useRef(positions);
//   useEffect(() => {
//     if (dragged !== null) {
//       const dragControls = controls.current;
//       dragControls.addEventListener("dragend", (event) => {
//         setTimeout(() => {
//           setPositions((prevPositions) =>
//             prevPositions.map((pos, index) =>
//               index === dragged ? initialPositions.current[index] : pos
//             )
//           );
//           setDragged(null);
//         }, 1000);
//       });
//     }
//   }, [dragged]);

//   return (
//     <>
//       <DragControls
//         ref={controls}
//         args={[positions, camera, gl.domElement]}
//         transformGroup
//         onDragStart={(event) => {
//           console.log("eee", event);
//         }}
//       >
//         {images.map((texture, index) => (
//           <mesh
//             key={index}
//             position={[
//               positions[index].x,
//               positions[index].y,
//               positions[index].z,
//             ]}
//           >
//             <planeGeometry args={[1, 1]} />
//             <meshBasicMaterial map={texture} />
//           </mesh>
//         ))}
//       </DragControls>
//       {positions.map((pos, index) => (
//         <Line
//           key={index}
//           points={positions.map((p) => [p.x, p.y, p.z])}
//           color="cyan"
//           lineWidth={1}
//         />
//       ))}
//     </>
//   );
// };

// export default FloatingImages;
// src/components/FloatingImages.js
import React, { useMemo, useRef, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Html } from "@react-three/drei";

const imagePaths = [
  "/team-members/alamin_bro.jpg",
  "/team-members/Mridul-Das.png",
  "/team-members/alamin_bro.jpg",
  "/team-members/Mridul-Das.png",
  "/team-members/alamin_bro.jpg",
  "/team-members/Mridul-Das.png",
  "/team-members/alamin_bro.jpg",
  "/team-members/Mridul-Das.png",
  "/team-members/alamin_bro.jpg",
  "/team-members/Mridul-Das.png",
  "/team-members/alamin_bro.jpg",
  "/team-members/Mridul-Das.png",
  "/team-members/alamin_bro.jpg",
  "/team-members/Mridul-Das.png",
];

const FloatingImages = () => {
  const images = useLoader(TextureLoader, imagePaths);
  const initialPositions = useMemo(
    () =>
      imagePaths.map(() => ({
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
        z: 0,
      })),
    []
  );
  // const [positions, setPositions] = useState(initialPositions);
  // const [draggedIndex, setDraggedIndex] = useState(null);

  // const handlePointerDown = (index) => {
  //   setDraggedIndex(index);
  // };

  // const handlePointerUp = () => {
  //   setDraggedIndex(null);
  //   setPositions(initialPositions);
  // };

  // const handlePointerMove = (event) => {
  //   if (draggedIndex !== null) {
  //     const { x, y } = event.point;
  //     setPositions((prevPositions) =>
  //       prevPositions.map((pos, i) =>
  //         i === draggedIndex ? { ...pos, x, y } : pos
  //       )
  //     );
  //   }
  // };

  return (
    <>
      {images.map((texture, index) => (
        <DraggableImage
          key={index}
          texture={texture}
          position={initialPositions[index]}
          // onPointerDown={() => handlePointerDown(index)}
          // onPointerUp={handlePointerUp}
          // onPointerMove={handlePointerMove}
        />
      ))}
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

export default FloatingImages;
