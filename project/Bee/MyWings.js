import {CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../Common/MySphere.js';

/**
 * MyWings
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWings extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initObjects();
        this.angle = 0;
    }
    
    /**
     * Initializes the wings of the bee.
     * The wings are composed by 4 wings, been 2 on each side.
     * The wings are spheres that are rotated and translated to the correct position.
     */
    initObjects() {
        this.wing1 = new MySphere(this.scene, 16, 8);
        this.wing2 = new MySphere(this.scene, 16, 8);
        this.wing3 = new MySphere(this.scene, 16, 8);
        this.wing4 = new MySphere(this.scene, 16, 8);
    }

    /**
     * Updates the angle of the wings.
     * It's called on every update of the scene.
     * @param {Number} timeSinceAppStart Time since the application started.
     */
    update(timeSinceAppStart) {
        this.angle= Math.PI * (Math.sin(timeSinceAppStart*4*Math.PI) * 0.25);
    }

    /**
     * Displays the wings of the bee.
     * For each wing, it rotates and translates it to the correct position.
     * Then, translates it to the the torax of the bee.
     */
    display() {

        this.scene.pushMatrix();
        this.scene.translate(0, 0.1, 0.35);

        // Display wing1
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6+this.angle, 0, 0, 1);
        this.scene.translate(0.1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.1, 0.025, 0.2);
        this.scene.translate(0, 0, 1);
        this.wing1.display();
        this.scene.popMatrix();

        // Display wing2
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/20 +this.angle, 0, 0, 1);
        this.scene.translate(0.1, 0, 0);
        this.scene.rotate(1.2*Math.PI/2, 0, 1, 0);
        this.scene.scale(0.1, 0.025, 0.4);
        this.scene.translate(0, 0, 1);
        this.wing2.display();
        this.scene.popMatrix();

        // Display wing3
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/6-this.angle, 0, 0, 1);
        this.scene.translate(-0.1, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(0.1, 0.025, 0.2);
        this.scene.translate(0, 0, 1);
        this.wing3.display();
        this.scene.popMatrix();

        // Display wing4
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/20-this.angle, 0, 0, 1);
        this.scene.translate(-0.1, 0, 0);
        this.scene.rotate(-1.2*Math.PI/2, 0, 1, 0);
        this.scene.scale(0.1, 0.025, 0.4);
        this.scene.translate(0, 0, 1);
        this.wing4.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

    }
}