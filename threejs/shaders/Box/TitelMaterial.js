import { Vector2 } from "three";
import { Color } from "three";
import { ShaderMaterial } from "three";
class TitelMaterial extends ShaderMaterial {
  constructor(uniforms) {
    const shader = {
      uniforms: {
        color: new Color(),
        mouse: { value: new Vector2() },
        time: { value: 0 },
      },

      vertexShader: /* glsl */ `
	  
			  varying vec2 vUv;
			  uniform vec2 mouse;

	  
			  void main() {
	  
				float theta = mouse.x  * 0.2;


				mat4 yRotate = mat4(
				cos(theta), 0., - sin(theta), 0.,
				0. ,1. ,0. , 0.,
				sin(theta), 0. , cos(theta), 0.,
				0., 0., 0., 1
	
				);
	
				theta = mouse.y *  0.1;
				mat4 xRotate = mat4(
				1., 0., 0., 0.,
				0. ,cos(theta) , sin(theta) , 0.,
				0., -sin(theta) , cos(theta), 0.,
				0., 0., 0., 1
	
				);
	
	
	
				vUv = uv;
				gl_Position = projectionMatrix   * modelViewMatrix *  vec4( position, 1.0 );
				// gl_Position = projectionMatrix   * modelViewMatrix * xRotate * yRotate *  vec4( position, 1.0 );
	  
			  }`,

      fragmentShader: /* glsl */ `
	  
			uniform float time;
			uniform float progress;
			varying vec2 vUv;
			uniform vec3 color;

			float scale = 2.;

			float random (in float x) {
				return fract(sin(x)*1e4);
			}
			
			float random (in vec2 st) {
				return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
			}
			
			float pattern(vec2 st, vec2 v, float t) {
				vec2 p = floor(st+v);
				return step(t, random(100.+p*.000001)+random(p.x)*0.5 );
			}
			
			float density = 0.1;
	  
	  
	
			void main() {
			
			gl_FragColor = vec4(color ,1.);
			// gl_FragColor = vec4(color,1.);
	
				// gl_FragColor = vec4(vUv.xy, 0., 1.);
	
			}`,
    };
    super(shader);
  }
}

export { TitelMaterial };
