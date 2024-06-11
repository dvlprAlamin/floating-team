import * as THREE from "three";
import { extend } from "@react-three/fiber";

class CustomPointsMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uHover: { value: new THREE.Vector3() },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec3 uHover;
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_PointSize = 4.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        uniform vec3 uHover;
        void main() {
          float distance = length(vPosition.xy - uHover.xy);
          vec3 color = vec3(0.8, 0.0, 0.8);
          if (distance < 5.0) {
            color = vec3(0.0, 1.0, 0.0);
          }
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }
}

extend({ CustomPointsMaterial });
