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

  constructor(mouse: any) {
    this.mouse = mouse;
    this.geo = new THREE.PlaneGeometry(500, 500, 1, 1);

    this.centeredMat = new boxMaterial();
    this.centeredMat.uniforms["t"].value = new THREE.TextureLoader().load(
      "/donut.png"
    );
    this.centeredMat.transparent = true;

    this.cyanMat = new SolidMaterial();
    this.cyanMat.uniforms["color"].value = new THREE.Color("#00FEEC");
    this.cyanMat.transparent = true;

    this.redMat = new SolidMaterial();
    this.redMat.uniforms["color"].value = new THREE.Color("#FF0052");
    this.redMat.transparent = true;
    this.bgMat = new BoxBG();
    this.bgMat.uniforms["t"].value = new THREE.TextureLoader().load(
      "/retro.jpg"
    );

    this.bgMat.uniforms["mouse"].value = new Vector2(
      this.mouse.x,
      this.mouse.y
    );
    this.centeredMat.uniforms["mouse"].value = new Vector2(
      this.mouse.x,
      this.mouse.y
    );
    this.redMat.uniforms["mouse"].value = new Vector2(
      this.mouse.x,
      this.mouse.y
    );
    this.cyanMat.uniforms["mouse"].value = new Vector2(
      this.mouse.x,
      this.mouse.y
    );

    this.centeredMesh = new THREE.Mesh(this.geo, this.centeredMat);
    this.bgMesh = new THREE.Mesh(this.geo, this.bgMat);
    this.leftMesh = new THREE.Mesh(this.geo, this.cyanMat);
    this.rightMesh = new THREE.Mesh(this.geo, this.redMat);

    let offset = 50;

    // scaling
    this.centeredMesh.scale.set(0.5, 0.5, 0.5);
    //poisitioning
    this.leftMesh.translateX(-offset);
    this.leftMesh.translateY(offset);
    this.rightMesh.translateX(offset);
    this.rightMesh.translateY(-offset);

    let zSpacing = -100;
    this.bgMesh.position.z = zSpacing;
    this.leftMesh.position.z = zSpacing * 2;
    this.rightMesh.position.z = zSpacing * 2;

    this.group = new THREE.Group();
    this.group.add(this.centeredMesh);
    this.group.add(this.leftMesh);
    this.group.add(this.rightMesh);
    this.group.add(this.bgMesh);
    this.render(0);
  }

  getMesh() {
    return this.group;
  }

  render(time: number) {
    this.bgMat.uniforms["mouse"].value = new Vector2(
      this.mouse.x * 2 - 1,
      this.mouse.y * 2 - 1
    );
    this.centeredMat.uniforms["mouse"].value = new Vector2(
      -this.mouse.x * 2 - 1,
      -this.mouse.y * 2 - 1
    );
    this.redMat.uniforms["mouse"].value = new Vector2(
      this.mouse.x,
      this.mouse.y
    );
    this.cyanMat.uniforms["mouse"].value = new Vector2(
      this.mouse.x,
      this.mouse.y
    );
    this.bgMat.uniforms["time"].value += 0.005;
    this.redMat.uniforms["time"].value += 0.005;
    this.cyanMat.uniforms["time"].value += 0.005;
    requestAnimationFrame(this.render.bind(this));
  }
}
