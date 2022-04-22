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
    #define HALFPI 1.5707964
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

    vec4 hash42(vec2 p) {
        vec4 p4 = fract(vec4(p.xyxy) * vec4(.1031, .1030, .0973, .1099));
        p4 += dot(p4, p4.wzxy + 33.33);
        return fract((p4.xxyz + p4.yzzw) * p4.zywx);
    }

    float x(float t) { // From http://mathforum.org/kb/message.jspa?messageID=407257
        t = mod(t, 4.0);
        return abs(t) - abs(t-1.0) - abs(t-2.0) + abs(t-3.0) - 1.0;	
    }
    

    float star(vec2 uv, vec2 s, vec2 offset)
    {
        uv += offset;
        uv *= 2.0;
        float l = length(uv);
        l = sqrt(l);

        vec2 v = smoothstep(s, vec2(0.0), vec2(l));
        // vec2 v = step(s, vec2(l));
        
        return v.x + v.y*0.1;
    }

    vec4 starField(vec2 uv)
    {
        vec2 fracuv = fract(uv);
        vec2 flooruv = floor(uv);
        vec4 r = hash42(flooruv);
        vec4 color = mix(vec4(1.,1.,1.,1.), vec4(1., 1., 1., 1.0), dot(r.xy, r.zw)) * 4.0 * dot(r.xz, r.yw);
        
        float t = time*2.0 * 0.1;
        vec2 o = sin(vec2(t, t + HALFPI) * r.yx) * r.zw * 0.75;
        
        //return color;
        return color * star((fracuv - 0.5) * 2.0, vec2(0.5, 0.4) * (0.5 + 0.5*r.xy), o);
    }


		float iSpeed = 50.0;
		float iDensity = 1.0;
		float iStarSize = 4.0;



    void main()	{
        // vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
        // float fractals = fractal(newUV* 0.3);
        // float noises = noise(newUV * 20. );
        // noises = step(0.5,noises);
        // vec3 color = vec3(0.823, 0.517, 0.905);
        // float noiseFract =  fractals * noises;
        // color *= noiseFract;
        // gl_FragColor = vec4( color,1.);

        // vec4 final = starField(gl_FragCoord.xy * 0.01);
        // gl_FragColor = 1. - smoothstep(0.1,0.,final);
        // // gl_FragColor = ((U.x * U.y) * R.yyyy );



        //expoermint

        vec2 filteredRes = vec2(gl_FragCoord.x - mod(gl_FragCoord.x, iStarSize), gl_FragCoord.y - mod(gl_FragCoord.y, iStarSize));
        vec2 st = filteredRes.xy / 1000.;
        st *= 10.0;
    
        vec2 ipos = floor(st);
        vec2 fpos = fract(st);
    
        float isStar = (pow(rand(fpos), 100.0 / iDensity)) * sin((time * 0.3/(100.0/iSpeed)) * (rand(filteredRes) * (3.14159)));
        float nebula = (rand(fpos) ) * 0.2;
        gl_FragColor = vec4(max(isStar, (sin(nebula) + 1.0)/100.0), isStar, max(isStar, (cos(nebula) + 1.0)/100.0), 1.0);
    }
`;
