import { createPlane } from "./util/plane";
import {
  createOffsetArray,
  getOffsetTexture,
  updateOffset,
} from "./util/offset";
import { createCamera } from "./util/camera";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { basicShader } from "./shaders/basicShader";
import { createRenderer } from "./util/renderer";
import { onWindowResize, setupMouseEventHandlers } from "./util/eventsHandlers";
import { dimensionsType, elementType, mouseType } from "./util/types";
import { createThreeHtml, debounce, updateElements } from "./util/utils";

const sketch = (threeRootElement: HTMLDivElement) => {
  const scene = new THREE.Scene();
  const dimensions: dimensionsType = {
    width: threeRootElement.offsetWidth,
    height: threeRootElement.offsetHeight,
  };
  const renderer = createRenderer({ ...dimensions });
  threeRootElement.appendChild(renderer.domElement);
  const composer = new EffectComposer(renderer);
  const effect1 = new ShaderPass(basicShader);
  const elements: elementType[] = [];
  const camera = createCamera();
  const mouse: mouseType = {
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

  let size = 128;
  let offsetWidth = size;
  let offsetHeight = size;
  let offsetSize = offsetHeight * offsetWidth;
  const offsetArray = createOffsetArray(offsetSize * 4);
  const offsetTexture = getOffsetTexture({
    offsetArray,
    offsetHeight,
    offsetWidth,
  });
  const planeGeo = new THREE.PlaneGeometry(
    window.innerWidth,
    window.innerHeight,
    1,
    1
  );
  const { plane, material } = createPlane({ offsetTexture, planeGeo });
  scene.add(plane);
  ["logo", "goal", "vision"].map((elementToBeCreated) => {
    createThreeHtml({
      id: elementToBeCreated,
      texturePath: `/${elementToBeCreated}.png`,
      transparent: true,
      scene,
      elements,
    });
  });

  onWindowResize({
    camera,
    container: threeRootElement,
    dimensions,
    material,
    renderer,
  });
  setupMouseEventHandlers({
    mouse,
    camera,
    container: threeRootElement,
    dimensions,
    material,
    renderer,
  });

  postProcessing();
  render(0);
  function postProcessing() {
    composer.addPass(new RenderPass(scene, camera));
    effect1.uniforms["offsetT"].value = offsetTexture;
    composer.addPass(effect1);
  }
  function render(time: number) {
    debounce(updateElements, 1000)({ elements });
    material.uniforms.time.value = time * 0.005;
    updateOffset({ mouse, offsetTexture, size });
    requestAnimationFrame(render);
    composer.render();
  }
};

export default sketch;
