import {CGFobject} from '../../lib/CGF.js';
/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of slices
 * @param stacks - number of stacks
 */
export class MyRock extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}
	
	/**
	 * The rock is a sphere with simple randomization of the vertices
	 * For each vertex, the x,y and z values are randomized between 0.9 and 1.1, 
	 * and the top and bottom vertices y are randomized before the loop, so that the rock is perfectly round
	 * Then, it goes for each slice and stack, creating the vertices, normals and texCoords
	 * For each slice, it created stacks+1 vertices, and the first and last slice are the same
	 */
	initBuffers() {

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let stacks = ((this.stacks+1)*2);

		//Define top and bottom vertices
		let bottom_y_rand = Math.random() * 0.2 + 0.9;
		let top_y_rand = Math.random() * 0.2 + 0.9;

		let alpha = (2*Math.PI) / this.slices; //increments on XZ
		let beta = Math.PI/ stacks; //increments on XY

		let dec_text_x = 1/this.slices;
		let dec_text_y = 1/(stacks+1);

		let text_x = 1;

		for (let i = 0; i < this.slices; i++){

			let angXZ = i * alpha;

			let text_y = 1;
			
			for (let j = 0; j <= stacks; j++){

				let angXY = -Math.PI/2 + j * beta;

				let x = Math.cos(angXZ) * Math.cos(angXY);
				let y = Math.sin(angXY);
				let z = Math.sin(angXZ) * Math.cos(angXY);

                //Randomize the size of the rock (values between 0.9 and 1.1)
                let rand = Math.random() * 0.2 + 0.9;

				if (j == 0 ) {
					this.vertices.push(x*rand, y*bottom_y_rand, z*rand);
				}
				else if (j == stacks){
					this.vertices.push(x*rand, y*top_y_rand, z*rand);
				}
				else {
					this.vertices.push(x*rand, y*rand, z*rand);
				}

				this.normals.push(x, y, z);

				this.texCoords.push(text_x, text_y);

				text_y -= dec_text_y;

			}	

			text_x -= dec_text_x;

		}

        let text_y = 1;

		// First and Last slice are the same
        for (let i = 0; i <= stacks; i++){

            let x = this.vertices[i*3]
            let y = this.vertices[i*3 + 1]
            let z = this.vertices[i*3 + 2]

            this.vertices.push(x, y, z);
            this.normals.push(x, y, z);

            this.texCoords.push(text_x, text_y);

            text_y -= dec_text_y;

        }

		for (let i = 0; i < this.slices; i++){
			
			for (let j = 1; j < stacks -1; j++){

				let baseIndex = i* (stacks+1) +j;

                this.indices.push(baseIndex, baseIndex+1, baseIndex+stacks+1);
                this.indices.push(baseIndex+stacks+1, baseIndex+1, baseIndex+stacks+2);

			}
		}

		//Bottom Vertex indices
		for (let i = 0; i < this.slices; i++){

            let baseIndex = i* (stacks+1) + 1;
            this.indices.push(baseIndex, baseIndex+stacks+1, baseIndex-1);

		}

		
		//Top Vertex indices
		for (let i = 0; i < this.slices; i++){

            let baseIndex = i* (stacks+1) + (stacks-1);
            this.indices.push(baseIndex, baseIndex+1, baseIndex+stacks+1);
        
        }


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}

