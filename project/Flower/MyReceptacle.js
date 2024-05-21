import {CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../Common/MySphere.js';

/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices of the sphere
 * @param stacks - Number of stacks of the sphere
 */
export class MyReceptacle extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

        this.sphere = new MySphere(this.scene, this.slices, this.stacks);

		this.initBuffers();
	}
	
    display(){

		this.scene.pushMatrix();
        this.sphere.display();
		this.scene.popMatrix();
		

    }

}

