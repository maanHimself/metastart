import { Vector2 } from "three";
import { Texture } from "three";
import { ShaderMaterial } from "three";
class BoxBG extends ShaderMaterial {
  constructor(uniforms) {
    const shader = {
      uniforms: {
        time: { value: 0 },
        t: { value: new Texture() },
        mouse: { value: new Vector2() },
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



			vUv = vec2(uv.x - mouse.x * 0.2 , uv.y + mouse.y * 0.1);
			// gl_Position = projectionMatrix   * yRotate * xRotate * modelViewMatrix  * vec4( position, 1.0 );
			gl_Position = projectionMatrix   * modelViewMatrix  * vec4( position, 1.0 );

	}`,

      fragmentShader: /* glsl */ `
	  
			  uniform float time;
			  uniform float progress;
	  
			  uniform sampler2D t;
	  
	  
			  varying vec2 vUv;
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
			
			float density = 0.5;
	  
			void main() {

				vec2 st = gl_FragCoord.xy/1000.;
				st.x *= 1.;

				vec2 grid = vec2(100.0,100.);
				st *= grid;

				vec2 ipos = floor(st);  // integer
				vec2 fpos = fract(st);  // fraction

				vec2 vel = vec2(time*2.*max(grid.x,grid.y)); // time
				vel *= vec2(-1.,0.0) * random(1.0+ipos.y); // direction

				vec2 offset = vec2(0.1,0.);

				vec3 color = vec3(0.);
				color.r = pattern(st+offset,vel,0.5 + density);
				color.g = pattern(st,vel,0.5 + density);
				color.b = pattern(st-offset,vel,0.5 + density);

				// Margins
				color *= step(0.2,fpos.y);

				vec4 image = texture2D(t, (vUv ) * 0.7 + vec2(0.2));
				

				gl_FragColor = vec4(color,1.0);
				// gl_FragColor = vec4(image.xyz * color.xyz,1.);
				gl_FragColor = vec4(image.xyz ,1.);

					
				

				// gl_FragColor = color;
				//   gl_FragColor = vec4(newUV.xy, 0., 1.);
	
			}`,
    };
    super(shader);
  }
}

export { BoxBG };
