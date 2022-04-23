import * as THREE from "three";
import * as planeShader from "./shaders/planeShader";

export default class Plane {
  private mesh: THREE.Mesh;
  private a1: number;
  private a2: number;
  private ImageAspect: number;
  private material: THREE.ShaderMaterial;

  constructor() {
    const PlaneGeo = new THREE.PlaneGeometry(
      window.innerWidth * 1.5,
      window.innerHeight * 1.5,
      1,
      1
    );

    this.material = new THREE.ShaderMaterial({
      vertexShader: planeShader.vertex,
      fragmentShader: planeShader.fragment,
      uniforms: {
        // dT: { value: offsetTexture },
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
      },
    });

    this.mesh = new THREE.Mesh(PlaneGeo, this.material);
    this.mesh.position.z -= 250;

    this.ImageAspect = window.innerHeight / window.innerWidth;
    if (window.innerHeight / window.innerWidth > this.ImageAspect) {
      this.a1 = (window.innerWidth / window.innerHeight) * this.ImageAspect;
      this.a2 = 1;
    } else {
      this.a1 = 1;
      this.a2 = window.innerHeight / window.innerWidth / this.ImageAspect;
    }

    this.material.uniforms.resolution.value.x = window.innerWidth;
    this.material.uniforms.resolution.value.y = window.innerHeight;
    this.material.uniforms.resolution.value.z = this.a1;
    this.material.uniforms.resolution.value.w = this.a2;

    window.addEventListener("resize", this.onWindowResize.bind(this));

    this.render(0);
  }

  onWindowResize() {
    if (window.innerHeight / window.innerWidth > this.ImageAspect) {
      this.a1 = (window.innerWidth / window.innerHeight) * this.ImageAspect;
      this.a2 = 1;
    } else {
      this.a1 = 1;
      this.a2 = window.innerHeight / window.innerWidth / this.ImageAspect;
    }

    this.material.uniforms.resolution.value.x = window.innerWidth;
    this.material.uniforms.resolution.value.y = window.innerHeight;
    this.material.uniforms.resolution.value.z = this.a1;
    this.material.uniforms.resolution.value.w = this.a2;
  }
  getMesh() {
    return this.mesh;
  }

  render(time: number) {
    this.material.uniforms.time.value = time * 0.005;

    requestAnimationFrame(this.render.bind(this));
  }
}
