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
import Title from "./Title";

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

  let entered = { value: false };

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
    x: 0.5,
    y: 0.5,
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

  // fillBuffer().then(() => {});
  let plane: Plane;
  plane = new Plane();
  scene.add(plane.getMesh());

  elems.push(createThreeHtml("/team1.png", true, "team1", scene));
  elems.push(createThreeHtml("/team2.png", true, "team2", scene));
  elems.push(createThreeHtml("/team3.png", true, "team3", scene));
  elems.push(createThreeHtml("/team4.png", true, "team4", scene));
  elems.push(createThreeHtml("/team5.png", true, "team5", scene));
  elems.push(createThreeHtml("/team6.png", true, "team6", scene));
  elems.push(createThreeHtml("/team7.png", true, "team7", scene));
  elems.push(createThreeHtml("/indie.png", true, "indie", scene));
  elems.push(createThreeHtml("/skyDeck.png", true, "skyDeck", scene));

  const box = new Box(
    mouse,
    "services",
    "/services.png",
    "retro1.jpg",
    "retro2.jpg"
  );
  scene.add(box.getMesh());
  const AboutTitle = new Box(
    mouse,
    "about",
    "/about.png",
    "retro1.jpg",
    "retro2.jpg"
  );
  scene.add(box.getMesh());
  scene.add(AboutTitle.getMesh());

  const s1 = new Shape(
    mouse,
    "s1",
    "/services/ss01.png",
    "/services/ss02.png",
    true
  );
  const s2 = new Shape(
    mouse,
    "s2",
    "/services/ss21.png",
    "/services/ss22.png",
    true
  );
  const s3 = new Shape(
    mouse,
    "s3",
    "/services/ss31.png",
    "/services/ss32.png",
    true
  );
  const s4 = new Shape(
    mouse,
    "s4",
    "/services/ss41.png",
    "/services/ss42.png",
    true
  );
  scene.add(s1.getMesh());
  scene.add(s2.getMesh());
  scene.add(s3.getMesh());
  scene.add(s4.getMesh());

  const torus = new Torus(camera, entered).getMesh();
  scene.add(torus);

  scene.add(new THREE.AmbientLight("white", 1));

  let mesh: THREE.Mesh;

  setupListeners();
  onWindowResize();
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

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function OnEntered(e: Event) {
    if (!entered.value) {
      e.preventDefault();

      entered.value = true;
      // await sleep(500);
      const torusRotation = {
        x: (90 * Math.PI) / 180,
        y: 0,
        z: (330 * Math.PI) / 180,
      };
      let tweenTorusIntro = new TWEEN.Tween(torusRotation)
        .to(
          {
            x: (140 * Math.PI) / 180,
            y: (20 * Math.PI) / 180,
            z: (1280 * Math.PI) / 180,
          },
          1000
        )
        .easing(TWEEN.Easing.Circular.InOut)
        .onUpdate(() => {
          torus.rotation.x = torusRotation.x;
          torus.rotation.y = torusRotation.y;
          torus.rotation.z = torusRotation.z;

          // camera.fov =
          //   2 *
          //   Math.atan(window.innerHeight / 2 / camera.position.z) *
          //   (180 / Math.PI);
          camera.updateProjectionMatrix();
        })
        .start()
        .onComplete(() => {});
      const coords = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      };
      let tweenCamera = new TWEEN.Tween(coords)
        .to({ x: 0, y: 0, z: 600 }, 1000)
        .easing(TWEEN.Easing.Circular.InOut)
        .onUpdate(() => {
          console.log(camera.position.z);
          camera.position.x = coords.x;
          camera.position.y = coords.y;
          camera.position.z = coords.z;

          // camera.fov =
          //   2 *
          //   Math.atan(window.innerHeight / 2 / camera.position.z) *
          //   (180 / Math.PI);
          camera.updateProjectionMatrix();
        })
        .start();

      document.body.style.overflow = "auto";
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

  function updateElements() {
    donutBounds = document.getElementById("donut")?.getBoundingClientRect();
    // setMeshtoHtmlSize(torus, donutBounds);
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
    if (entered.value) {
      debounce(updateElements, 100)();
    }
    TWEEN.update();
    requestAnimationFrame(render);

    renderer.render(scene, camera);
  }
};
