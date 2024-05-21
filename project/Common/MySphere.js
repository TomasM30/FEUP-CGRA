import {CGFobject, CGFappearance} from '../../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of slices around the sphere
 * @param stacks - number of stacks along the sphere
 * @param inverted - boolean to invert the sphere, useful for the panorama
 * @param topScale - scale of the top of the sphere, useful for Polen
 * @param bottomScale - scale of the bottom of the sphere, useful for Polen
 */
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks, inverted = false, topScale = 1, bottomScale = 1) {
		super(scene);

        this.slices = slices;
        this.stacks = stacks;
        this.inverted = inverted;
        this.topScale = topScale;
        this.bottomScale = bottomScale;

		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let stacks = ((this.stacks+1)*2);

		let alpha = (2*Math.PI) / this.slices; //increments on XZ
		let beta = Math.PI/ stacks; //increments on XY

		let dec_text_x = 1/this.slices;
		let dec_text_y = 1/(stacks+1);

		let text_x = 1;

		/**
		 * The sphere is created by creating a vertex for each stack and slice
		 * It goes through each slice and creates stacks+1 vertices
		 * If the Inverted flag is set, the sphere is created inside out.
		 * To do this, the normals are inverted.
		 * The y value is also scaled by the topScale or bottomScale, depending on the hemisphere.
		 */
		for (let i = 0; i <= this.slices; i++){

			let angXZ = i * alpha;

			let text_y = 1;
			
			for (let j = 0; j <= stacks; j++){

				let angXY = -Math.PI/2 + j * beta;

				let x = Math.cos(angXZ) * Math.cos(angXY);
				let y = Math.sin(angXY);
				let z = Math.sin(angXZ) * Math.cos(angXY);

				if (y >= 0) {
					y *= this.topScale;
				} else {
					y *= this.bottomScale;
				}

				this.vertices.push(x, y, z);

				if (this.inverted){
					x = -x;
					y = -y;
					z = -z;
				}

				this.normals.push(x, y, z);

				this.texCoords.push(text_x, text_y);

				text_y -= dec_text_y;

			}	

			text_x -= dec_text_x;

		}

		/**
		 * The sphere is drawn by creating two triangles for each stack and slice
		 * ignoring the top and bottom vertices
		 */
		for (let i = 0; i < this.slices; i++){
			
			for (let j = 1; j < stacks -1; j++){

				let baseIndex = i* (stacks+1) +j;

				if(this.inverted){
					this.indices.push(baseIndex, baseIndex+stacks+1, baseIndex+1);
					this.indices.push(baseIndex+stacks+1, baseIndex+stacks+2, baseIndex+1);
				} else {
					this.indices.push(baseIndex, baseIndex+1, baseIndex+stacks+1);
					this.indices.push(baseIndex+stacks+1, baseIndex+1, baseIndex+stacks+2);
				}


			}
		}


		/**
		 * For the top and bottom vertices, the triangles are created by connecting the vertices on top
		 * If the sphere is inverted, we also need to invert the order of the vertices
		 */
		//Bottom Vertex indices
		for (let i = 0; i < this.slices; i++){

				let baseIndex = i* (stacks+1) + 1;

				if(this.inverted){
					this.indices.push(baseIndex, baseIndex-1, baseIndex+stacks+1);
				}
				else {
					this.indices.push(baseIndex, baseIndex+stacks+1, baseIndex-1);
				}
		}

		//Top Vertex indices
		for (let i = 0; i < this.slices; i++){

				let baseIndex = i* (stacks+1) + (stacks-1);

				if (this.inverted) {
					this.indices.push(baseIndex, baseIndex+stacks+1, baseIndex+1);
				}
				else {
					this.indices.push(baseIndex, baseIndex+1, baseIndex+stacks+1);
				}
		}


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}

