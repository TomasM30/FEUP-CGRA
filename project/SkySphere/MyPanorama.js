import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);
        
        this.texture = texture;

        this.sphere = new MySphere(this.scene, 100, 100, true);

	}

    updateTexture(texture){
        this.texture = texture;
    }
	
    display() {

        this.sphereMaterial = new CGFappearance(this.scene);
        this.sphereMaterial.setTexture(this.texture);
        this.sphereMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(200,200,200);
        this.sphereMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

    }


}

