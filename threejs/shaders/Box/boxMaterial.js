import { Vector2 } from "three";
import { Texture } from "three";
import { ShaderMaterial } from "three";
class boxMaterial extends ShaderMaterial {
  constructor(uniforms) {
    const shader = {
      uniforms: {
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
