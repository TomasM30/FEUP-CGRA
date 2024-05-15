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
    
    initObjects() {

        this.leftEye = new MySphere(this.scene, 16, 8);
        this.rightEye = new MySphere(this.scene, 16, 8);
        this.head = new MySphere(this.scene, 16, 8);

    }

    initMaterials() {
    
        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.headMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.headMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.headMaterial.setShininess(10.0);
        this.headMaterial.setTexture(this.scene.beeHeadTexture);
        this.headMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.eyeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eyeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.eyeMaterial.setShininess(10.0);
        this.headMaterial.setTexture(this.scene.beeEyeTexture);
        this.eyeMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }
    
    display() {

        this.scene.pushMatrix();
        this.scene.translate(5.5, 0, 0);
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.scene.scale(0.8, 0.8, 1);
        this.leftEye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-5.5, 0, 0);
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.scene.scale(0.8, 0.8, 1);
        this.rightEye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.scene.scale(3, 3, 4);
        this.head.display();
        this.scene.popMatrix();


    }
	

}

