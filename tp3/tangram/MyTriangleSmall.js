import {CGFobject} from '../../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [

			// Front face

            -1, 0, 0,   //0: origin point
            1, 0, 0,    //1: right point
            0, 1, 0,     //2: top point
			
			// Back face
			-1, 0, 0,   //3: origin point
			1, 0, 0,    //4: right point
			0, 1, 0     //5: top point
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

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

