import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../Common/MySphere.js';
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - texture to be applied to the sphere
 */
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);
        
        this.texture = texture;

        this.sphere = new MySphere(this.scene, 30, 30, true);

	}

    /**
     * Updates the texture of the sphere
     * This function is called when the user changes the texture in the interface
     */
    updateTexture(texture){
        this.texture = texture;
    }
	
    /**
     * Displays the sphere with the texture
     * The sphere created is inverted so that the texture is displayed inside the sphere
     * The sphere is scaled to 200 so that it covers the entire screen
     * The sphere is translated to the camera position so that the sphere is always around the camera
     */
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

