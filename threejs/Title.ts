import * as THREE from "three";
import { SolidMaterial } from "./shaders/Box/SolidMaterial";
import { TitelMaterial } from "./shaders/Box/TitelMaterial";
import { Vector2 } from "three";

export default class Title {
  private geo: THREE.PlaneGeometry;
  private cyanMat: TitelMaterial;
  private redMat: SolidMaterial;
  private leftMesh: THREE.Mesh;
  private rightMesh: THREE.Mesh;
  private group: THREE.Group;
  private mouse: any;
  private dom: HTMLElement | null = null;
  private bounds: DOMRect | null = null;
  private hover: boolean;
  private progress = 0;

  constructor(mouse: any, id: string) {
    this.mouse = mouse;
    this.hover = false;
    console.log(this.mouse);
    this.geo = new THREE.PlaneGeometry(500, 500, 1, 1);

    if (document.getElementById(id) != null) {
      this.dom = document.getElementById(id)!;
      this.bounds = this.dom.getBoundingClientRect();
      this.dom.onmouseenter = this.onMouseEneter.bind(this);
      this.dom.onmouseleave = this.onMouseLeave.bind(this);
    } else {
      console.error("can't find ", id);
    }

    this.cyanMat = new TitelMaterial();
    this.cyanMat.uniforms["color"].value = new THREE.Color("#00FEEC");
    this.cyanMat.transparent = true;

    this.redMat = new TitelMaterial();
    this.redMat.uniforms["color"].value = new THREE.Color("#FF0052");
    this.redMat.transparent = true;

    this.leftMesh = new THREE.Mesh(this.geo, this.cyanMat);
    this.rightMesh = new THREE.Mesh(this.geo, this.redMat);

    let offset = 30;

    // scaling
    //poisitioning

    this.rightMesh.translateX(offset);
    this.rightMesh.translateY(-offset);

    this.leftMesh.position.z = 0;
    this.rightMesh.position.z = -1;

    this.group = new THREE.Group();
    this.group.add(this.leftMesh);
    this.group.add(this.rightMesh);

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
      this.leftMesh.geometry.computeBoundingBox();
      this.leftMesh.geometry.boundingBox?.getSize(meshSize);
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

    let mouse = new Vector2(this.mouse.x, this.mouse.y)
      .multiplyScalar(2)
      .addScalar(-1);

    let tilt = 0.1;

    this.leftMesh.rotation.x = mouse.y * tilt;
    this.leftMesh.rotation.y = mouse.x * tilt;

    this.rightMesh.rotation.x = mouse.y * tilt;
    this.rightMesh.rotation.y = mouse.x * tilt;

    this.redMat.uniforms["time"].value += 0.005;
    this.cyanMat.uniforms["time"].value += 0.005;

    this.updateElem();

    requestAnimationFrame(this.render.bind(this));
  }
}
