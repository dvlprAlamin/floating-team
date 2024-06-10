// Node.js
import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
const Node = ({ url, position, label }) => {
  const texture = useLoader(TextureLoader, url);

  return (
    <group position={position}>
      <mesh>
        <circleGeometry attach="geometry" args={[0.5, 32]} />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
      {/* {label && (
        <mesh position={[0, -0.7, 0]}>
          <textGeometry
            attach="geometry"
            args={[label, { size: 0.2, height: 0.1 }]}
          />
          <meshBasicMaterial attach="material" color="white" />
        </mesh>
      )} */}
    </group>
  );
};

// Line.js

const Line = ({ start, end }) => {
  const points = [start, end].map((p) => new THREE.Vector3(...p));

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line>
      <primitive attach="geometry" object={lineGeometry} />
      <lineBasicMaterial attach="material" color="lightgreen" />
    </line>
  );
};

// generateNetwork.js
export const generateNetwork = (count, areaSize) => {
  const nodes = [];
  const links = [];

  // Generate nodes
  for (let i = 0; i < count; i++) {
    const position = [
      (Math.random() - 0.5) * areaSize,
      (Math.random() - 0.5) * areaSize,
      0,
    ];
    nodes.push({ id: i, position });
  }

  // Generate links (random connections)
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      if (Math.random() > 0.8) {
        // 20% chance to connect two nodes
        links.push({ source: i, target: j });
      }
    }
  }

  return { nodes, links };
};

const FloatingImagesV3 = () => {
  const { nodes, links } = generateNetwork(17, 10);
  return (
    <>
      {nodes.map((node) => (
        <Node
          key={node.id}
          url={"/team-members/alamin_bro.jpg"}
          position={node.position}
          label={`Node ${node.id}`}
        />
      ))}
      {links.map((link, index) => (
        <Line
          key={index}
          start={nodes[link.source].position}
          end={nodes[link.target].position}
        />
      ))}
    </>
  );
};

export default FloatingImagesV3;
