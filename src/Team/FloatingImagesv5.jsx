import { useState, createRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Nodes, Node } from "./Nodes";
import { useTexture } from "@react-three/drei";

const teamMemberData = [
  {
    name: "Abu Sufian",
    image: "/team-members/Abu_Sufian.jpg",
  },
  {
    name: "Mridul Das",
    image: "/team-members/Mridul-Das.png",
  },
  {
    name: "Alamin Howlader",
    image: "/team-members/alamin_bro.jpg",
  },
  {
    name: "Anwar",
    image: "/team-members/anwar.jpg",
  },
  {
    name: "Jhankar Mahbub",
    image: "/team-members/jhankar-mahbub.jpg",
  },
  {
    name: "Rasel Ahmed",
    image: "/team-members/rasel.jpg",
  },
  {
    name: "Fardin Amin",
    image: "/team-members/Fardin_Amin_Arpon.jpg",
  },
  {
    name: "Awlad Hossain",
    image: "/team-members/Awlad_Hossain.webp",
  },
  {
    name: "Abul Hashem",
    image: "/team-members/Abul_Hashem_Mohon.webp",
  },
  {
    name: "Asif Mohammed",
    image: "/team-members/Asif_Mohammed_Sifat.png",
  },
  {
    name: "Azizul Islam",
    image: "/team-members/Azizul_Islam_Milton.jpg",
  },
  {
    name: "Emdadul Hoque",
    image: "/team-members/Emdadul_Hoque_Tareque.jpg",
  },
  {
    name: "Israfil Hossen",
    image: "/team-members/israfil.jpg",
  },
  {
    name: "Saiful Islam",
    image: "/team-members/Saiful_Islam_Sojib.jpg",
  },
  {
    name: "Muktadir Hasan",
    image: "/team-members/Muktadir-tamim.webp",
  },
  {
    name: "Zahid Hossain",
    image: "/team-members/Md.-Zahid-Hossain.jpg",
  },
  {
    name: "Farhan Elias",
    image: "/team-members/Farhan-Elias.jpeg",
  },
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
  0.4, 0.65, 1.2, 0.9, 0.6, 0.6, 0.6, 0.5, 1.35, 0.7, 0.6, 1.3, 0.5, 1, 0.8, 1,
  1.3,
];

export default function FloatingImagesV5() {
  const images = useTexture(teamMemberData.map(({ image }) => image));
  const [[a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q]] = useState(() =>
    [...Array(17)].map(createRef)
  );

  const refs = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q];

  return (
    <>
      <Nodes>
        {images.map((texture, i) => (
          <Node
            key={i}
            ref={refs[i]}
            name={teamMemberData[i].name}
            color="#204090"
            position={positions[i]}
            connectedTo={[refs[i === images.length - 1 ? 0 : i + 1]]}
            image={texture}
            scale={scales[i]}
          />
        ))}
      </Nodes>
    </>
  );
}
