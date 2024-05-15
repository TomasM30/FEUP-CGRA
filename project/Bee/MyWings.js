import {CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../Common/MySphere.js';

export class MyWings extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initObjects();
        this.angle = 0;
    }
    
    initObjects() {
        this.wing1 = new MySphere(this.scene, 16, 8);
        this.wing2 = new MySphere(this.scene, 16, 8);
        this.wing3 = new MySphere(this.scene, 16, 8);
        this.wing4 = new MySphere(this.scene, 16, 8);
    }

    update(timeSinceAppStart) {
        this.angle= Math.PI * (Math.sin(timeSinceAppStart*3*Math.PI) * 0.25);
    }


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