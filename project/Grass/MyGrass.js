import {CGFobject} from '../../lib/CGF.js';
/**
 * MyGrass
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrass extends CGFobject {
	constructor(scene, stacks) {
		super(scene);
        this.stacks = stacks;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.normals = [];
        
        for (let i = 0; i < this.stacks; i++) {
        

            /*
            * x1 and x2 must be at the same distance from the center
            * (this.stacks-1) is the maximum value of i, so that the top of the triangle is at the top of the grass
            * Then, we divide by 2 in order to make it narrower (instead of 1, the max value is 0.5) 
            * The y must be the same for the two sides of the vertex
            * z1 and z2 are the inclination of the grass, and are random. We used the quadratic function to incline the grass
            * Each stack is composed by 4 vertices - 2 are duplicate and are used to make the grass be seen from both sides
            */
            let x1 = ((i/(this.stacks-1))/2) * 0.4; 
            let x2 = (1 - ((i/(this.stacks-1))/2)) * 0.4; 

            let y = i/this.stacks * 2;

            let z1 = Math.pow(x1, 2) + Math.random() * 0.1;
            let z2 = 0;
            if (i == this.stacks - 1) z2 = z1;  
            else z2 = Math.pow(x2, 2) + Math.random() * 0.1;
                

            this.vertices.push(x1, y, z1);
            this.vertices.push(x2, y, z2);
            this.vertices.push(x1, y, z1);
            this.vertices.push(x2, y, z2);

            this.normals.push(x1, y, z1);
            this.normals.push(x2, y, z2);
            this.normals.push(x1, y, z1);
            this.normals.push(x2, y, z2);

        }

		//Counter-clockwise reference of vertices
		this.indices = [];

        for (let i = 0; i < this.stacks - 1; i++) {
            
            let base = i * 4;

            //Front face
            this.indices.push(base, base + 1, base + 4);
            this.indices.push(base + 4, base + 1, base + 5);

            //Back face
            this.indices.push(base, base + 4, base + 1);
            this.indices.push(base + 4, base + 5, base + 1);
    
        }

		this.texCoords = [];

        for (let i = 0; i < this.stacks; i++) {
            
                let x1 = i/this.stacks;
                let x2 = 1 - i/this.stacks;
    
                let y = i/this.stacks * 2;
                
                this.texCoords.push(x1, y);
                this.texCoords.push(x2, y);
                this.texCoords.push(x1, y);
                this.texCoords.push(x2, y);

        }


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

