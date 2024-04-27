import {CGFobject} from '../../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
    constructor(scene, petalHeight, curvatureAngle, minY, maxY, heartRadius) {
        super(scene);
		this.petalHeight = petalHeight;
		this.curvatureAngle = curvatureAngle;
		this.minY = minY;
		this.maxY = maxY;
		this.heartRadius = heartRadius;
		this.randomYangle = Math.random() * (this.maxY - this.minY) + this.minY;
        this.initObjects();
    }

    initObjects() {
		this.triangle = new MyTriangle(this.scene);
		this.triangle2 = new MyTriangle(this.scene);
	}

	display(){
		this.scene.pushMatrix();
		this.scene.rotate(this.randomYangle,1,0,0);
		this.scene.translate(0, this.petalHeight/2*Math.sqrt(3)/2+this.heartRadius, 0);
		this.scene.scale(1, this.petalHeight/2, 1);
		this.scene.rotate(this.curvatureAngle, 1, 0, 0);
		this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(this.randomYangle,1,0,0);
		this.scene.translate(0, this.petalHeight/2*Math.sqrt(3)/2+this.heartRadius, 0);
		this.scene.scale(1, this.petalHeight/2, 1);
		this.scene.rotate(Math.PI, 0, 0, 1);
		this.triangle2.display();
		this.scene.popMatrix();

	}
}

