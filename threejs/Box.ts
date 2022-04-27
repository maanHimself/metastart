import * as THREE from "three";
import { boxMaterial } from "./shaders/Box/boxMaterial";
import { SolidMaterial } from "./shaders/Box/SolidMaterial";
import { BoxBG } from "./shaders/Box/BoxBG";
import { Vector2 } from "three";

export default class Box {
  private geo: THREE.PlaneGeometry;
  private centeredMat: boxMaterial;
  private cyanMat: SolidMaterial;
  private redMat: SolidMaterial;
  private bgMat: BoxBG;
  private centeredMesh: THREE.Mesh;
  private leftMesh: THREE.Mesh;
  private rightMesh: THREE.Mesh;
  private bgMesh: THREE.Mesh;
  private group: THREE.Group;
  private mouse: any;
  private dom: HTMLElement | null = null;
  private bounds: DOMRect | null = null;
  private hover: boolean;
  private progress = 0;

  constructor(
    mouse: any,
    id: string,
    src1: string,
    src2: string,
    src3: string
  ) {
    this.mouse = mouse;
    this.hover = false;
    this.geo = new THREE.PlaneGeometry(500, 500, 1, 1);

    if (document.getElementById(id) != null) {
      this.dom = document.getElementById(id)!;
      this.bounds = this.dom.getBoundingClientRect();
      this.dom.onmouseenter = this.onMouseEneter.bind(this);
      this.dom.onmouseleave = this.onMouseLeave.bind(this);
    } else {
      console.error("can't find ", id);
    }

    this.centeredMat = new boxMaterial();
    this.centeredMat.uniforms["t"].value = new THREE.TextureLoader().load(src1);
    this.centeredMat.transparent = true;

    this.cyanMat = new SolidMaterial();
    this.cyanMat.uniforms["color"].value = new THREE.Color("#00FEEC");
    this.cyanMat.transparent = true;

    this.redMat = new SolidMaterial();
    this.redMat.uniforms["color"].value = new THREE.Color("#FF0052");
    this.redMat.transparent = true;
    this.bgMat = new BoxBG();
    this.bgMat.uniforms["t1"].value = new THREE.TextureLoader().load(src2);
    this.bgMat.uniforms["t2"].value = new THREE.TextureLoader().load(src3);

    this.bgMat.uniforms["mouse"].value = new Vector2(
      this.mouse.x,
      this.mouse.y
    );

    this.centeredMesh = new THREE.Mesh(this.geo, this.centeredMat);
    this.bgMesh = new THREE.Mesh(this.geo, this.bgMat);
    this.leftMesh = new THREE.Mesh(this.geo, this.cyanMat);
    this.rightMesh = new THREE.Mesh(this.geo, this.redMat);

    let offset = 30;

    // scaling
    this.centeredMesh.scale.set(0.8, 0.8, 0.8);
    //poisitioning
    this.leftMesh.translateX(-offset);
    this.leftMesh.translateY(offset);
    this.rightMesh.translateX(offset);
    this.rightMesh.translateY(-offset);

    let zSpacing = -50;
    this.bgMesh.position.z = zSpacing;
    this.leftMesh.position.z = zSpacing * 1.2;
    this.rightMesh.position.z = zSpacing * 1.2;

    this.group = new THREE.Group();
    this.group.add(this.centeredMesh);
    this.group.add(this.leftMesh);
    this.group.add(this.rightMesh);
    this.group.add(this.bgMesh);

    this.render(0);
  }

  onMouseEneter() {
    this.hover = true;
  }
  onMouseLeave() {
    this.hover = false;
  }

  getMesh() {
    return this.group;
  }

  setMeshtoHtmlSize() {
    if (this.bounds != undefined) {
      let meshSize = new THREE.Vector3();
      this.bgMesh.geometry.computeBoundingBox();
      this.bgMesh.geometry.boundingBox?.getSize(meshSize);
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
    if (this.hover) {
      this.progress = Math.min(1, this.progress + 0.05);
    } else {
      this.progress = Math.max(0, this.progress - 0.05);
    }

    this.bgMat.uniforms["progress"].value = this.progress;
    let mouse = new Vector2(this.mouse.x, this.mouse.y)
      .multiplyScalar(2)
      .addScalar(-1);

    let tilt = 0.08;

    this.bgMesh.rotation.x = mouse.y * tilt;
    this.bgMesh.rotation.y = mouse.x * tilt;

    this.bgMat.uniforms["mouse"].value = mouse;

    this.leftMesh.rotation.x = mouse.y * tilt;
    this.leftMesh.rotation.y = mouse.x * tilt;

    this.rightMesh.rotation.x = mouse.y * tilt;
    this.rightMesh.rotation.y = mouse.x * tilt;

    this.centeredMesh.rotation.x = -mouse.y * tilt * 2;
    this.centeredMesh.rotation.y = -mouse.x * tilt * 2;

    this.bgMat.uniforms["time"].value += 0.005;
    this.redMat.uniforms["time"].value += 0.005;
    this.cyanMat.uniforms["time"].value += 0.005;

    this.updateElem();

    requestAnimationFrame(this.render.bind(this));
  }
}
