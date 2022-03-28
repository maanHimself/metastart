import { customShader } from "../shaders/customShader";

export type elementType = {
  dom: HTMLDivElement;
  mesh: THREE.Mesh<THREE.PlaneGeometry, customShader>;
};

export type dimensionsType = { width: number; height: number };

export type mouseType = {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vX: number;
  vY: number;
  v: number;
  oldScroll: number;
  curScroll: number;
  scrollV: number;
};
