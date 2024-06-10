import React, { useRef, useState } from "react";

export default function DraggableMesh({ position, color, initialPosition }) {
  const meshRef = useRef();
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e) => {
    e.stopPropagation();
    setDragging(true);
    meshRef.current.material.color.set(0xff0000); // Change color on drag start
  };

  const onPointerMove = (e) => {
    if (dragging) {
      e.stopPropagation();
      const [x, y] = e.unprojectedPoint.toArray();
      meshRef.current.position.x = x;
      meshRef.current.position.y = y;
    }
  };

  const onPointerUp = (e) => {
    e.stopPropagation();
    setDragging(false);
    meshRef.current.material.color.set(color); // Reset color
    meshRef.current.position.set(...initialPosition); // Reset to initial position
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerUp} // Reset when pointer leaves the mesh
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
