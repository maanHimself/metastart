import { Vector2 } from "three";
import { Texture } from "three";
import { ShaderMaterial } from "three";
class boxMaterial extends ShaderMaterial {
  constructor(uniforms) {
    const shader = {
      uniforms: {
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
	
				theta = mouse.y *  -0.1;
				mat4 xRotate = mat4(
				1., 0., 0., 0.,
				0. ,cos(theta) , sin(theta) , 0.,
				0., -sin(theta) , cos(theta), 0.,
				0., 0., 0., 1
	
				);
	
	
	
				vUv = uv;
				// gl_Position = projectionMatrix   * modelViewMatrix * xRotate * yRotate *  vec4( position, 1.0 );
				gl_Position = projectionMatrix   * modelViewMatrix *  vec4( position, 1.0 );
	  
			  }`,

      fragmentShader: /* glsl */ `
	  
			  uniform float time;
			  uniform float progress;
	  
			  uniform sampler2D t;
	  
	  
			  varying vec2 vUv;
			  float scale = 2.;
	  
			  void main() {
				  
				  vec4 color = texture2D( t, vUv);
				  
	  
				  gl_FragColor = color;
				//   gl_FragColor = vec4(newUV.xy, 0., 1.);
	  
			  }`,
    };
    super(shader);
  }
}

export { boxMaterial };
