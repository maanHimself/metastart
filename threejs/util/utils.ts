import * as THREE from "three";
import { customShader } from "../shaders/customShader";
import { elementType } from "./types";

export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export function updateElements({ elements }: { elements: any }) {
  elements.forEach((elem: any) => {
    setMeshtoHtmlPos(elem.mesh, elem.dom.getBoundingClientRect());
    setMeshtoHtmlSize(elem.mesh, elem.dom.getBoundingClientRect());
  });
}

export function setMeshtoHtmlPos(
  mesh: THREE.Mesh,
  bounds: DOMRect | undefined
) {
  if (!bounds) {
    console.log("bounds is null");
    return;
  }
  mesh.position.y = window.innerHeight / 2 - bounds.top - bounds.height / 2;
  mesh.position.x = -(window.innerWidth / 2) + bounds.left + bounds.width / 2;
}

export function setMeshtoHtmlSize(
  mesh: THREE.Mesh,
  bounds: DOMRect | undefined
) {
  if (!bounds) {
    console.log("bounds is null");
    return;
  }
  let meshSize = new THREE.Vector3();
  mesh.geometry.computeBoundingBox();
  mesh.geometry.boundingBox?.getSize(meshSize);
  mesh.scale.x = bounds.width / meshSize.x;
  mesh.scale.y = bounds.height / meshSize.y;
}

export function createThreeHtml({
  texturePath,
  transparent,
  id,
  scene,
  elements,
}: {
  texturePath: string;
  transparent: boolean;
  id: string;
  scene: THREE.Scene;
  elements: elementType[];
}) {
  const geo = new THREE.PlaneGeometry(150, 100, 1, 1);
  const material = new customShader();
  material.uniforms.t.value = new THREE.TextureLoader().load(texturePath);
  material.transparent = transparent;
  const mesh = new THREE.Mesh(geo, material);
  scene.add(mesh);

  let dom = document.getElementById(id);
  let bounds = dom?.getBoundingClientRect();

  setMeshtoHtmlPos(mesh, bounds);
  setMeshtoHtmlSize(mesh, bounds);

  elements.push({
    mesh: mesh,
    dom: dom as any,
  });
}
