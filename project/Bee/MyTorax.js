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
        this.initObjects();

	}
    
    initObjects() {

        this.torax = new MySphere(this.scene, 16, 8);
        this.legs = [];

        for(let i = 0; i < 4; i++){
            this.legs.push(new MyLeg(this.scene, this.legMaterial));
        }

    }

    initMaterials() {
    
        this.toraxMaterial = new CGFappearance(this.scene);
        this.toraxMaterial.setAmbient(1, 1, 1, 1);
        this.toraxMaterial.setDiffuse(1, 1, 1, 1);
        this.toraxMaterial.setSpecular(1, 1, 1, 1);
        this.toraxMaterial.setShininess(10.0);
        this.toraxMaterial.setTexture(this.scene.beeToraxTexture);
        this.toraxMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.legMaterial = new CGFappearance(this.scene);
        this.legMaterial.setAmbient(1, 1, 1, 1);
        this.legMaterial.setDiffuse(1, 1, 1, 1);
        this.legMaterial.setSpecular(1, 1, 1, 1);
        this.legMaterial.setShininess(10.0);
        this.legMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.legMaterial.setTexture(this.scene.beeLegTexture);

    }
    
    display() {

        this.scene.pushMatrix();
        this.toraxMaterial.apply();
        this.scene.scale(3,3,3);
        this.torax.display();
        this.scene.popMatrix();

        for (let i = 0; i < 4; i++) {
            this.scene.pushMatrix();
            let side = i < 2 ? -1 : 1;
            let position = i % 2;
            this.scene.translate(side*2, -2, position * 3 - 1.5);
            if(side === 1) {
                this.scene.rotate(Math.PI, 0, 1, 0);
            }
            this.scene.scale(0.5, 1, 0.5);
            this.legs[i].display();
            this.scene.popMatrix();
        }

        /*
        for(let i = 0; i < 6; i++){
            this.scene.pushMatrix();
            let side = i < 3 ? -1 : 1;
            let position = i % 3;
            this.scene.translate(0, 0, position * 10);
            if(side === 1) {
                this.scene.rotate(Math.PI, 0, 1, 0);
            }
            this.scene.scale(0.5, 1, 0.5);
            this.legs[i].display();
            this.scene.popMatrix();
        }
        */

    }
	

}

