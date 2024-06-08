import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Image } from "@react-three/drei";
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";
import { easing } from "maath";

export const App = ({ data }) => (
  <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 30 }}>
    <Physics /*debug*/ interpolate timeStep={1 / 60} gravity={[0, 0, 0]}>
      {data.map((props, i) => (
        <Sphere key={i} {...props} />
      ))}
    </Physics>
  </Canvas>
);

function Sphere({ image, scale, text, vec = new THREE.Vector3(), ...props }) {
  const api = useRef();
  const [initialPos] = useState([
    THREE.MathUtils.randFloatSpread(10),
    THREE.MathUtils.randFloatSpread(10),
    0,
  ]);
  const [position] = useState(new THREE.Vector3());
  const [dragging, drag] = useState(false);
  useFrame((state, delta) => {
    api.current?.applyImpulse(
      vec
        .copy(api.current.translation())
        .negate()
        .multiplyScalar(scale * scale)
    );
    easing.damp3(
      position,
      [
        (state.pointer.x * state.viewport.width) / 2 - dragging.x,
        (state.pointer.y * state.viewport.height) / 2 - dragging.y,
        0,
      ],
      0.2,
      delta
    );
    api.current?.setNextKinematicTranslation(position);
  });
  return (
    <RigidBody
      ref={api}
      type={dragging ? "kinematicPosition" : "dynamic"}
      enabledRotations={[false, false, true]}
      enabledTranslations={[true, true, false]}
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={initialPos}
      scale={scale}
      colliders={false}
    >
      <BallCollider args={[1.1]} />
      <Float speed={2}>
        <mesh
          onPointerDown={(e) => (
            e.target.setPointerCapture(e.pointerId),
            drag(
              new THREE.Vector3().copy(e.point).sub(api.current.translation())
            )
          )}
          onPointerUp={(e) => (
            e.target.releasePointerCapture(e.pointerId), drag(false)
          )}
        >
          <circleGeometry args={[1, 64]} />
          <meshBasicMaterial {...props} />
          {/* {text && (
            <Text font="Inter-Regular.woff" letterSpacing={-0.05} position={[0, 0, 0.01]} fontSize={0.425} material-toneMapped={false}>
              {text}
            </Text>
          )} */}
        </mesh>
        <mesh scale={0.95} position={[0, 0, 0.01]}>
          <ringGeometry args={[0.9, 1, 64]} />
          <meshBasicMaterial color={dragging ? "orange" : "black"} />
        </mesh>
        <Image
          position={[0, 0, 0.01]}
          rotation={[0, 0, 0]}
          scale={1.2}
          radius={0.5}
          transparent
          toneMapped={false}
          url={image}
        />
      </Float>
    </RigidBody>
  );
}
