import {CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../Common/MySphere.js';

/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
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
        this.scene.scale(1, 1, 1);
        this.sphere.display();
		this.scene.popMatrix();
		

    }

}

