import * as THREE from "three";
import { clamp } from "three/src/math/MathUtils";
import { mouseType } from "./types";

export const createOffsetArray = (offsetSize: number): Float32Array => {
  const offsetArray = new Float32Array(offsetSize * 4);
  for (let i = 0; i < offsetSize; i++) {
    let stride = i * 4;
    let r = Math.random() * 1 * 2 - 1;
    let r2 = Math.random() * 1 * 2 - 1;
    offsetArray[stride] = r;
    offsetArray[stride + 1] = r2;
    offsetArray[stride + 2] = r;
    offsetArray[stride + 3] = r;
  }
  return offsetArray;
};

export const getOffsetTexture = ({
  offsetArray,
  offsetWidth,
  offsetHeight,
}: {
  offsetArray: Float32Array;
  offsetWidth: number;
  offsetHeight: number;
}): THREE.DataTexture => {
  let offsetTexture = new THREE.DataTexture(
    offsetArray,
    offsetWidth,
    offsetHeight,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  offsetTexture.magFilter = offsetTexture.minFilter = THREE.NearestFilter;
  return offsetTexture;
};

export function updateOffset({
  offsetTexture,
  size,
  mouse,
}: {
  offsetTexture: THREE.DataTexture;
  size: number;
  mouse: mouseType;
}) {
  let data = offsetTexture.image.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] *= 0.95;
    data[i + 1] *= 0.95;
  }
  const mouseGridX = size * mouse.x;
  const mouseGridY = size * (1 - mouse.y);
  const maxDist = clamp(mouse.v ** 2, 25, 100);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let dist = (mouseGridX - i) ** 2 + (mouseGridY - j) ** 2;
      if (dist < maxDist) {
        let power = (1 * maxDist) / dist;
        data[4 * (i + size * j)] += mouse.vX * power;
        data[4 * (i + size * j) + 1] += mouse.vY * power;
      }
      data[4 * (i + size * j) + 1] += mouse.scrollV * Math.random() * 0.01;
    }
  }
  mouse.scrollV *= 0.8;
  mouse.vX *= 0.99;
  mouse.vY *= 0.99;
  offsetTexture.needsUpdate = true;
}
