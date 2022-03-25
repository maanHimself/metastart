import { Vector2 } from "three";
import { Texture } from "three";

const basicShader = {
  uniforms: {
    tDiffuse: { value: new Texture() },
    offsetT: { value: new Texture() },
  },

  vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

  fragmentShader: /* glsl */ `

		uniform float time;
		uniform float progress;

		uniform sampler2D tDiffuse;
		uniform sampler2D offsetT;


		varying vec2 vUv;

		void main() {
			

			vec4 offset = texture2D( offsetT, vUv );
			vec4 color = texture2D( tDiffuse, vUv + vec2(-0.3 * offset.x, 0.3 * offset.y) );

			gl_FragColor = vec4(vUv.xy,0.,1.);
			gl_FragColor = color;

		}`,
};

export { basicShader };
