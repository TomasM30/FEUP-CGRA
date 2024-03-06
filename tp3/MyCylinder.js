import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
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
	
		var ang = 0;
		var alphaAng = 2*Math.PI/this.slices;
	
		for(var i = 0; i <= this.slices; i++){
			var sa=Math.sin(ang);
			var ca=Math.cos(ang);
	
			for (var j = 0; j <= this.stacks; j++){
				var z = j / this.stacks;
				this.vertices.push(ca, sa, z);
				this.normals.push(ca, sa, 0);
			}
	
			ang += alphaAng;
		}
	
		for(var i = 0; i < this.slices; i++){
			for (var j = 0; j < this.stacks; j++) {
				var base = i*(this.stacks+1) + j;
				this.indices.push(base, base + this.stacks + 1, base + 1);
				this.indices.push(base + 1, base + this.stacks + 1, base + this.stacks + 2);
			}
		}
	
		this.primitiveType = this.scene.gl.TRIANGLES;
	
		this.initGLBuffers();
	}

	display() {
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.translate(0, 0, -0.5);
		super.display();
    }
}

