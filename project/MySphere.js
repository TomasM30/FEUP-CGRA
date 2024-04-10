import {CGFobject} from '../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
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
        this.texCoords = [];

		let alpha = (2*Math.PI) / (2*this.slices); //increments on XZ
		let beta = Math.PI / (2*this.stacks); //increments on XY


		for (let i = 0; i < this.stacks; i++){
			let angXY = i * beta;
			for (let j = 0; j < (this.slices*2); j++){
				let angXZ = j * alpha;
				
				let r = Math.cos(angXY); //radius of the circle on XY plane

				let x =  Math.cos(angXZ) * r;
				let y =  Math.sin(angXY);
				let z =  Math.sin(angXZ) * r; 


				this.vertices.push(x, y, z);
				this.normals.push(x, y, z);
				
			}
		}

		
		for (let i = 0; i < this.stacks; i++){
			for (let j = 0; j < (this.slices*2); j++){

				let base_vertex = i * (this.slices*2);

				this.indices.push(first, third, second);
				this.indices.push(third, fourth, second);
			}
		}


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}

