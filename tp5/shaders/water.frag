#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord+vec2(0.005*timeFactor, 0.005*timeFactor));
	vec4 filter = texture2D(uSampler2, vec2(0.005*timeFactor, 0.005*timeFactor)+vTextureCoord);

	color.b = max(color.b, filter.b);

	gl_FragColor = color;
}