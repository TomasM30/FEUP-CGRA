import {CGFobject} from '../lib/CGF.js';

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [];
		this.indices = [];
		this.normals = [];

		let alfa = Math.PI * 2 / this.slices;

		for (var i = 0; i < this.slices; i++) {

			var ang = alfa * i;
			var sin = Math.sin(ang);
			var cos = Math.cos(ang);
			for (var j = 0; j <= this.stacks; j++) {

				var z = 1/this.stacks * j;

				this.vertices.push(cos, sin, z);
				this.normals.push(cos, sin, 0);
			}

		}

		for (var i = 0; i < this.slices-1; i++) {
			for (var j = 0; j < this.stacks; j++) {
				var bv = j + i*(this.stacks+1); //stands for base vertex

				this.indices.push(bv, bv+(this.stacks+1), bv+(this.stacks+1)+1);
				this.indices.push(bv, bv+(this.stacks+1)+1, bv+1);
				}
		}

		for (var j = 0; j < this.stacks; j++) {

			var lv = (this.slices-1)*(this.stacks+1) + j; //stands for last vertex
			this.indices.push(lv, j, j+1);
			this.indices.push(lv, j+1, lv+1);
		
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}

