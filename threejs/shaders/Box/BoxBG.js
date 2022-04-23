import { Vector2 } from "three";
import { Texture } from "three";
import { ShaderMaterial } from "three";
class BoxBG extends ShaderMaterial {
  constructor(uniforms) {
    const shader = {
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        t1: { value: new Texture() },
        t2: { value: new Texture() },
        mouse: { value: new Vector2() },
      },

      vertexShader: /* glsl */ `
	  
			varying vec2 vUv;
			uniform vec2 mouse;
	
			void main() {

			vUv = vec2(uv.x - mouse.x * 0.2 , uv.y + mouse.y * 0.1);
			gl_Position = projectionMatrix   * modelViewMatrix  * vec4( position, 1.0 );

	}`,

      fragmentShader: /* glsl */ `
	  
			uniform float time;
			uniform float progress;
	
			uniform sampler2D t1;
			uniform sampler2D t2;
	
	
			varying vec2 vUv;
			// 2D Random
			// float random (in vec2 st) {
			// 	return fract(sin(dot(st.xy,
			// 						vec2(12.9898,78.233)))
			// 				* 43758.5453123);
			// }

			// // 2D Noise based on Morgan McGuire @morgan3d
			// // https://www.shadertoy.com/view/4dS3Wd
			// float noise (in vec2 st) {
			// 	vec2 i = floor(st);
			// 	vec2 f = fract(st);

			// 	// Four corners in 2D of a tile
			// 	float a = random(i);
			// 	float b = random(i + vec2(1.0, 0.0));
			// 	float c = random(i + vec2(0.0, 1.0));
			// 	float d = random(i + vec2(1.0, 1.0));

			// 	// Smooth Interpolation

			// 	// Cubic Hermine Curve.  Same as SmoothStep()
			// 	vec2 u = f*f*(3.0-2.0*f);
			// 	// u = smoothstep(0.,1.,f);

			// 	// Mix 4 coorners percentages
			// 	return mix(a, b, u.x) +
			// 			(c - a)* u.y * (1.0 - u.x) +
			// 			(d - b) * u.x * u.y;
			// }
			float rand(vec2 n) { 
				return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
			}
		
		
			
			float noise(vec2 p){
				vec2 ip = floor(p);
				vec2 u = fract(p);
				u = u*u*(2.01-2.0*u);
				
				float res = mix(
					mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
					mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
				return res*res;
			}
			void main() {


				vec4 tex1 = texture2D(t1,vUv);
				vec4 tex2 = texture2D(t2,vUv);
				float a = step(1. - progress,noise(vUv * 30.));
				 
				vec4 color = mix(tex1,tex2, a);
				gl_FragColor = color;


	
			}`,
    };
    super(shader);
  }
}

export { BoxBG };
