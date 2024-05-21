import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../Common/MySphere.js';

/**
 * MyPollen
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPollen extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initObjects();
        this.initMaterials();
	}

    /**
     * Pollen object - sphere enlongated too look like an 'egg'
     * The sphere is rotated to give a more natural look - rotationAngle
     */
    initObjects(){
        this.pollen = new MySphere(this.scene, 16, 10, false, 1.5, 1);
        this.rotationAngle = Math.random() * Math.PI/2 - Math.PI/4;
        }

    initMaterials(){
        this.pollenMaterial = new CGFappearance(this.scene);
        this.pollenMaterial.setAmbient(1, 1, 1, 1);
        this.pollenMaterial.setDiffuse(1, 1, 1, 1);
        this.pollenMaterial.setSpecular(1, 1, 1, 1);
        this.pollenMaterial.setShininess(10.0);
        this.pollenMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.pollenMaterial.setTexture(this.scene.pollenTexture);
    }

    display(){

        // Display the pollen object and rotate it
        this.scene.pushMatrix();
        this.scene.rotate(this.rotationAngle, 1, 0, 0);
        this.scene.translate(0, 1, 0);
        this.pollenMaterial.apply();
        this.pollen.display();
        this.scene.popMatrix();
    }
	

}

