import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
                  
                  //Bottom face
                  -0.5, -0.5, -0.5, //0
                  -0.5, 0.5, -0.5, //1
                  0.5, -0.5, -0.5, //2
                  0.5, 0.5, -0.5, //3

                  //Top face
                  -0.5, -0.5, 0.5, //4
                  -0.5, 0.5, 0.5, //5
                  0.5, -0.5, 0.5, //6
                  0.5, 0.5, 0.5, //7

                  //Front face
                  -0.5, -0.5, -0.5, //8
                  -0.5, 0.5, -0.5, //9
                  -0.5, -0.5, 0.5, //10
                  -0.5, 0.5, 0.5, //11

                  //Back face
                  0.5, -0.5, -0.5, //12
                  0.5, 0.5, -0.5, //13
                  0.5, -0.5, 0.5, //14
                  0.5, 0.5, 0.5, //15

                  //Right face
                  -0.5, -0.5, -0.5, //16
                  -0.5, -0.5, 0.5, //17
                  0.5, -0.5, -0.5, //18
                  0.5, -0.5, 0.5, //19

                  //Left face
                  -0.5, 0.5, -0.5, //20
                  -0.5, 0.5, 0.5, //21
                  0.5, 0.5, -0.5, //22
                  0.5, 0.5, 0.5, //23
		];

		//Counter-clockwise reference of vertices
		this.indices = [

                  //Bottom face
                  0,1,2, 
                  2,1,3,

                  //Top face
                  4,6,5,
                  6,7,5,

                  //Front face
                  10,9,8,
                  10,11,9,

                  //Back face
                  12,13,14,
                  14,13,15,

                  //Right face
                  18,17,16,
                  18,19,17,

                  //Left face
                  20,21,22,
                  22,21,23

		];

            this.normals = [
                  // Bottom face
                  0, 0, -1,
                  0, 0, -1,
                  0, 0, -1,
                  0, 0, -1,
          
                  // Top face
                  0, 0, 1,
                  0, 0, 1,
                  0, 0, 1,
                  0, 0, 1,
      
                  // 0ront face
                  -1, 0, 0,
                  -1, 0, 0,
                  -1, 0, 0,
                  -1, 0, 0,
      
                  // 0ack face
                  1, 0, 0,
                  1, 0, 0,
                  1, 0, 0,
                  1, 0, 0,
          
                  // Left face
                  0, -1, 0,
                  0, -1, 0,
                  0, -1, 0,
                  0, -1, 0,
          
                  // Right face
                  0, 1, 0,
                  0, 1, 0,
                  0, 1, 0,
                  0, 1, 0,
              ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

