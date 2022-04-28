import * as THREE from "three";
import { torusMaterialLines } from "./shaders/torusMaterial lines";
import { Vector2 } from "three";

export default class Torus {
  private geo: THREE.TorusGeometry;
  private mat: torusMaterialLines;
  private mesh: THREE.Mesh;
  private dom: HTMLElement | null = null;
  private bounds: DOMRect | null = null;
  private entered: { value: boolean };

  constructor(camera: THREE.PerspectiveCamera, entered: { value: boolean }) {
    if (document.getElementById("donut") != null) {
      this.dom = document.getElementById("donut")!;
      this.bounds = this.dom.getBoundingClientRect();
    } else {
      console.log("donut wasn't found");
    }

    this.entered = entered;

    let s = 1;
    this.geo = new THREE.TorusGeometry(100 * s, 25 * s, 30, 100);

    this.mat = new torusMaterialLines();
    this.mat.side = THREE.DoubleSide;

    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.position.z = 0;
    this.mesh.rotation.x = (90 * Math.PI) / 180;
    this.mesh.rotation.z = (330 * Math.PI) / 180;
    let torusSize = new THREE.Vector3();
    this.mesh.geometry.computeBoundingBox();
    this.mesh.geometry.boundingBox?.getSize(torusSize);

    if (this.bounds != undefined) s = (this.bounds.width / torusSize.x) * 0.9;

    this.setMeshtoHtmlPos();
    camera.position.y = this.mesh.position.y;
    camera.position.z = this.mesh.position.z + 125 * s;
    // camera.fov =
    //   2 *
    //   Math.atan(window.innerHeight / 2 / camera.position.z) *
    //   (180 / Math.PI);

    this.mesh.scale.set(s, s, s);

    this.render(0);
  }

  getMesh() {
    return this.mesh;
  }

  setMeshtoHtmlSize() {
    if (this.bounds != undefined) {
      let meshSize = new THREE.Vector3();
      this.mesh.geometry.computeBoundingBox();
      this.mesh.geometry.boundingBox?.getSize(meshSize);
      this.mesh.scale.x = this.bounds.width / meshSize.x;
      this.mesh.scale.y = this.bounds.height / meshSize.y;
    } else {
      console.log("bounds are null");
    }
  }

  setMeshtoHtmlPos() {
    if (this.bounds != undefined) {
      this.mesh.position.y =
        window.innerHeight / 2 - this.bounds.top - this.bounds.height / 2;
      this.mesh.position.x =
        -(window.innerWidth / 2) + this.bounds.left + this.bounds.width / 2;
    } else {
      console.log("bounds is null");
    }
  }

  updateElem() {
    if (this.dom) this.bounds = this.dom.getBoundingClientRect();
    this.setMeshtoHtmlPos();
    this.setMeshtoHtmlSize();
  }

  render(time: number) {
    this.mat.uniforms["time"].value = time;

    if (this.entered.value) this.updateElem();

    requestAnimationFrame(this.render.bind(this));
  }
}
