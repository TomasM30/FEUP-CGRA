import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../Common/MySphere.js';
import { MyLeg } from './MyLeg.js';

/**
 * MyTorax
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTorax extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initMaterials();
    
        this.torax = new MySphere(this.scene, 16, 8);
        
	}
    
    initMaterials() {
        this.toraxMaterial = new CGFappearance(this.scene);
        this.toraxMaterial.setAmbient(1, 1, 1, 1);
        this.toraxMaterial.setDiffuse(1, 1, 1, 1);
        this.toraxMaterial.setSpecular(1, 1, 1, 1);
        this.toraxMaterial.setShininess(10.0);
        this.toraxMaterial.setTexture(this.scene.beeToraxTexture);
        this.toraxMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }
    
    display() {
        this.scene.pushMatrix();
        this.toraxMaterial.apply();
        this.scene.scale(0.2,0.2,0.3);
        this.torax.display();
        this.scene.popMatrix();
    }
	

}

