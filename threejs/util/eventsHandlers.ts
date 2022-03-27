import { getImageAspect } from "./plane";
import { dimensionsType } from "./types";
export const onMouseMove = (mouse: any) => (e: MouseEvent | TouchEvent) => {
  console.log(mouse, e);
  if (e instanceof MouseEvent) {
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = e.clientY / window.innerHeight;
  } else {
    mouse.x = e.touches.item(0)!.clientX / window.innerWidth;
    mouse.y = e.touches.item(0)!.clientY / window.innerHeight;
  }

  mouse.vX = mouse.x - mouse.prevX;
  mouse.vY = mouse.y - mouse.prevY;
  mouse.v = Math.sqrt(mouse.vX ** 2 + mouse.vY ** 2) * 150;
  console.log(window.innerWidth);

  mouse.prevX = mouse.x;
  mouse.prevY = mouse.y;
};

export const onScroll = (mouse: any) => (e: Event) => {
  mouse.curScroll =
    ((document.documentElement.scrollTop + document.body.scrollTop) /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
    100;

  mouse.scrollV = mouse.curScroll - mouse.oldScroll;
  mouse.oldScroll = mouse.curScroll;
};

export const setupMouseEventHandlers = (mouse: any) => {
  window.addEventListener("mousemove", onMouseMove(mouse));
  window.addEventListener("scroll", onScroll(mouse));
  window.addEventListener("touchmove", onMouseMove(mouse));
  window.addEventListener("resize", onScroll(mouse));
};

export const onWindowResize = ({
  dimensions,
  container,
  renderer,
  camera,
  material,
}: {
  dimensions: dimensionsType;
  container: HTMLDivElement;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  material: THREE.ShaderMaterial;
}) => {
  dimensions.width = container.offsetWidth;
  dimensions.height = container.offsetHeight;
  renderer.setSize(dimensions.width, dimensions.height);
  camera.aspect = dimensions.width / dimensions.height;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  const { a1, a2 } = getImageAspect();

  material.uniforms.resolution.value.x = window.innerWidth;
  material.uniforms.resolution.value.y = window.innerHeight;
  material.uniforms.resolution.value.z = a1;
  material.uniforms.resolution.value.w = a2;
};
