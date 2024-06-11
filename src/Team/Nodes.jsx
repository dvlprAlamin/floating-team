import * as THREE from "three";
import {
  createContext,
  useMemo,
  useRef,
  useState,
  useContext,
  useLayoutEffect,
  forwardRef,
  useEffect,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Center, QuadraticBezierLine, Text3D } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import { Float } from "./Float";
import * as TWEEN from "@tweenjs/tween.js";

const context = createContext();
const Circle = forwardRef(
  (
    {
      children,
      opacity = 1,
      radius = 0.05,
      segments = 32,
      color = "#ff1050",
      ...props
    },
    ref
  ) => (
    <mesh ref={ref} {...props}>
      <circleGeometry args={[radius, segments]} />
      <meshBasicMaterial
        transparent={opacity < 1}
        opacity={opacity}
        color={color}
      />
      {children}
    </mesh>
  )
);

export function Nodes({ children }) {
  const group = useRef();
  const [nodes, set] = useState([]);
  const lines = useMemo(() => {
    const lines = [];
    for (let node of nodes)
      node.connectedTo
        .map((ref) => [node.position, ref.current.position])
        .forEach(([start, end]) =>
          lines.push({
            start: start.clone().add({ x: 0, y: 0, z: -0.15 }),
            end: end.clone().add({ x: 0, y: 0, z: -0.15 }),
          })
        );
    return lines;
  }, [nodes]);
  useFrame((_, delta) => {
    group.current.children.forEach(
      (group) =>
        (group.children[0].material.uniforms.dashOffset.value -= delta * 10)
    );
  });

  return (
    <context.Provider value={set}>
      <group ref={group}>
        {lines.map((line, index) => (
          <group key={index}>
            <QuadraticBezierLine
              {...line}
              color="#54CF68"
              dashed
              dashScale={22}
              gapSize={3}
              lineWidth={2}
            />
            <QuadraticBezierLine
              {...line}
              color="#54CF68"
              lineWidth={2}
              transparent
              opacity={0.1}
            />
          </group>
        ))}
      </group>
      {children}
      {/* {lines.map(({ start, end }, index) => (
        <group key={index} position-z={1}>
          <Circle position={start} />
          <Circle position={end} />
        </group>
      ))} */}
    </context.Provider>
  );
}

export const Node = forwardRef(
  (
    {
      color = "black",
      name,
      connectedTo = [],
      position = [0, 0, 0],
      scale,
      image,
      ...props
    },
    ref
  ) => {
    const set = useContext(context);
    const { size, camera } = useThree();
    const [pos, setPos] = useState(() => new THREE.Vector3(...position));
    const [newScale, setNewScale] = useState(() => scale);
    const state = useMemo(
      () => ({ position: pos, connectedTo }),
      [pos, connectedTo]
    );
    // Register this node on mount, unregister on unmount
    useLayoutEffect(() => {
      set((nodes) => [...nodes, state]);
      return () => void set((nodes) => nodes.filter((n) => n !== state));
    }, [state, pos]);
    // Drag n drop, hover
    const [hovered, setHovered] = useState(false);
    useEffect(
      () => void (document.body.style.cursor = hovered ? "grab" : "auto"),
      [hovered]
    );
    // const bind = useDrag(({ down, xy: [x, y] }) => {
    //   document.body.style.cursor = down ? "grabbing" : "grab";
    //   if (!down) {
    //     setPos(new THREE.Vector3(...position));
    //     setNewScale(scale);
    //   } else {
    //     setPos(
    //       new THREE.Vector3(
    //         (x / size.width) * 2 - 1,
    //         -(y / size.height) * 2 + 1,
    //         0
    //       )
    //         .unproject(camera)
    //         .multiply({ x: 1, y: 1, z: 0 })
    //         .clone()
    //     );
    //     setNewScale(2);
    //   }
    // });
    const bind = useDrag(({ down, xy: [x, y] }) => {
      document.body.style.cursor = down ? "grabbing" : "grab";
      if (!down) {
        new TWEEN.Tween(pos)
          .to(new THREE.Vector3(...position), 1000)
          .easing(TWEEN.Easing.Elastic.Out)
          .onUpdate(() => setPos(pos.clone()))
          .start();
        new TWEEN.Tween(newScale)
          .to(scale, 500)
          .easing(TWEEN.Easing.Elastic.Out)
          .onUpdate(() => setNewScale(scale))
          .start();
      } else {
        setPos(
          new THREE.Vector3(
            (x / size.width) * 2 - 1,
            -(y / size.height) * 2 + 1,
            0
          )
            .unproject(camera)
            .multiply({ x: 1, y: 1, z: 0 })
            .clone()
        );
        new TWEEN.Tween(scale)
          .to(2, 500)
          .easing(TWEEN.Easing.Elastic.Out)
          .onUpdate(() => setNewScale(2))
          .start();
      }
    });

    useFrame(() => {
      TWEEN.update();
    });
    return (
      <>
        <Circle
          ref={ref}
          {...bind()}
          opacity={0.2}
          radius={0.5}
          color={color}
          position={pos}
          scale={newScale}
          {...props}
        >
          <Circle
            radius={0.25}
            position={[0, 0, 0.1]}
            onPointerOver={(event) => {
              event.stopPropagation();
              setHovered(true);
            }}
            onPointerOut={() => setHovered(false)}
            color={hovered ? "#ff1050" : color}
          >
            <Float>
              <group>
                {hovered ? (
                  <group position={[0, 0.75, 0.5]}>
                    <Center>
                      <Text3D
                        size={0.2}
                        height={0.2}
                        font={"/font.json"}
                        curveSegments={12}
                        bevelEnabled
                        bevelThickness={0.015}
                        bevelSize={0.015}
                        bevelOffset={0}
                        bevelSegments={5}
                        letterSpacing={0.035}
                      >
                        {name}
                        <meshNormalMaterial />
                      </Text3D>
                    </Center>
                  </group>
                ) : null}
                <mesh
                  position={[0, 0, 0.3]}
                  rotation={[Math.PI * 0.5, Math.PI * 0.5, 0.1]}
                >
                  <cylinderGeometry args={[0.5, 0.5, 0.2, 32, 1]} />
                  <meshBasicMaterial map={image} toneMapped={false} />
                </mesh>
              </group>
            </Float>
            {/* <Text position={[0, 0, 1]} fontSize={0.25}>
              {name}
            </Text> */}
          </Circle>
        </Circle>
      </>
    );
  }
);
