import * as THREE from "three";
import { boxMaterial } from "./shaders/Box/boxMaterial";
import { SolidMaterial } from "./shaders/Shape/SolidMaterial";
import { BoxBG } from "./shaders/Box/BoxBG";
import { Vector2 } from "three";

export default class Shape {
  private geo: THREE.PlaneGeometry;
  private centeredMat: boxMaterial;
  private redMat: SolidMaterial;
  private centeredMesh: THREE.Mesh;
  private rightMesh: THREE.Mesh;
  private group: THREE.Group;
  private mouse: any;
  private dom: HTMLElement | null = null;
  private bounds: DOMRect | null = null;

  constructor(mouse: any, id: string, src: string) {
    this.mouse = mouse;
    console.log(this.mouse);
    this.geo = new THREE.PlaneGeometry(500, 500, 1, 1);

    if (document.getElementById(id) != null) {
      this.dom = document.getElementById(id)!;
      this.bounds = this.dom.getBoundingClientRect();
      console.log(this.dom);
    } else {
      console.error("can't find ", id);
    }

    this.centeredMat = new boxMaterial();
    this.centeredMat.uniforms["t"].value = new THREE.TextureLoader().load(src);
    this.centeredMat.transparent = true;

    this.redMat = new SolidMaterial();
    this.redMat.uniforms["color"].value = new THREE.Color("#FF0052");
    this.redMat.uniforms["t"].value = new THREE.TextureLoader().load(src);
    this.redMat.transparent = true;

    this.centeredMesh = new THREE.Mesh(this.geo, this.centeredMat);
    this.rightMesh = new THREE.Mesh(this.geo, this.redMat);

    let offset = 5;

    //poisitioning

    this.rightMesh.translateX(offset);
    this.rightMesh.translateY(-offset);

    let zSpacing = -5;

    this.rightMesh.position.z = zSpacing * 1.2;

    this.group = new THREE.Group();
    this.group.add(this.centeredMesh);
    this.group.add(this.rightMesh);

    // this.setMeshtoHtmlPos();
    // this.setMeshtoHtmlSize();
    this.render(0);
  }

  getMesh() {
    return this.group;
  }

  setMeshtoHtmlSize() {
    if (this.bounds != undefined) {
      let meshSize = new THREE.Vector3();
      this.centeredMesh.geometry.computeBoundingBox();
      this.centeredMesh.geometry.boundingBox?.getSize(meshSize);
      this.group.scale.x = this.bounds.width / meshSize.x;
      this.group.scale.y = this.bounds.height / meshSize.y;
    } else {
      console.log("bounds are null");
    }
  }

  setMeshtoHtmlPos() {
    if (this.bounds != undefined) {
      this.group.position.y =
        window.innerHeight / 2 - this.bounds.top - this.bounds.height / 2;
      this.group.position.x =
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
    let mouse = new Vector2(this.mouse.x, this.mouse.y)
      .multiplyScalar(2)
      .addScalar(-1);

    let tilt = 0.1;

    // this.rightMesh.rotation.x = mouse.y * tilt;
    // this.rightMesh.rotation.y = mouse.x * tilt;

    // this.centeredMesh.rotation.x = mouse.y * tilt;
    // this.centeredMesh.rotation.y = mouse.x * tilt;

    this.redMat.uniforms["time"].value += 0.001;

    this.updateElem();

    requestAnimationFrame(this.render.bind(this));
  }
}
