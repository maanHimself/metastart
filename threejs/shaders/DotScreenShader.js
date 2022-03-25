import { Vector2 } from "three";

const CustomPass = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    progress: { value: 0 },
    random: { value: 0 },
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
		uniform float random;

		uniform sampler2D tDiffuse;


		varying vec2 vUv;

		void main() {
			float speed = 0.0005;
			// time = time = speed;
			float scale = 1.6;
			float wscale = scale;
			vec2 newUV = vec2(0.);
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


			p += 0.1 * cos( ( 1.5 * scale ) * p.yx + 1.1 * speed * time  + vec2(0.1, 1.1) );
    		p += 0.1 * cos( ( 2.3 * scale ) * p.yx + 1.3 * speed * time  + vec2(3.2, 3.4) );
    		p += 0.1 * cos( ( 2.2 * scale ) * p.yx + 1.7 * speed * time  + vec2(1.8, 5.2) );
    		p += 0.6000 * cos( ( 2.5000 * scale ) * p.yx + 1.4 * speed * time  + vec2(6.3, 3.9) );
			
			float r = length(p);
			newUV.x = mix(vUv.x , r , progress);
			newUV.y = mix(vUv.y , 0.5 , progress);
			// newUV = vUv + 1. * vec2(cos(time * speed + length( p * scale )), sin(time * speed + length(p * scale)));

			vec4 color = texture2D( tDiffuse, newUV );
			// gl_FragColor = vec4( ,0.,0.,1. );
			gl_FragColor = color;
			// gl_FragColor = vec4(val1,val1,val1,1.);
			

		}`,
};

export { CustomPass };
