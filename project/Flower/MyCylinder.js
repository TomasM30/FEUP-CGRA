import {CGFobject} from '../../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks, height, rotationX, rotationY) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		this.height = height;
		this.rotationX = rotationX;
		this.rotationY = rotationY;

		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [];
		this.indices = [];
		this.normals = [];

		let alfa = Math.PI * 2 / this.slices;

		if (this.rotationX === Math.PI/2) {
			this.rotationX -= 0.0001; // Adjust rotationX slightly
		}

		if (this.rotationY === Math.PI/2) {
			this.rotationY -= 0.0001; // Adjust rotationY slightly
		}

		let obliquenessFactorX = Math.tan(this.rotationX);
		let obliquenessFactorY = Math.tan(this.rotationY);

		for (var i = 0; i < this.slices; i++) {

			var ang = alfa * i;
			var sin = Math.sin(ang);
			var cos = Math.cos(ang);
			for (var j = 0; j <= this.stacks; j++) {

				var z = this.height/this.stacks * j;

				var obliqueX = cos + z * obliquenessFactorX;
				var obliqueY = sin + z * obliquenessFactorY;
	
				this.vertices.push(obliqueX, obliqueY, z);
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

	display(){
		this.scene.pushMatrix();
		//this.scene.scale(this.radius, 1,this.radius);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		super.display();
		this.scene.popMatrix();
	}

	getExtremeX() {
		let obliquenessFactor = Math.tan(this.rotationX);
		return this.height * obliquenessFactor;
	}
	
	getExtremeZ() {
		let obliquenessFactor = Math.tan(this.rotationY);
		return this.height * obliquenessFactor;	}


}

