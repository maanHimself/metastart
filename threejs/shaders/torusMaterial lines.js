import { Vector2 } from "three";
import { Texture, Color } from "three";
import { ShaderMaterial } from "three";
class torusMaterialLines extends ShaderMaterial {
  constructor() {
    const shader = {
      uniforms: {
        time: { value: 0 },
        t: { value: new Texture() },
        vColor1: { value: new Color() },
        vColor2: { value: new Color() },
        vColor3: { value: new Color() },
        vColor4: { value: new Color() },
        vColor5: { value: new Color() },
        sp: { value: 0.0005 },
        sc: { value: 0.7 },
        a1: { value: 1.5 },
        b1: { value: 1.1 },
        c1: { value: 0.1 },
        d1: { value: 1.1 },
        a2: { value: 2.3 },
        b2: { value: 1.3 },
        c2: { value: 3.2 },
        d2: { value: 3.4 },
        a3: { value: 2.2 },
        b3: { value: 1.7 },
        c3: { value: 1.8 },
        d3: { value: 5.2 },
        a4: { value: 2.5 },
        b4: { value: 1.4 },
        c4: { value: 6.3 },
        d4: { value: 3.9 },
      },

      vertexShader: /* glsl */ `
	  
			  varying vec2 vUv;
	  
			  void main() {
	  
				  vUv = uv;
				  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	  
			  }`,

      fragmentShader: /* glsl */ `
	  
	 		 #define RADIANS 0.017453292519943295

			  uniform float time;
			  uniform float progress;
	  
			  uniform sampler2D t;
	  
	  
			  varying vec2 vUv;

			uniform vec3 vColor1;
			uniform vec3 vColor2;
			uniform vec3 vColor3;
			uniform vec3 vColor4;
			uniform vec3 vColor5;
			uniform float sp;
			uniform float sc;
			uniform float a1;
			uniform float b1;
			uniform float c1;
			uniform float d1;
			uniform float a2;
			uniform float b2;
			uniform float c2;
			uniform float d2;
			uniform float a3;
			uniform float b3;
			uniform float c3;
			uniform float d3;
			uniform float a4;
			uniform float b4;
			uniform float c4;
			uniform float d4;

			const int zoom = 10;
			const float brightness = 0.975;
			float fScale = 1.25;

			float cosRange(float degrees, float range, float minimum) {
				return (((1.0 + cos(degrees * RADIANS)) * 0.5) * range) + minimum;
			}

			float rand(vec2 n) { 
				return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
			}
			
			float noise(vec2 p){
				vec2 ip = floor(p);
				vec2 u = fract(p);
				u = u*u*(3.0-2.0*u);
				
				float res = mix(
					mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
					mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
				return res*res;
			}

			float range(float vmin, float vmax, float value) {
				return (value - vmin) / (vmax - vmin);
			  }
			  


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
			
			float density = 0.2;

	  
			void main() {
				
					
				vec2 p = 2.*vUv - vec2(1.0);
						
				
				// float Pixels = 2048.;
				// float dx = 15.0 * (1.0 / Pixels);
				// float dy = 10.0 * (1.0 / Pixels);
				// p = vec2(dx * floor(p.x / dx),dy * floor(p.y / dy));

				
				float speed = 0.0001;
				float scale = 0.7;
				p += 0.1 * cos( ( a1 * scale ) * p.yx + b1 * speed * time  + vec2(c1, d1) );
				p += 0.1 * cos( ( a2 * scale ) * p.yx + b2 * speed * time  + vec2(c2, d2) );
				p += 0.1 * cos( ( a3 * scale ) * p.yx + b3 * speed * time  + vec2(c3, d3) );
				p += 0.6 * cos( ( a4 * scale ) * p.yx + b4 * speed * time  + vec2(c4, d4) );
				
				float a = noise(p * vec2(scale,10.) + time * 0.0001);
				
				vec3 color = vec3(0.819, 0.517, 0.901);



				vec3 cl1 = vec3(0, 0.996, 0.925);
				vec3 cl2 =  vec3(0, 0., 0.);
				vec3 cl3 =  vec3(1., 0., 0.309);



				if(a < 0.4)
					color = cl1;
				else if(a <0.7)
					color = cl2;
				else 
					color = cl3;
				/*
					color = mix(cl1 , cl2 , step(0.4,a))
					mix(a , b , r)
					step(0.2,a)
					smoothstep(0.2,0.3,a)
				*/



			
				
								
				gl_FragColor = vec4(color,1.);
				// gl_FragColor = vec4(vUv.yx, 0., 1.);



				// lines 
			
				vec2 st = p.xy/1.;
				st.x *= 1.;

				vec2 grid = vec2(250.0,50.);
				st *= grid;

				vec2 ipos = floor(st);  // integer
				vec2 fpos = fract(st);  // fraction

				vec2 vel = vec2(time * 0.0002*max(grid.x,grid.y)); // time
				vel *= vec2(1.,0.0) * random(1.0+ipos.y); // direction

				vec2 offset = vec2(0.1,0.);

				vec3 lines = vec3(0.);
				lines.r = pattern(st+offset,vel,0.5 + density);
				lines.g = pattern(st,vel,0.5 + density);
				lines.b = pattern(st-offset,vel,0.5 + density);

				// Margins
				lines *= step(0.2,fpos.y);			

				gl_FragColor = vec4(color * lines,lines.r);
				// gl_FragColor = vec4(a);
			
		}`,
    };
    super(shader);
  }
}

export { torusMaterialLines };
