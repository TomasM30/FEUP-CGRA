import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyCylinder } from '../Common/MyCylinder.js';

/**
 * MyLeg
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeg extends CGFobject {
    constructor(scene, legMaterial) {
        super(scene);
        this.legMaterial = legMaterial;
        this.cilynders = [];
        this.initObjects();
    }

    initObjects(){
        let cylinder1 = new MyCylinder(this.scene, 30, 30, 1, Math.PI/4, 0);
        this.cilynders.push(cylinder1);

        let cylinder2 = new MyCylinder(this.scene, 30, 30, 2, Math.PI/7, 0);
        this.cilynders.push(cylinder2);

        let cylinder3 = new MyCylinder(this.scene, 30, 30, 2, 0, 0);
        this.cilynders.push(cylinder3);

    }

    display(){

        let totalHeight = 0;
        let xTranslation = 0;
        let zTranslation = 0;
        for(let i = 0; i < 3; i++){
            
            this.scene.pushMatrix();
            this.scene.translate(xTranslation, -totalHeight, zTranslation);
            this.legMaterial.apply();
            this.cilynders[i].display();
            this.scene.popMatrix();
            totalHeight += this.cilynders[i].height;
            xTranslation += this.cilynders[i].getExtremeX();
            zTranslation += this.cilynders[i].getExtremeZ();

        }

    }
}