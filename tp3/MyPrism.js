import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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
			var nextSin = Math.sin(ang + alfa);
			var nextCos = Math.cos(ang + alfa);
			var cos_normal = Math.cos(ang + alfa / 2);
			var sin_normal = Math.sin(ang + alfa / 2);


			for (var j = 0; j <= this.stacks; j++) {

				var z = 1/this.stacks * j;

				this.vertices.push(cos, sin, z);
				this.vertices.push(nextCos, nextSin, z);

				var normal = [cos_normal, sin_normal, 0];

				this.normals.push(...normal);
				this.normals.push(...normal);

			}

			for (var j = 0; j < this.stacks; j++) {
				var bv = j*2 + i*(2*this.stacks+2); //stands for base vertex

				this.indices.push(bv, bv+1, bv+3);
				this.indices.push(bv, bv+3, bv+2);
			}


		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}

