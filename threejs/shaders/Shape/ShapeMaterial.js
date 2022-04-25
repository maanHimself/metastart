import { Vector2 } from "three";
import { Texture } from "three";
import { ShaderMaterial } from "three";
class ShapeMaterial extends ShaderMaterial {
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

			vUv = uv;
			gl_Position = projectionMatrix   * modelViewMatrix  * vec4( position, 1.0 );

	}`,

      fragmentShader: /* glsl */ `
	  
			uniform float time;
			uniform float progress;
	
			uniform sampler2D t1;
			uniform sampler2D t2;
	
	
			varying vec2 vUv;

			float rand(vec2 n) { 
				return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
			}
		

			float rand () {
				return fract(sin(time * 0.2)*1e4);
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

			float rand(float n){return fract(sin(n) * 43758.5453123);}

		
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

export { ShapeMaterial };
