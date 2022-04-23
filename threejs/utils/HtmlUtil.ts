import * as THREE from "three";
import { customShader } from "../shaders/customShader";

export function createThreeHtml(
  texturePath: string,
  transparent: boolean,
  id: string,
  scene: THREE.Scene
) {
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

  return {
    mesh: mesh,
    dom: dom,
  };
}

export function setMeshtoHtmlSize(
  mesh: THREE.Mesh,
  bounds: DOMRect | undefined
) {
  if (bounds != undefined) {
    let meshSize = new THREE.Vector3();
    mesh.geometry.computeBoundingBox();
    mesh.geometry.boundingBox?.getSize(meshSize);
    mesh.scale.x = bounds.width / meshSize.x;
    mesh.scale.y = bounds.height / meshSize.y;
  } else {
    console.log("bounds are null");
  }
}

export function setMeshtoHtmlPos(
  mesh: THREE.Mesh,
  bounds: DOMRect | undefined
) {
  if (bounds != undefined) {
    mesh.position.y = window.innerHeight / 2 - bounds.top - bounds.height / 2;
    mesh.position.x = -(window.innerWidth / 2) + bounds.left + bounds.width / 2;
  } else {
    console.log("bounds is null");
  }
}
