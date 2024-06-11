import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
const MapParticles = () => {
  const mapTexture = useTexture("/bd-map.png");
  const particlesMaterial = new THREE.ShaderMaterial({
    vertexShader: `



        // uniform float uTime;
        uniform vec2 uResolution;
        uniform sampler2D uPictureTexture;
        uniform vec3 uMouse;
        varying vec3 vPosition;
        varying vec3 vColor;
        void main() {
          vPosition = position;

        // Final position
        vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;

        // Picture
        float pictureIntensity = texture(uPictureTexture, uv).r;


        // Point size
        gl_PointSize = 3.5 * pictureIntensity * uResolution.y;
        gl_PointSize *= (1.0 / - viewPosition.z);
        //   gl_PointSize = 4.0;
        //   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vColor = vec3(pow(pictureIntensity, 1.0));
        }







        
        
        // uniform vec2 uMouse;
        // varying vec3 vColor;
        // varying vec2 vMouse;
        // varying vec3 vPosition;
        // void main()
        // {
        //     // Displacement
        //     vec3 newPosition = position;


        //     // Final position
        //     vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
        //     vec4 viewPosition = viewMatrix * modelPosition;
        //     vec4 projectedPosition = projectionMatrix * viewPosition;
        //     gl_Position = projectedPosition;

        //     // Picture
        //     float pictureIntensity = texture(uPictureTexture, uv).r;

        //     // Point size
        //     gl_PointSize = 3.5 * pictureIntensity * uResolution.y;
        //     gl_PointSize *= (1.0 / - viewPosition.z);

        //     // Varyings
        //     vColor = vec3(pow(pictureIntensity, 1.0));
        //     vMouse = uMouse;
        //     vPosition = position;
        // }
        `,
    fragmentShader: `

        varying vec3 vPosition;
        uniform vec3 uMouse;
        void main() {
          float distance = length(vPosition.xy - uMouse.xy);
          vec3 color = vec3(0.8, 0.0, 0.8);
          if (distance < 1.0) {
            color = vec3(0.0, 1.0, 0.0);
          }
          gl_FragColor = vec4(color, 1.0);
        }

        // varying vec3 vColor;
        // varying vec2 vMouse;
        // varying vec3 vPosition;
        // void main()
        // {
        //     // vec2 uv = gl_PointCoord;
        //     float distanceToCenter = length(vPosition.xy - vMouse.xy);
        //     vec3 color = vec3(0.0, 0.0, 0.0);
        //     if(distanceToCenter < 0.5){
        //         color = vec3(0.0, 1.0, 0.0);
        //     }
            

        //     gl_FragColor = vec4(color, 1.0);


        //     // float distance = length(vPosition.xy - uHover.xy);
        //     // vec3 color = vec3(0.8, 0.0, 0.8);
        //     // if (distance < 5.0) {
        //     //     color = vec3(0.0, 1.0, 0.0);
        //     // }
        //     // gl_FragColor = vec4(color, 0.4);

        // }
            `,
    uniforms: {
      uResolution: new THREE.Uniform(new THREE.Vector2(10, 10)),
      uPictureTexture: new THREE.Uniform(mapTexture),
      uMouse: new THREE.Uniform(new THREE.Vector3()),
      // uDisplacementTexture: new THREE.Uniform(displacement.texture)
    },
    blending: THREE.AdditiveBlending,
    transparent: true,
  });

  useFrame(({ pointer }) => {
    particlesMaterial.uniforms.uMouse.value = new THREE.Vector3(
      pointer.x,
      pointer.y,
      0
    );
  });
  return (
    <points material={particlesMaterial}>
      <planeGeometry
        deleteAttribute={["normal"]}
        setIndex={null}
        args={[10, 10, 128, 128]}
      />
    </points>
  );
};

export default MapParticles;
