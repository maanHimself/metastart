import * as THREE from "three";
import * as pixelShader from "./shaders/planeShader";
import { clamp } from "three/src/math/MathUtils";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { basicShader } from "./shaders/basicShader";
import { customShader } from "./shaders/customShader";

export default (canvas: any) => {
  const scene = new THREE.Scene();

  const container = canvas;
  let width = container.offsetWidth;
  let height = container.offsetHeight;
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1);
  renderer.outputEncoding = THREE.sRGBEncoding;

  container.appendChild(renderer.domElement);
  const composer = new EffectComposer(renderer);
  const effect1 = new ShaderPass(basicShader);

  const elems: any[] = [];

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    100,
    2000
  );
  camera.position.set(0, 0, 600);

  camera.fov =
    2 * Math.atan(window.innerHeight / 2 / camera.position.z) * (180 / Math.PI);
  let mouse = {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    vX: 0,
    vY: 0,
    v: 0,
    oldScroll: 0,
    curScroll: 0,
    scrollV: 0,
  };

  let time = 0;

  //end setup

  let size = 64;

  let offsetWidth = size;
  let offsetHeight = size;
  let offsetSize = offsetHeight * offsetWidth;

  let offsetArray = new Float32Array(offsetSize * 4);

  for (let i = 0; i < offsetSize; i++) {
    let stride = i * 4;
    let r = Math.random() * 1 * 2 - 1;
    let r2 = Math.random() * 1 * 2 - 1;
    offsetArray[stride] = r;
    offsetArray[stride + 1] = r2;
    offsetArray[stride + 2] = r;
    offsetArray[stride + 3] = r;
  }

  let offsetTexture = new THREE.DataTexture(
    offsetArray,
    offsetWidth,
    offsetHeight,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  offsetTexture.magFilter = offsetTexture.minFilter = THREE.NearestFilter;

  const PlaneGeo = new THREE.PlaneGeometry(
    window.innerWidth,
    window.innerHeight,
    1,
    1
  );

  const material = new THREE.ShaderMaterial({
    vertexShader: pixelShader.vertex,
    fragmentShader: pixelShader.fragment,
    uniforms: {
      vT: { value: new THREE.TextureLoader().load("/img.jpg") },
      dT: { value: offsetTexture },
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
    },
  });
  const plane = new THREE.Mesh(PlaneGeo, material);
  scene.add(plane);

  let ImageAspect = window.innerHeight / window.innerWidth;
  let a1, a2;
  if (window.innerHeight / window.innerWidth > ImageAspect) {
    a1 = (window.innerWidth / window.innerHeight) * ImageAspect;
    a2 = 1;
  } else {
    a1 = 1;
    a2 = window.innerHeight / window.innerWidth / ImageAspect;
  }

  material.uniforms.resolution.value.x = window.innerWidth;
  material.uniforms.resolution.value.y = window.innerHeight;
  material.uniforms.resolution.value.z = a1;
  material.uniforms.resolution.value.w = a2;

  createThreeHtml("/logo.png", true, "logo");
  createThreeHtml("/goal.png", true, "goal");
  createThreeHtml("/vision.png", true, "vision");
  createThreeHtml("/team1.png", true, "team1");
  createThreeHtml("/team2.png", true, "team2");
  createThreeHtml("/team3.png", true, "team3");
  createThreeHtml("/team4.png", true, "team4");
  createThreeHtml("/team5.png", true, "team5");

  // end adding objects

  setupListeners();
  onWindowResize();
  postProcessing();
  render(0);
  //  settings();

  function settings() {
    let settings = {
      progress: 0,
    };
    //  gui = new dat.GUI();
    //  gui.add( settings, "progress", 0, 1, 0.01);
  }

  function setupListeners() {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("touchmove", onMouseMove);
    window.addEventListener("resize", onWindowResize);
  }
  function onScroll(e: Event) {
    mouse.curScroll =
      ((document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight)) *
      100;

    // if (mouse.curScroll > mouse.oldScroll) {
    //   let data = offsetTexture.image.data;
    //   for (
    //     let i = size * size * 4 - size * 4 * 20;
    //     i < size * size * 4;
    //     i += 4
    //   ) {
    //     let r = Math.random() * 0.1 * 2 - 0.1;
    //     let r2 = Math.random() * 0.01 * (20 - i / (size * 4 * 20));
    //     data[i] = 0;
    //     data[i + 1] = r2;
    //   }
    // }

    mouse.scrollV = mouse.curScroll - mouse.oldScroll;

    mouse.oldScroll = mouse.curScroll;
  }

  function onWindowResize() {
    width = container.offsetWidth;
    height = container.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerHeight / window.innerWidth > ImageAspect) {
      a1 = (window.innerWidth / window.innerHeight) * ImageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = window.innerHeight / window.innerWidth / ImageAspect;
    }

    material.uniforms.resolution.value.x = window.innerWidth;
    material.uniforms.resolution.value.y = window.innerHeight;
    material.uniforms.resolution.value.z = a1;
    material.uniforms.resolution.value.w = a2;

    // render();
  }

  function createThreeHtml(
    texturePath: string,
    transparent: boolean,
    id: string
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

    elems.push({
      mesh: mesh,
      dom: dom,
    });
  }

  function setMeshtoHtmlSize(mesh: THREE.Mesh, bounds: DOMRect | undefined) {
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

  function setMeshtoHtmlPos(mesh: THREE.Mesh, bounds: DOMRect | undefined) {
    if (bounds != undefined) {
      mesh.position.y = window.innerHeight / 2 - bounds.top - bounds.height / 2;
      mesh.position.x =
        -(window.innerWidth / 2) + bounds.left + bounds.width / 2;
    } else {
      console.log("bounds is null");
    }
  }

  function onMouseMove(e: MouseEvent | TouchEvent) {
    if (e instanceof MouseEvent && window.innerWidth > 768) {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    } else {
      // mouse.x = e.touches.item(0)!.clientX / window.innerWidth;
      // mouse.y = e.touches.item(0)!.clientY / window.innerHeight;
      return;
    }

    mouse.vX = mouse.x - mouse.prevX;
    mouse.vY = mouse.y - mouse.prevY;
    mouse.v = Math.sqrt(mouse.vX ** 2 + mouse.vY ** 2) * 150;
    console.log(window.innerWidth);

    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
  }

  function updateOffset() {
    let data = offsetTexture.image.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] *= 0.95;
      data[i + 1] *= 0.95;
    }

    let mouseGridX = size * mouse.x; //* (window.innerHeight / window.innerWidth);
    let mouseGridY = size * (1 - mouse.y);
    let maxDist = clamp(mouse.v * 100, 25, 150);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let dist = (mouseGridX - i) ** 2 + (mouseGridY - j) ** 2;

        if (dist < maxDist) {
          let power =
            ((1 * maxDist) / dist) *
            ((20 - Math.min(mouse.curScroll, 20)) / 20) *
            0.1;
          data[4 * (i + size * j)] += mouse.vX * power;
          data[4 * (i + size * j) + 1] += mouse.vY * power;
        }
        let s = 0;
        mouse.scrollV > 0 ? (s = (size - j) / size) : (s = j / size);
        // if (j < size / 2)
        data[4 * (i + size * j) + 1] += mouse.scrollV * Math.random() * 0.1 * s;
      }
    }
    mouse.scrollV *= 0.9;
    mouse.vX *= 0.5;
    mouse.vY *= 0.5;

    offsetTexture.needsUpdate = true;
  }

  function postProcessing() {
    composer.addPass(new RenderPass(scene, camera));

    effect1.uniforms["offsetT"].value = offsetTexture;
    composer.addPass(effect1);
  }
  function updateElements() {
    elems.forEach((elem) => {
      setMeshtoHtmlPos(elem.mesh, elem.dom.getBoundingClientRect());
      setMeshtoHtmlSize(elem.mesh, elem.dom.getBoundingClientRect());
    });
  }

  function debounce<Params extends any[]>(
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

  function render(time: number) {
    debounce(updateElements, 100)();
    material.uniforms.time.value = time * 0.005;
    updateOffset();
    requestAnimationFrame(render);

    composer.render();
  }
};
