import { Vector2 } from "three";
import { Texture } from "three";
import { ShaderMaterial } from "three";
class torusMaterial extends ShaderMaterial {
  constructor() {
    const shader = {
      uniforms: {
        time: { value: 0 },
        t: { value: new Texture() },
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

			    const int zoom = 10;
				const float brightness = 0.975;
				float fScale = 1.25;

				float cosRange(float degrees, float range, float minimum) {
					return (((1.0 + cos(degrees * RADIANS)) * 0.5) * range) + minimum;
				}

	  
			  void main() {
				  
	  
				  vec3 color = vec3(1.,0,0);
				  
				  //   float ct = cosRange(time*5.0, 3.0, 1.1);
				  //   float xBoost = cosRange(time*0.2, 5.0, 5.0);
				  //   float yBoost = cosRange(time*0.1, 10.0, 5.0);
				  
				  
				  
				  //   vec2 newUV = vec2(1.);
				  // 	for(int i=1;i<zoom;i++) {
					  // 		float _i = float(i);
					  // 		newUV.x+=0.25/_i*sin(_i*vUv.y+time*cos(ct)*0.5/20.0+0.005*_i)*fScale+xBoost;		
					  // 		newUV.y+=0.25/_i*sin(_i*vUv.x+time*ct*0.3/40.0+0.03*float(i+15))*fScale+yBoost;
					  // 	}
					  
					  
					  //   color =vec3(0.5*sin(3.0*newUV.x)+0.5,0.5*sin(10.0*newUV.y)+0.5,sin(newUV.x+newUV.y));
					  //   color *= brightness;
					  
					  //   gl_FragColor = vec4(color,1.);

				vec2 p = 2.*vUv - vec2(1.0);


				// p += 0.1 * cos(2.0* scale * p.yx  +1.0 * time * speed + vec2(1.2,3.4));
				// p += 0.1 * cos(2.7* scale * p.yx +1.4 * time * speed + vec2(2.2,3.4));
				// p += 0.1 * cos(3.7* scale * p.yx +2.6 * time * speed + vec2(4.2,1.4));
				// p += 0.3 * cos(3.7* scale * p.yx +2.6 * time * speed + vec2(10.2,3.4));
	
				// p += 0.14 * cos( ( 1.5 * wscale ) * p.yx + 1.0 * time * speed + vec2(0.1, 1.1) );
				// p += 0.19 * cos( ( 2.4 * wscale ) * p.yx + 1.6 * time * speed + vec2(4.5, 2.6) );
				// p += 0.16 * cos( ( 3.3 * wscale ) * p.yx + 1.2 * time * speed + vec2(3.2, 3.4) );
				// p += 0.19 * cos( ( 4.2 * wscale ) * p.yx + 1.7 * time * speed + vec2(1.8, 5.2) );
				// p += 0.2 * cos( ( 2.1 * wscale ) * p.yx + 1.1 * time * speed + vec2(6.3, 3.9) );
	
				float speed = 0.0005;
				// time = time = speed;
				float scale = 5.;
				p += 0.1 * cos( ( 1.5 * scale ) * p.yx + 1.1 * speed * time  + vec2(0.1, 1.1) );
				p += 0.1 * cos( ( 2.3 * scale ) * p.yx + 1.3 * speed * time  + vec2(3.2, 3.4) );
				p += 0.1 * cos( ( 2.2 * scale ) * p.yx + 1.7 * speed * time  + vec2(1.8, 5.2) );
				p += 0.6000 * cos( ( 2.5000 * scale ) * p.yx + 1.4 * speed * time  + vec2(6.3, 3.9) );
					  
				vec4 tex = texture2D(t,p);
				
				gl_FragColor = vec4(tex);
				// gl_FragColor = vec4(vUv.xy, 0., 1.);
				
			}`,
    };
    super(shader);
  }
}

export { torusMaterial };
