import { Vector2 } from "three";
import { Texture, Color } from "three";
import { ShaderMaterial } from "three";
class torusMaterial extends ShaderMaterial {
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
			  

	  
			void main() {
				
					
				vec2 p = 2.*vUv - vec2(1.0);
						
				
				float Pixels = 2048.;
				float dx = 15.0 * (1.0 / Pixels);
				float dy = 10.0 * (1.0 / Pixels);
				p = vec2(dx * floor(p.x / dx),dy * floor(p.y / dy));

				
				float speed = 0.0001;
				float scale = 0.7;
				p += 0.1 * cos( ( a1 * scale ) * p.yx + b1 * speed * time  + vec2(c1, d1) );
				p += 0.1 * cos( ( a2 * scale ) * p.yx + b2 * speed * time  + vec2(c2, d2) );
				p += 0.1 * cos( ( a3 * scale ) * p.yx + b3 * speed * time  + vec2(c3, d3) );
				p += 0.6 * cos( ( a4 * scale ) * p.yx + b4 * speed * time  + vec2(c4, d4) );
				
				float a = noise(p * vec2(scale,10.) + time * 0.001);
				
				vec3 color = vec3(0.819, 0.517, 0.901);


				//original colors
				// vec3 cl1 = vec3(0.823, 0.517, 0.905);
				// vec3 cl2 = vec3(0.447, 0.419, 0.952);
				// vec3 cl3 = vec3(0., 0.996, 0.925);
				// vec3 cl4 = vec3(0.149, 0.223, 0.521);
				// vec3 cl5 = vec3(0.870, 0.976, 0.8);

				//mkbhd
				// vec3 cl1 = vec3(0.898, 0.125, 0.168);
				// vec3 cl2 = vec3(0.145, 0.156, 0.176);
				// vec3 cl3 = vec3(1., 1., 1.);

				// purple arcady 
				// vec3 cl1 = vec3(0.670, 0.078, 0.388);
				// vec3 cl2 = vec3(0.384, 0.203, 0.729);
				// vec3 cl3 = vec3(0.023, 0.003, 0.149);
				// vec3 cl4 = vec3(0.121, 0.839, 0.831);
				// vec3 cl5 = vec3(0.949, 0.913, 0.388);

				// // sifi red
				// vec3 cl1 = vec3(1., 0.094, 0.301);
				// vec3 cl2 = vec3(1., 0.341, 0.494);
				// vec3 cl3 = vec3(1., 0.803, 0.858);
				// vec3 cl4 = vec3(0.443, 0.043, 0.596);
				// vec3 cl5 = vec3(0.525, 0.921, 0.850);


				// // retro
				// vec3 cl5 = vec3(1., 0.196, 0.101);
				// vec3 cl4 = vec3(1., 0.564, 0.105);
				// vec3 cl3 = vec3(0.270, 0.996, 0.823);
				// vec3 cl2 = vec3(0.270, 0.054, 1.);
				// vec3 cl1 = vec3(0.133, 0, 0.439);


				// // sahdes of red
				// vec3 cl1 = vec3(0.647, 0.003, 0.290);
				// vec3 cl2 = vec3(0.992, 0.050, 0.188);
				// vec3 cl3 = vec3(1., 0.239, 0.184);
				// vec3 cl4 = vec3(1., 0.447, 0.125);
				// vec3 cl5 = vec3(1., 0.643, 0.227);


				// // // rocket picture
				// vec3 cl1 = vec3(0.043, 0.074, 0.250);
				// vec3 cl2 = vec3(0.019, 0.513, 0.949);
				// vec3 cl3 = vec3(0.062, 0.047, 0.152);
				// vec3 cl4 = vec3(0.815, 0.345, 0.972);
				// vec3 cl5 = vec3(0.949, 0.949, 0.949);


				vec3 cl1 = vec3(0, 0.996, 0.925);
				vec3 cl2 =  vec3(0, 0., 0.);
				vec3 cl3 =  vec3(1., 0., 0.309);



				if(a < 0.4)
					color = cl1;
				else if(a <0.8)
					color = cl2;
				else 
					color = cl3;
				
								
				gl_FragColor = vec4(color,1.);
				// gl_FragColor = vec4(vUv.yx, 0., 1.);
			
		}`,
    };
    super(shader);
  }
}

export { torusMaterial };
