import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
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
	
		//Counter-clockwise reference of vertices
		this.indices = [];
		this.normals = [];

		var ang = 0;
		var alphaAng = 2*Math.PI/this.slices;

		for(var i = 0; i < this.slices; i++){
			var sa=Math.sin(ang);
			var saa=Math.sin(ang+alphaAng);
			var ca=Math.cos(ang);
			var caa=Math.cos(ang+alphaAng);
	
			var z = 0;
	
			for (var j =0; j<=this.stacks; j++){
				this.vertices.push(ca, sa, z);
				this.vertices.push(caa, saa, z);

				var normal= [
					(saa-sa),
					-(caa-ca),
					0
				];

				this.normals.push(...normal);
				this.normals.push(...normal);


				z += 1/this.stacks;
			}

			for (var j = 0; j < this.stacks; j++) {
				var base = 2*i*(this.stacks+1) + 2*j;
				this.indices.push(base+1, base + 2, base);
				this.indices.push(base + 3, base + 2, base + 1);
			}	
			ang += alphaAng;
		}
	
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
	
		this.initGLBuffers();
	}
}

