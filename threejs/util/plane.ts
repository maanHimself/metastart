import * as pixelShader from "../shaders/planeShader";
import * as THREE from "three";

export const createPlane = ({
  offsetTexture,
  planeGeo,
}: {
  offsetTexture: THREE.DataTexture;
  planeGeo: THREE.BufferGeometry;
}) => {
  const material = new THREE.ShaderMaterial({
    vertexShader: pixelShader.vertex,
    fragmentShader: pixelShader.fragment,
    uniforms: {
      vT: { value: new THREE.TextureLoader().load("/img.jpg") },
      dT: { value: offsetTexture },
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
    },
  });
  const plane = new THREE.Mesh(planeGeo, material);

  material.uniforms.resolution.value.x = window.innerWidth;
  material.uniforms.resolution.value.y = window.innerHeight;
  const { a1, a2 } = getImageAspect();
  material.uniforms.resolution.value.z = a1;
  material.uniforms.resolution.value.w = a2;

  return { plane, material };
};

export const getImageAspect = () => {
  let imageAspect = window.innerHeight / window.innerWidth;
  let a1, a2;
  if (window.innerHeight / window.innerWidth > imageAspect) {
    a1 = (window.innerWidth / window.innerHeight) * imageAspect;
    a2 = 1;
  } else {
    a1 = 1;
    a2 = window.innerHeight / window.innerWidth / imageAspect;
  }
  return { imageAspect, a1, a2 };
};
