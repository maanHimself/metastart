import * as THREE from "three";

export const createRenderer = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1);
  renderer.outputEncoding = THREE.sRGBEncoding;
  return renderer;
};
