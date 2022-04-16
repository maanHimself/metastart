import * as THREE from "three";
import * as planeShader from "./shaders/planeShader";
import * as planeShaderIntro from "./shaders/planeShaderIntro";
import { clamp } from "three/src/math/MathUtils";
const dat = require("dat.gui");
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { basicShader } from "./shaders/basicShader";
import { customShader } from "./shaders/customShader";
import { torusMaterial } from "./shaders/torusMaterial";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Vector3 } from "three";
// const TWEEN = require("@tweenjs/tween.js");
import TWEEN from "@tweenjs/tween.js";

export default (canvas: any) => {
  const scene = new THREE.Scene();

  const container = canvas;
  let width = container.offsetWidth;
  let height = container.offsetHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1);
  renderer.outputEncoding = THREE.sRGBEncoding;

  container.appendChild(renderer.domElement);
  const composer = new EffectComposer(renderer);
  const effect1 = new ShaderPass(basicShader);

  const loader = new GLTFLoader();

  let entered = false;

  const elems: any[] = [];

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.set(0, 0, 600);

  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      console.log(document.readyState);
      let opacity = { value: 0 };
      document.getElementById("loadingBg")?.style.display = "none";
      new TWEEN.Tween(opacity)
        .to({ value: 100 })
        .easing(TWEEN.Easing.Exponential.Out)
        .onUpdate(() => {
          // document.getElementById("loadingBg")?.style.opacity =
          //   "" + opacity.value + "%";
        })
        .start();
    }
  };

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

  let donutbounds = document.getElementById("donut")?.getBoundingClientRect();

  // if (donutbounds != undefined) {
  //   camera.position.y =
  //     window.innerHeight / 2 - donutbounds.top - donutbounds.height / 2 - 50;
  //   camera.position.x =
  //     -(window.innerWidth / 2) + donutbounds.left + donutbounds.width / 2 - 30;
  //   camera.position.z = 100;
  // }

  // camera.position.z = 50;
  let time = 0;

  let content = document.getElementById("content");
  content?.style.opacity = "0%";
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
    // offsetArray[stride] = r;
    // offsetArray[stride + 1] = r2;
    // offsetArray[stride + 2] = r;
    // offsetArray[stride + 3] = r;
    offsetArray[stride] = 0;
    offsetArray[stride + 1] = 0;
    offsetArray[stride + 2] = 0;
    offsetArray[stride + 3] = 0;
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
    window.innerWidth * 1.5,
    window.innerHeight * 1.5,
    1,
    1
  );

  const material = new THREE.ShaderMaterial({
    vertexShader: planeShader.vertex,
    fragmentShader: planeShader.fragment,
    uniforms: {
      // vT: { value: new THREE.TextureLoader().load("/img.jpg") },
      dT: { value: offsetTexture },
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
    },
  });

  const plane = new THREE.Mesh(PlaneGeo, material);
  scene.add(plane);
  plane.position.z -= 250;

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

  createThreeHtml("/metastart.png", true, "logo");
  createThreeHtml("/goal.png", true, "goal");
  createThreeHtml("/vision.png", true, "vision");

  //services
  createThreeHtml("/services/1.png", true, "s1");
  createThreeHtml("/services/2.png", true, "s2");
  createThreeHtml("/services/3.png", true, "s3");
  createThreeHtml("/services/4.png", true, "s4");
  createThreeHtml("/services/5.png", true, "s5");

  createThreeHtml("/team1.png", true, "team1");
  createThreeHtml("/team2.png", true, "team2");
  createThreeHtml("/team3.png", true, "team3");
  createThreeHtml("/team4.png", true, "team4");
  createThreeHtml("/team5.png", true, "team5");
  createThreeHtml("/team6.png", true, "team6");
  createThreeHtml("/team7.png", true, "team7");
  createThreeHtml("/indie.png", true, "indie");
  createThreeHtml("/skyDeck.png", true, "skyDeck");

  const torusG = new THREE.TorusGeometry(
    window.innerWidth < 756
      ? (innerWidth * 0.7) / 4
      : (innerWidth * 0.7 * 0.5) / 4,
    window.innerWidth < 756
      ? ((innerWidth * 0.7) / 4) * 0.2
      : ((innerWidth * 0.7 * 0.5) / 4) * 0.2,
    30,
    100
  );
  const torusM = new torusMaterial();
  torusM.uniforms["t"].value = new THREE.TextureLoader().load(
    "/torusTexture.jpg"
  );
  const torus = new THREE.Mesh(torusG, torusM);
  torus.position.z = 0;
  // torus.position.x =
  torus.rotation.x = (125 * Math.PI) / 180;
  torus.rotateY((20 * Math.PI) / 180);
  torus.rotateZ((320 * Math.PI) / 180);
  // torus.rotation.x = (90 * Math.PI) / 180;

  // torus.position.y += 100;

  camera.fov =
    2 * Math.atan(window.innerHeight / 2 / camera.position.z) * (180 / Math.PI);

  setMeshtoHtmlPos(torus, donutbounds);
  camera.position.y =
    torus.position.y -
    (window.innerWidth < 756
      ? ((innerWidth * 0.7) / 4) * 0.5
      : ((innerWidth * 0.7 * 0.5) / 4) * 0.5);
  camera.position.x = torus.position.x;
  (camera.position.z =
    window.innerWidth < 756
      ? (innerWidth * 0.7) / 4
      : (innerWidth * 0.7 * 0.5) / 4),
    scene.add(torus);

  scene.add(new THREE.AmbientLight("white", 1));

  let mesh: THREE.Mesh;
  loader.load("/torus.glb", (gltf) => {
    mesh = gltf.scene.children[0] as THREE.Mesh;
    mesh.material = torusM;
    mesh.material.side = THREE.DoubleSide;
    mesh.scale.set(100, 100, 100);
    mesh.position.z = 100;
    gltf.scene.rotateX((60 * Math.PI) / 180);
    gltf.scene.rotateY((20 * Math.PI) / 180);
    // scene.add(mesh);
  });

  // end adding objects

  setupListeners();
  onWindowResize();
  postProcessing();
  let settings = {};
  // setSettings();
  render(0);

  function setSettings() {
    settings = {
      sp: 0.0005,
      sc: 1.2,
      a1: 1.5,
      b1: 1.1,
      c1: 0.1,
      d1: 1.1,
      a2: 2.3,
      b2: 1.3,
      c2: 3.2,
      d2: 3.4,
      a3: 2.2,
      b3: 1.7,
      c3: 1.8,
      d3: 5.2,
      a4: 2.5,
      b4: 1.4,
      c4: 6.3,
      d4: 3.9,
    };
    let gui = new dat.GUI();
    gui.add(settings, "sp", 0, 10, 0.0001);
    gui.add(settings, "sc", 0, 10, 0.1);
    gui.add(settings, "a1", 0, 10, 0.01);
    gui.add(settings, "b1", 0, 10, 0.01);
    gui.add(settings, "c1", 0, 10, 0.01);
    gui.add(settings, "d1", 0, 10, 0.01);
    gui.add(settings, "a2", 0, 10, 0.01);
    gui.add(settings, "b2", 0, 10, 0.01);
    gui.add(settings, "c2", 0, 10, 0.01);
    gui.add(settings, "d2", 0, 10, 0.01);
    gui.add(settings, "a3", 0, 10, 0.01);
    gui.add(settings, "b3", 0, 10, 0.01);
    gui.add(settings, "c3", 0, 10, 0.01);
    gui.add(settings, "d3", 0, 10, 0.01);
    gui.add(settings, "a4", 0, 10, 0.01);
    gui.add(settings, "b4", 0, 10, 0.01);
    gui.add(settings, "c4", 0, 10, 0.01);
    gui.add(settings, "d4", 0, 10, 0.01);
  }

  function setupListeners() {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("touchmove", onMouseMove);
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("keydown", OnEntered);
    window.addEventListener("mousedown", OnEntered);
    window.addEventListener("touchstart", OnEntered);
  }

  function OnEntered(e: Event) {
    if (!entered) {
      e.preventDefault();
      document.body.style.overflow = "auto";
      // document..style.overflow = "auto";
      const coords = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      };
      let tweenCamera = new TWEEN.Tween(coords)
        .to({ x: 0, y: 0, z: 600 }, 1000)
        .easing(TWEEN.Easing.Circular.InOut)
        .onUpdate(() => {
          camera.position.x = coords.x;
          camera.position.y = coords.y;
          camera.position.z = coords.z;

          camera.fov =
            2 *
            Math.atan(window.innerHeight / 2 / camera.position.z) *
            (180 / Math.PI);
          camera.updateProjectionMatrix();
        })
        .start();

      entered = true;

      // setMeshtoHtmlSize(mesh, donut?.getBoundingClientRect());
      // let meshSize = new Vector3();
      // mesh.geometry.computeBoundingBox();
      // mesh.geometry.boundingBox?.getSize(meshSize);

      // mesh.scale.set(
      //   donutbounds!.width / meshSize.x,
      //   donutbounds!.width / meshSize.x,
      //   donutbounds!.width / meshSize.x
      // );
      // mesh.position.z = 100;
      content?.style.opacity = "100%";

      // material.fragmentShader = planeShader.fragment;
      // material.needsUpdate = true;
    }
  }
  function onScroll(e: Event) {
    mouse.curScroll =
      ((document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight)) *
      100;

    mouse.scrollV = mouse.curScroll - mouse.oldScroll;

    mouse.oldScroll = mouse.curScroll;
  }

  function onWindowResize() {
    debounce(() => {
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
    }, 300);
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
    donutbounds = document.getElementById("donut")?.getBoundingClientRect();
    // setMeshtoHtmlPos(torus, donutbounds);
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
    torusM.uniforms["time"].value = time;
    // torusM.uniforms["sc"].value = settings["sc" as keyof typeof settings];
    // torusM.uniforms["a1"].value = settings["a1" as keyof typeof settings];
    // torusM.uniforms["b1"].value = settings["b1" as keyof typeof settings];
    // torusM.uniforms["c1"].value = settings["c1" as keyof typeof settings];
    // torusM.uniforms["d1"].value = settings["d1" as keyof typeof settings];
    // torusM.uniforms["a2"].value = settings["a2" as keyof typeof settings];
    // torusM.uniforms["b2"].value = settings["b2" as keyof typeof settings];
    // torusM.uniforms["c2"].value = settings["c2" as keyof typeof settings];
    // torusM.uniforms["d2"].value = settings["d2" as keyof typeof settings];
    // torusM.uniforms["a3"].value = settings["a3" as keyof typeof settings];
    // torusM.uniforms["b3"].value = settings["b3" as keyof typeof settings];
    // torusM.uniforms["c3"].value = settings["c3" as keyof typeof settings];
    // torusM.uniforms["d3"].value = settings["d3" as keyof typeof settings];
    // torusM.uniforms["a4"].value = settings["a4" as keyof typeof settings];
    // torusM.uniforms["b4"].value = settings["b4" as keyof typeof settings];
    // torusM.uniforms["c4"].value = settings["c4" as keyof typeof settings];
    // torusM.uniforms["d4"].value = settings["d4" as keyof typeof settings];

    if (mesh != undefined) {
      // mesh.rotation.x = Math.sin(-time * 0.001) + 0.5;
      // mesh.rotation.y = Math.sin(time * 0.001);
      // mesh.rotation.z = Math.sin(time * 0.001);
      // mesh.rotation.x += 0.05;
      // mesh.rotation.y += 0.05;
    }
    material.uniforms.time.value = time * 0.005;
    if (entered) {
      debounce(updateElements, 100)();
      TWEEN.update();
      updateOffset();
    }
    requestAnimationFrame(render);

    composer.render();
  }
};
