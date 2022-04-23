import { Vector2, Texture } from "three";
import { Color } from "three";
import { ShaderMaterial } from "three";
class SolidMaterial extends ShaderMaterial {
  constructor(uniforms) {
    const shader = {
      uniforms: {
        color: new Color(),
        time: { value: 0 },
        t: { value: new Texture() },
      },

      vertexShader: /* glsl */ `
	  
			  varying vec2 vUv;

	  
			  void main() {
				vUv = uv;
				gl_Position = projectionMatrix   * modelViewMatrix *  vec4( position, 1.0 );
			  }`,

      fragmentShader: /* glsl */ `
	  
			uniform float time;
			uniform float progress;
			varying vec2 vUv;
			uniform vec3 color;
			uniform sampler2D t;

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
			
			float density = 0.6;
	  
	  
	
			void main() {

			vec4 tex = texture2D(t , vUv);
			vec2 st = gl_FragCoord.xy/1000.;
			st.x *= 1.;

			vec2 grid = vec2(100.0,100.);
			st *= grid;

			vec2 ipos = floor(st);  // integer
			vec2 fpos = fract(st);  // fraction

			vec2 vel = vec2(time*2.*max(grid.x,grid.y)); // time
			vel *= vec2(-1.,0.0) * random(1.0+ipos.y); // direction

			vec2 offset = vec2(0.1,0.);

			vec3 lines = vec3(0.);
			lines.r = pattern(st+offset,vel,0.5 + density);
			lines.g = pattern(st,vel,0.5 + density);
			lines.b = pattern(st-offset,vel,0.5 + density);

			// Margins
			lines *= step(0.2,fpos.y);			

			gl_FragColor = vec4(color * lines,lines.r);
			gl_FragColor = vec4(color * lines, tex.a);
	
				// gl_FragColor = vec4(vUv.xy, 0., 1.);
	
			}`,
    };
    super(shader);
  }
}

export { SolidMaterial };
