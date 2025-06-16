export var vertexShader = /* glsl */`
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

export var fragmentShader = /* glsl */`
      ${noise3d}
      uniform float uTime;
      uniform float uScrollProgress;
      uniform vec3 uColor;
      uniform float uIntensity;
      uniform sampler2D uTexture;

      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;

      const vec3 colorA = vec3(0.7);
      const vec3 colorB = vec3(1.000);

      void main() {
        vec2 multipliedUv = vUv + (uTime * 0.2);
        vec3 noisePostion = vec3(0., multipliedUv.y * 20., uTime*10.0);
        vec3 noiseColor = vec3(snoise(noisePostion));

        noiseColor = mix(colorA, colorB, noiseColor);
        vec4 textureColor = texture2D(uTexture, vec2(vUv.x, 1.0 - vUv.y));

        vec3 color = textureColor.rgb * noiseColor;

        gl_FragColor = vec4(color, 1.0);
      }
    `


