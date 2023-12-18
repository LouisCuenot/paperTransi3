#define M_PI 3.1415926535897932384626433832795

varying vec2 vUv;
uniform float uTime;
uniform float uDecalage;
uniform float uPlaneWidth;


void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.x +=  step(uv.x,uDecalage) * ((uv.x * uPlaneWidth * -1.0 + uDecalage*uPlaneWidth) * 1.4) ;
  modelPosition.z += step(uv.x, uDecalage) *  (uv.x * uPlaneWidth * -1.0 + uDecalage*uPlaneWidth) * 0.2 ;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 clipPosition = projectionMatrix * viewPosition;
  
  gl_Position = clipPosition;
}
  