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
		
                  //face de baixo
                  -0.5, -0.5, -0.5, //0
                  -0.5, 0.5, -0.5, //1
                  0.5, -0.5, -0.5, //2
                  0.5, 0.5, -0.5, //3

                  //face de trás
                  -0.5, -0.5, -0.5, //4
                  -0.5, 0.5, -0.5, //5
                  -0.5, -0.5, 0.5, //6
                  -0.5, 0.5, 0.5, //7

                  //face da direita
                  -0.5, 0.5, -0.5, //8
                  -0.5, 0.5,  0.5, //9
                  0.5, 0.5, -0.5, //10
                  0.5, 0.5, 0.5, //11

                  //face da esquerda
                  -0.5, -0.5, -0.5, //12
                  -0.5, -0.5, 0.5, //13
                  0.5, -0.5, -0.5, //14
                  0.5, -0.5, 0.5, //15

                  //face de cima
                  0.5, -0.5, 0.5, //16
                  0.5, 0.5, 0.5, //17
                  -0.5, -0.5, 0.5, //18
                  -0.5, 0.5, 0.5, //19

                  //face da frente
                  0.5, -0.5, -0.5, //20
                  0.5, 0.5, -0.5, //21
                  0.5, -0.5, 0.5, //22
                  0.5, 0.5, 0.5, //23

		];

		//Counter-clockwise reference of vertices
		this.indices = [

                  // face de trás
                  0, 1, 2,
                  1, 3, 2,

                  // face da esquerda
                  4, 6, 7,
                  4, 7, 5,

                  // face de cima
                  8, 9, 10,
                  9, 11, 10,
                  
                  // face de baixo
                  12, 14, 15,
                  12, 15, 13,
                  
                  // face da frente
                  16, 17, 18,
                  17, 19, 18,
                  
                  // face da direita
                  20, 21, 22,
                  23, 22, 21,

		];

            this.normals = [
                  //face de baixo
                  0, 0, -1,
                  0, 0, -1,
                  0, 0, -1,
                  0, 0, -1,

                  //face de trás
                  -1, 0, 0,
                  -1, 0, 0,
                  -1, 0, 0,
                  -1, 0, 0,
                  
                  //face da direita
                  0, 1, 0,
                  0, 1, 0,
                  0, 1, 0,
                  0, 1, 0,

                  //face da esquerda
                  0, -1, 0,
                  0, -1, 0,
                  0, -1, 0,
                  0, -1, 0,

                  //face de cima
                  0, 0, 1,
                  0, 0, 1,
                  0, 0, 1,
                  0, 0, 1,
                  
                  //face da frente
                  1, 0, 0,
                  1, 0, 0,
                  1, 0, 0,
                  1, 0, 0

            ]


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

