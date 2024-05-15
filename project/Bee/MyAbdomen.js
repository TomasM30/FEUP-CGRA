import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../Common/MySphere.js';
import { MyLeg } from './MyLeg.js';

/**
 * MyAbdomen
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAbdomen extends CGFobject {
	constructor(scene) {
		super(scene);

        this.initMaterials();
        this.abdomen = new MySphere(this.scene, 16, 8);
	}

    initMaterials() {
        this.abdomenMaterial = new CGFappearance(this.scene);
        this.abdomenMaterial.setAmbient(1, 1, 1, 1);
        this.abdomenMaterial.setDiffuse(1, 1, 1, 1);
        this.abdomenMaterial.setSpecular(1, 1, 1, 1);
        this.abdomenMaterial.setShininess(10.0);
        this.abdomenMaterial.setTexture(this.scene.beeAbdomenTexture);
        this.abdomenMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }
    
    display() {

        this.scene.pushMatrix();
        this.abdomenMaterial.apply();
        this.scene.rotate(-Math.PI/8, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.25,0.5,0.25);
        this.abdomen.display();
        this.scene.popMatrix();

    }
	

}

