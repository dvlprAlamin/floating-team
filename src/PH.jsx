import React, { useMemo } from "react";
import { Sphere } from "./App";
import DraggableMesh from "./DraggableMesh";

const PH = () => {
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
    <group position={[-15, -15, 0]}>
      <Letter positions={letterPPositions} />
      <Letter positions={letterHPositions} />
    </group>
  );
};

export default PH;

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

function Letter({ positions }) {
  return (
    <>
      {positions.map((pos, index) => (
        <>
          {/* <mesh key={index} position={pos}>
            <boxGeometry args={[0.05, 0.05, 0.05]} />
            <meshStandardMaterial color="blue" />
          </mesh> */}
          {/* <Sphere
            image={"/team-members/alamin_bro.jpg"}
            scale={0.8}
            key={index}
            position={pos}
          /> */}
          <DraggableMesh
            key={index}
            position={pos}
            color={"gray"}
            initialPosition={pos}
          />
        </>
      ))}
    </>
  );
}

// function LetterH({ positions }) {
//   return (
//     <>
//       {positions.map((pos, index) => (
//         // <mesh key={index} position={pos}>
//         //   <boxGeometry args={[0.05, 0.05, 0.05]} />
//         //   <meshStandardMaterial color="red" />
//         // </mesh>
//         <Sphere
//           image={"/team-members/alamin_bro.jpg"}
//           scale={0.8}
//           key={index}
//           position={pos}
//         />
//       ))}
//     </>
//   );
// }
