import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Float = React.forwardRef(
  (
    {
      children,
      enabled = true,
      speed = 1,
      rotationIntensity = 1.1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      ...props
    },
    forwardRef
  ) => {
    const ref = React.useRef();
    React.useImperativeHandle(forwardRef, () => ref.current, []);
    const offset = React.useRef(Math.random() * 10000);
    useFrame((state) => {
      if (!enabled || speed === 0) return;
      const t = offset.current + state.clock.getElapsedTime();
      ref.current.rotation.x =
        (Math.cos((t / 4) * speed) / 8) * rotationIntensity;
      ref.current.rotation.y =
        (Math.sin((t / 4) * speed) / 8) * rotationIntensity;
      ref.current.rotation.z =
        (Math.sin((t / 4) * speed) / 20) * rotationIntensity;
      let yPosition = Math.sin((t / 4) * speed) / 10;
      yPosition = THREE.MathUtils.mapLinear(
        yPosition,
        -0.1,
        0.1,
        floatingRange?.[0] || -0.1,
        floatingRange?.[1] || 0.1
      );
      ref.current.position.y = yPosition * floatIntensity;
      ref.current.updateMatrix();
    });
    return (
      <group {...props}>
        <group ref={ref} matrixAutoUpdate={false}>
          {children}
        </group>
      </group>
    );
  }
);
