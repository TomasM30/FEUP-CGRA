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
			-0.5, -0.5, -0.5, //0
            -0.5, 0.5, -0.5, //1
            0.5, -0.5, -0.5, //2
            0.5, 0.5, -0.5, //3
            -0.5, -0.5, 0.5, //4
            -0.5, 0.5, 0.5, //5
            0.5, -0.5, 0.5, //6
            0.5, 0.5, 0.5, //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [

            //face de baixo
            2, 4, 0,
            2, 6, 4,

            //face de trás
            0, 1, 2,
            2, 1, 3,

            //face da direita
            6, 2, 3,
            6, 3, 7,

            //face da esquerda
            0, 5, 1,
            0, 4, 5,

            //face de cima
            3, 1, 5,
            3, 5, 7,

            //face da frente
            4, 7, 5,
            4, 6, 7,


		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

