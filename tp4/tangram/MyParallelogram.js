import {CGFobject} from '../../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene, color) {
		super(scene);
		this.initBuffers(color);
	}
	
	initBuffers(color) {
		this.vertices = [
			// Front face
            0, 0, 0,    //0: origin point
            2, 0, 0,    //1: right point
            1, 1, 0,     //2: top point
			3, 1, 0,	//3: right top point

			// Back face
			0, 0, 0,    //4: origin point
			2, 0, 0,    //5: right point
			1, 1, 0,     //6: top point
			3, 1, 0		//7: right top point
        ];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			2, 3, 1,
	
			5, 6, 4,
			5, 7, 6

		];

		this.normals = [
			// Front face
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			// Back face
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		]

		if (color == "yellow") {
			this.texCoords = [
				// Front face
				1, 1,
				0.5, 1,
				0.75, 0.75,
				0.25, 0.75,
	
				// Back face
				1, 1,
				0.5, 1,
				0.75, 0.75,
				0.25, 0.75
			]
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

