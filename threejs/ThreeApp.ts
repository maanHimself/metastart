import * as THREE from "three";
import { clamp } from "three/src/math/MathUtils";
const dat = require("dat.gui");
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { basicShader } from "./shaders/basicShader";
import { torusMaterialLines } from "./shaders/torusMaterial lines";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Vector2, Vector3 } from "three";
import TWEEN from "@tweenjs/tween.js";
import Box from "./Box";
import Shape from "./Shape";
import {
  createThreeHtml,
  setMeshtoHtmlPos,
  setMeshtoHtmlSize,
} from "./utils/HtmlUtil";
import Plane from "./Plane";
import Torus from "./Torus";

export default (canvas: any) => {
  const scene = new THREE.Scene();

  const container = canvas;
  let width = container.offsetWidth;
  let height = container.offsetHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x0, 1);
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
  let donutBounds = document.getElementById("donut")?.getBoundingClientRect();

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

  let content = document.getElementById("content");
  if (content != null) content.style.opacity = "0%";
  //end setup

  let size = 64;
  let offsetTexture: THREE.DataTexture;
  async function fillBuffer() {
    let offsetWidth = size;
    let offsetHeight = size;
    let offsetSize = offsetHeight * offsetWidth;

    let offsetArray = new Float32Array(offsetSize * 4);

    for (let i = 0; i < offsetSize; i++) {
      let stride = i * 4;
      let r = Math.random() * 1 * 2 - 1;
      let r2 = Math.random() * 1 * 2 - 1;

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
  }

  // fillBuffer().then(() => {});
  let plane: Plane;
  plane = new Plane();
  scene.add(plane.getMesh());

  elems.push(createThreeHtml("/goal.png", true, "goal", scene));
  elems.push(createThreeHtml("/vision.png", true, "vision", scene));
  elems.push(createThreeHtml("/team1.png", true, "team1", scene));
  elems.push(createThreeHtml("/team2.png", true, "team2", scene));
  elems.push(createThreeHtml("/team3.png", true, "team3", scene));
  elems.push(createThreeHtml("/team4.png", true, "team4", scene));
  elems.push(createThreeHtml("/team5.png", true, "team5", scene));
  elems.push(createThreeHtml("/team6.png", true, "team6", scene));
  elems.push(createThreeHtml("/team7.png", true, "team7", scene));
  elems.push(createThreeHtml("/indie.png", true, "indie", scene));
  elems.push(createThreeHtml("/skyDeck.png", true, "skyDeck", scene));

  const box = new Box(mouse, "s1");
  scene.add(box.getMesh());

  const shape = new Shape(mouse, "logo", "metastart.png");
  scene.add(shape.getMesh());

  const torus = new Torus(camera, entered).getMesh();
  scene.add(torus);

  scene.add(new THREE.AmbientLight("white", 1));

  let mesh: THREE.Mesh;

  setupListeners();
  onWindowResize();
  postProcessing();
  setSettings();
  render(0);

  function setSettings() {}

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

      const torusRotation = {
        x: (90 * Math.PI) / 180,
        y: 0,
        z: 0,
      };
      let tweenTorusIntro = new TWEEN.Tween(torusRotation)
        .to(
          {
            x: (140 * Math.PI) / 180,
            y: (20 * Math.PI) / 180,
            z: (320 * Math.PI) / 180,
          },
          1000
        )
        .easing(TWEEN.Easing.Circular.InOut)
        .onUpdate(() => {
          torus.rotation.x = torusRotation.x;
          torus.rotation.y = torusRotation.y;
          torus.rotation.z = torusRotation.z;

          camera.fov =
            2 *
            Math.atan(window.innerHeight / 2 / camera.position.z) *
            (180 / Math.PI);
          camera.updateProjectionMatrix();
        })
        .start();
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

      if (content != null) content.style.opacity = "100%";
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
    width = container.offsetWidth;
    height = container.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    // render();
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
    donutBounds = document.getElementById("donut")?.getBoundingClientRect();
    setMeshtoHtmlPos(torus, donutBounds);
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
    if (entered) {
      debounce(updateElements, 100)();
      TWEEN.update();
      // updateOffset();
    }
    requestAnimationFrame(render);

    composer.render();
  }
};
