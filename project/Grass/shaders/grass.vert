attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {
    
    float windStrength = 0.1; // WindStrength is how much force is applied on the grass by each wave of wind, making the grass move more or less
    float windSpeed = 0.2; // WindSpeed can be thought as the frequency of each wind wave or how fast the wind is blowing
    float heightFactor = aVertexPosition.y; // The higher the vertex, the more it will be affected by the wind

    // Generate a pseudo-random number based on the vertex position
    // The values chosen were given by ChatGPT in order to make a good distribution of randomness. These can be changed to any other values.
    float randomness = fract(sin(dot(aVertexPosition, vec3(12.9898, 78.233, 54.53))) * 43758.5453);

    windStrength += randomness * 0.05; 
    windSpeed += randomness * 0.05;

    vec3 wind = vec3(0.0, 0.0, (sin(timeFactor * windSpeed)+1.0)*0.5 * windStrength * heightFactor);
    vec3 position = aVertexPosition + wind;

    vTextureCoord = aTextureCoord;

    gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
}