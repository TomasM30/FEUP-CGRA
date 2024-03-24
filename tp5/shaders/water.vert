attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
    vTextureCoord = aTextureCoord;

	vec4 color = texture2D(uSampler2, vTextureCoord+vec2(timeFactor*0.025, timeFactor*0.025));
	float grayscale = (color.r + color.g + color.b) / 3.0 ;

    vec3 offset = aVertexNormal *0.05 * grayscale;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

}