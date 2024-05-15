import {CGFobject} from '../../lib/CGF.js';
import { MyCylinder } from "../Common/MyCylinder.js";
import { MyTriangle } from "../Common/MyTriangle.js";

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initObjects();
    }

    initObjects(){
        this.triangle1 = new MyTriangle(this.scene);
        this.triangle2 = new MyTriangle(this.scene);
        this.stemLeaf = new MyCylinder(this.scene, 30, 30, 1, 0, 0);
    }

    display(){

        this.scene.pushMatrix();
            this.scene.translate(0, 0.5, 0);
            this.scene.translate(0, Math.sqrt(3) / 2, 0);
            this.triangle1.display();
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.triangle2.display();
            this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, (Math.sqrt(3)+0.5), 0);
        this.scene.scale(0.02, (Math.sqrt(3))+0.5, 0.02);
        this.stemLeaf.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.popMatrix();

    }
}