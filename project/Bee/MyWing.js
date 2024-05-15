import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../Common/MySphere.js';

export class MyWing extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initObjects();
    }
    
    initObjects() {
        this.base = new MySphere(this.scene, 16, 8);
        this.wing = new MySphere(this.scene, 16, 8);
    }

    display() {

        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.1, 0.25);
        this.base.display();
        this.scene.popMatrix();

        // Display wing
        this.scene.pushMatrix();
        this.scene.translate(1.5, 0, 0);
        this.scene.scale(1.5, 0.1, 0.4);
        this.wing.display();
        this.scene.popMatrix();
    }
}