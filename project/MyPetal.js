import {CGFobject} from '../lib/CGF.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
    constructor(scene, petalHeight) {
        super(scene);
		this.petalHeight = petalHeight;
        this.initBuffers();
    }

    initBuffers() {
		// Define vertices for two isosceles unitary triangles united from their bases
		this.vertices = [
			0, 0, 0, // vertex 0
			0.5, Math.sqrt(3)/2, 0, // vertex 1
			-0.5, Math.sqrt(3)/2, 0, // vertex 2
			0, Math.sqrt(3), 0 // vertex 3
		];
		this.indices = [
			0, 1, 2, // first triangle (front)
			0, 2, 1, // first triangle (back)
			1, 3, 2, // second triangle (front)
			1, 2, 3 // second triangle (back)
		];
		this.normals = [
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	display(){
		this.scene.pushMatrix();
		this.scene.scale(1, this.petalHeight, 1);
		super.display();
		this.scene.popMatrix();
	}
}

