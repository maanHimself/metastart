import * as THREE from "three";

export const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    100,
    2000
  );
  camera.position.set(0, 0, 600);

  camera.fov =
    2 * Math.atan(window.innerHeight / 2 / camera.position.z) * (180 / Math.PI);

  return camera;
};
