import * as THREE from "three";
import { ShapeMaterial } from "./shaders/Shape/ShapeMaterial";
import { SolidMaterial } from "./shaders/Shape/SolidMaterial";
import { Vector2 } from "three";

export default class Shape {
  private geo: THREE.PlaneGeometry;
  private centeredMat: ShapeMaterial;
  private redMat: SolidMaterial;
  private centeredMesh: THREE.Mesh;
  private rightMesh: THREE.Mesh;
  private group: THREE.Group;
  private mouse: any;
  private dom: HTMLElement | null = null;
  private bounds: DOMRect | null = null;
  private hover = false;
  private inView = false;
  private hoverable;
  private progress = 0;

  constructor(
    mouse: any,
    id: string,
    src1: string,
    src2: string | null,
    hoverable: boolean
  ) {
    this.mouse = mouse;
    this.hoverable = hoverable;
    this.geo = new THREE.PlaneGeometry(500, 500, 1, 1);

    if (document.getElementById(id) != null) {
      this.dom = document.getElementById(id)!;
      this.bounds = this.dom.getBoundingClientRect();
      this.dom.onmouseenter = this.onMouseEneter.bind(this);
      this.dom.onmouseleave = this.onMouseLeave.bind(this);
    } else {
      console.error("can't find ", id);
    }

    this.centeredMat = new ShapeMaterial();
    this.centeredMat.uniforms["t1"].value = new THREE.TextureLoader().load(
      src1
    );
    this.centeredMat.uniforms["t2"].value = new THREE.TextureLoader().load(
      src2!
    );
    this.centeredMat.transparent = true;

    this.redMat = new SolidMaterial();
    this.redMat.uniforms["color"].value = new THREE.Color("#000000");
    this.redMat.uniforms["t"].value = new THREE.TextureLoader().load(src1);
    this.redMat.transparent = true;

    this.centeredMesh = new THREE.Mesh(this.geo, this.centeredMat);
    this.rightMesh = new THREE.Mesh(this.geo, this.redMat);

    let offset = 5;

    //poisitioning

    // this.rightMesh.translateX(offset);
    // this.rightMesh.translateY(-offset);

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

  onMouseEneter() {
    if (this.hoverable) this.hover = true;
  }
  onMouseLeave() {
    if (this.hoverable) this.hover = false;
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

    this.centeredMat.uniforms["progress"].value = this.progress;
    this.centeredMat.uniforms["time"].value = time;

    if (this.bounds)
      if (
        this.bounds.top < window.innerHeight * 0.9 &&
        this.bounds.top > window.innerHeight * 0.05
      ) {
        this.hover = true;
        this.inView = true;
      } else if (this.inView) {
        this.inView = false;
        this.hover = false;
      }

    this.redMat.uniforms["time"].value += 0.001;

    this.updateElem();

    requestAnimationFrame(this.render.bind(this));
  }
}
