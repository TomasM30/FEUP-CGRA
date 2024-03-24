attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform float normScale;
varying vec2 vTextureCoord;

varying vec4 coords;

void main(){
    float offset = normScale * sin(timeFactor);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x + offset, aVertexPosition.y, aVertexPosition.z, 1.0);
    coords = gl_Position;

    vTextureCoord = aTextureCoord;
}