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

		vec3 uColor = vec3(1.,1.,1.);



		float msdf(sampler2D tMap, vec2 uv) {
			vec3 tex = texture(tMap, uv).rgb;
			float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
			
			// TODO: fallback for fwidth for webgl1 (need to enable ext)
			
			float d = fwidth(signedDist);
			float alpha = smoothstep(-d, d, signedDist);
			if (alpha < 0.01) discard;
			return alpha;
		}
		




		void main() {


			// float alpha = msdf(tDiffuse, vUv);
    		// gl_FragColor.rgb = uColor;
			// gl_FragColor.a = alpha * 0.7;

			vec4 offset = texture2D( offsetT, vUv );
			vec4 color = texture2D( tDiffuse, vUv + vec2(-0.3 * offset.x, 0.3 * offset.y) );

			gl_FragColor = vec4(vUv.xy,0.,1.);
			gl_FragColor = color;




			

		}`,
};

export { basicShader };
