import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyCylinder } from '../Common/MyCylinder.js';

/**
 * MyAntennae
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAntennae extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cilynders = [];
        this.initObjects();
    }

    initObjects(){
        let cylinder1 = new MyCylinder(this.scene, 30, 30, 1.5, 0, 0);
        this.cilynders.push(cylinder1);

        let cylinder2 = new MyCylinder(this.scene, 30, 30, 1, 0,Math.PI/2.5);
        this.cilynders.push(cylinder2);

    }

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