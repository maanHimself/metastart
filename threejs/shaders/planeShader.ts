export const vertex: string = `
uniform float times;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormals;
uniform vec2 pixels;

float PI = 3.141592653589793238;
void main() {
  vUv = uv;
  vNormals = normal;
  vPosition = position;
  gl_Position = projectionMatrix *  modelViewMatrix * vec4( position, 1.0 );;
}

`;
export const fragment: string = `
    uniform float time;
    varying float vTime;
    uniform float progress;
    uniform vec4 resolution;
    uniform sampler2D vT;
    uniform sampler2D dT;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormals;
    float PI = 3.141592653589793238;


    float rand(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
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
    float fractal(vec2 p)
    {
        p=abs(2.-mod(p*.2,10.))-2.;
        float ot=1000.;
        for (int i=0; i<20; i++)
        {
            p=abs(p)/clamp(p.x*p.y,.5,10.)-1.;
            if(i>1)ot=min(ot,abs(p.x)+0.7*fract(abs(p.y)*.05+time*.009+float(i)*.3));
            
        }
        ot=exp(-20.*ot);
        return step(0.8,ot);
    }

    void main()	{
        vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
        float fractals = fractal(newUV* 0.3);
        float noises = noise(newUV * 20. );
        noises = step(0.5,noises);
        gl_FragColor = vec4(vec3(fractals * noises),1.);
    }
`;
