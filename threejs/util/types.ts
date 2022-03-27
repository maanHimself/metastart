import { customShader } from "../shaders/customShader";

export type elementType = {
  dom: HTMLDivElement;
  mesh: THREE.Mesh<THREE.PlaneGeometry, customShader>;
};

export type dimensionsType = { width: number; height: number };
