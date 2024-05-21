import {CGFobject} from '../../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices of the cylinder
 * @param stacks - Number of stacks of the cylinder
 * @param height - Height of the cylinder
 * @param rotationX - Rotation on the X axis
 * @param rotationY - Rotation on the Y axis
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
	

	/**
	 * Initializes the cylinder object
	 * Cylinder with oblique sides and parallel bases
	 */
	initBuffers() {

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let alfa = Math.PI * 2 / this.slices;

		if (this.rotationX === Math.PI/2) {
			this.rotationX -= 0.0001;
		}

		if (this.rotationY === Math.PI/2) {
			this.rotationY -= 0.0001;
		}

		let obliquenessFactorX = Math.tan(this.rotationX);
		let obliquenessFactorY = Math.tan(this.rotationY);


		let text_x = 0;

		for (var i = 0; i < this.slices; i++) {

			let text_y = 0;

			var ang = alfa * i;
			var sin = Math.sin(ang);
			var cos = Math.cos(ang);
			for (var j = 0; j <= this.stacks; j++) {

				var z = this.height/this.stacks * j;

				var obliqueX = cos + z * obliquenessFactorX;
				var obliqueY = sin + z * obliquenessFactorY;
	
				this.vertices.push(obliqueX, obliqueY, z);
				this.normals.push(cos, sin, 0);
				this.texCoords.push(text_x, text_y);

				text_y += 1/this.stacks;
			}

			text_x += 1/this.slices;

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
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		super.display();
		this.scene.popMatrix();
	}

	/**
	 * Function to get the extreme x coordinate of the cylinder used to translate the next object
	 * @returns the extreme x coordinate of the cylinder
	 */
	getExtremeX() {
		let obliquenessFactor = Math.tan(this.rotationX);
		return this.height * obliquenessFactor;
	}
	
	/**
	 * Function to get the extreme z coordinate of the cylinder used to translate the next object
	 * @returns the extreme z coordinate of the cylinder
	 */
	getExtremeZ() {
		let obliquenessFactor = Math.tan(this.rotationY);
		return this.height * obliquenessFactor;	}


}

