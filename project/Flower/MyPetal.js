import {CGFobject} from '../../lib/CGF.js';
import { MyTriangle } from '../Common/MyTriangle.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 * @param petalHeight - Height of the petal
 * @param curvatureAngle - Angle of curvature of the petal
 * @param heartRadius - Radius of the heart of the flower
 */
export class MyPetal extends CGFobject {
    constructor(scene, petalHeight, curvatureAngle, heartRadius) {
        super(scene);
		this.petalHeight = petalHeight;
		this.curvatureAngle = curvatureAngle;
		this.heartRadius = heartRadius;
		this.randomYangle = Math.random() * (this.maxY - this.minY) + this.minY;
        this.initObjects();
    }

	// Create the two triangles that compose the petal
    initObjects() {
		this.triangle = new MyTriangle(this.scene);
		this.triangle2 = new MyTriangle(this.scene);
	}


	// Display and transform the triangles to make an angle between the base of both so it looks like a petal
	display(){
		this.scene.pushMatrix();
		this.scene.translate(0, this.petalHeight/2*Math.sqrt(3)/2+this.heartRadius, 0);
		this.scene.scale(1, this.petalHeight/2, 1);
		this.scene.rotate(this.curvatureAngle, 1, 0, 0);
		this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, this.petalHeight/2*Math.sqrt(3)/2+this.heartRadius, 0);
		this.scene.scale(1, this.petalHeight/2, 1);
		this.scene.rotate(Math.PI, 0, 0, 1);
		this.triangle2.display();
		this.scene.popMatrix();

	}
}

