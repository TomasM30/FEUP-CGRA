import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../Common/MySphere.js';
import { MyLeg } from './MyLeg.js';

/**
 * MyAbdomen class
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAbdomen extends CGFobject {
    constructor(scene) {
        super(scene);

        // Initialize materials for the abdomen
        this.initMaterials();

        // Create a new sphere object for the abdomen
        this.abdomen = new MySphere(this.scene, 16, 8);
    }

    /**
     * Initialize the materials for the abdomen.
     */
    initMaterials() {
        this.abdomenMaterial = new CGFappearance(this.scene);

        this.abdomenMaterial.setAmbient(1, 1, 1, 1);
        this.abdomenMaterial.setDiffuse(1, 1, 1, 1);
        this.abdomenMaterial.setSpecular(1, 1, 1, 1);
        this.abdomenMaterial.setShininess(10.0);
        this.abdomenMaterial.setTexture(this.scene.beeAbdomenTexture);
        this.abdomenMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }
    
    /**
     * Display the abdomen on the scene.
     */
    display() {
        // Save the current state of the scene
        this.scene.pushMatrix();

        // Apply the material to the abdomen
        this.abdomenMaterial.apply();

        // Rotate the abdomen to the correct orientation
        this.scene.rotate(-Math.PI/8, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);

        // Scale the abdomen to the correct size
        this.scene.scale(0.25,0.5,0.25);

        // Display the abdomen
        this.abdomen.display();
        this.scene.popMatrix();
    }
}