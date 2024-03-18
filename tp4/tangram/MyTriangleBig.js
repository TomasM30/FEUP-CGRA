import {CGFobject} from '../../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
	constructor(scene, color) {
		super(scene);
		this.initBuffers(color);
	}
	
	initBuffers(color) {
		this.vertices = [

			// Front face
            -2, 0, 0,    //0: origin point
            2, 0, 0,    //1: right point
            0, 2, 0,     //2: top point

			// Back face
			-2, 0, 0,    //3: origin point
			2, 0, 0,    //4: right point
			0, 2, 0     //5: top point
        ];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2, // Front face
			3, 5, 4  // Back face
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		if(color == "orange"){
			this.texCoords = [
				1, 1,
				1, 0,
				0.5, 0.5,
				1, 1,
				1, 0,
				0.5, 0.5
			];
		} else {
			this.texCoords = [
				0, 0,
				1, 0,
				0.5, 0.5,
				0, 0,
				1, 0,
				0.5, 0.5
			];
		}


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

