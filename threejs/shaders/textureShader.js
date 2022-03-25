import { Vector2 } from "three";
import { Texture } from "three";

const textureMaterial = {
  uniforms: {
    t: { value: new Texture() },
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

		uniform sampler2D t;


		varying vec2 vUv;

		void main() {
			

			vec4 color = texture2D( t, vUv);

			gl_FragColor = color;
			// gl_FragColor = vec4(vUv.xy, 0., 1.);

		}`,
};

export { textureMaterial };
