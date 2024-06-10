import { useState, createRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Nodes, Node } from "./Nodes";
import { useTexture } from "@react-three/drei";

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

const positions = [
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

const scales = [
  0.4, 0.65, 1.2, 0.9, 0.6, 0.6, 0.6, 0.45, 1.35, 0.7, 0.6, 1.3, 0.5, 1, 0.8, 1,
  1.3,
];

export default function FloatingImagesV5() {
  const images = useTexture(imagePaths);
  const [[a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q]] = useState(() =>
    [...Array(17)].map(createRef)
  );

  const refs = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q];

  return (
    <>
      <Nodes>
        {images.map((texture, i) => (
          <Node
            ref={refs[i]}
            name={i}
            color="#204090"
            position={positions[i]}
            connectedTo={[refs[i === images.length - 1 ? 0 : i + 1]]}
            image={texture}
            scale={scales[i]}
          />
        ))}

        {/* <Node
          ref={b}
          name="b"
          color="#904020"
          position={[2, -3, 0]}
          connectedTo={[c]}
        />
        <Node
          ref={c}
          name="c"
          color="#209040"
          position={[-0.25, 0, 0]}
          connectedTo={[d]}
        />
        <Node
          ref={d}
          name="d"
          color="#204090"
          position={[0.5, -0.75, 0]}
          connectedTo={[e]}
        />
        <Node
          ref={e}
          name="e"
          color="#204090"
          position={[-0.5, -1, 0]}
          connectedTo={[a]}
        /> */}
      </Nodes>
    </>
  );
}
