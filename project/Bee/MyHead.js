import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../Common/MySphere.js';
/**
 * MyHead
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHead extends CGFobject {
	constructor(scene) {
		super(scene);

        this.initObjects();
        this.initMaterials();

	}
    
    // Define both eyes and the head of the bee
    initObjects() {

        this.leftEye = new MySphere(this.scene, 16, 8);
        this.rightEye = new MySphere(this.scene, 16, 8);
        this.head = new MySphere(this.scene, 16, 8);

    }

    initMaterials() {
    
        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.setAmbient(1, 1, 1, 1);
        this.headMaterial.setDiffuse(1, 1, 1, 1);
        this.headMaterial.setSpecular(1, 1, 1, 1);
        this.headMaterial.setShininess(10.0);
        this.headMaterial.setTexture(this.scene.beeHeadTexture);
        this.headMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(1, 1, 1, 1);
        this.eyeMaterial.setDiffuse(1, 1, 1, 1);
        this.eyeMaterial.setSpecular(1, 1, 1, 1);
        this.eyeMaterial.setShininess(10.0);
        this.eyeMaterial.setTexture(this.scene.beeEyeTexture);
        this.eyeMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }
    
    display() {

        // Display the left eye
        this.scene.pushMatrix();
        this.eyeMaterial.apply();
        this.scene.translate(0.12, 0.07, 0.1);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.scene.scale(0.075, 0.05, 0.15);
        this.leftEye.display();
        this.scene.popMatrix();
        
        // Display the right eye
        this.scene.pushMatrix();
        this.eyeMaterial.apply();
        this.scene.translate(-0.12, 0.07, 0.1); 
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.scene.scale(0.075, 0.05, 0.15);
        this.rightEye.display();
        this.scene.popMatrix();
        
        // Display the head
        this.scene.pushMatrix();
        this.headMaterial.apply();
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.scene.scale(0.2, 0.15, 0.25);
        this.head.display();
        this.scene.popMatrix();


    }
	

}

