import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyCylinder } from '../Common/MyCylinder.js';

/**
 * MyLeg
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeg extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cilynders = [];
        this.initObjects();
    }

    /**
     * My Leg consists of two cylinders, one on top of the other
     * The second cylinder is slightly rotated to give the leg a more natural look
     */
    initObjects(){
        let cylinder1 = new MyCylinder(this.scene, 30, 30, 1, 0, 0);
        this.cilynders.push(cylinder1);

        let cylinder2 = new MyCylinder(this.scene, 30, 30, 2.5, 0, Math.PI/2.6);
        this.cilynders.push(cylinder2);

    }

    /**
     * The display function just goes through the two cylinders and displays them
     * The second cylinder is translated to the bottom of the first cylinder
     */
    display(){

        let totalHeight = 0;
        let xTranslation = 0;
        let zTranslation = 0;
        for(let i = 0; i < 2; i++){
            
            this.scene.pushMatrix();
            this.scene.translate(xTranslation, -totalHeight, zTranslation);
            this.cilynders[i].display();
            this.scene.popMatrix();
            totalHeight += this.cilynders[i].height;
            xTranslation += this.cilynders[i].getExtremeX();
            zTranslation += this.cilynders[i].getExtremeZ();

        }

    }
}