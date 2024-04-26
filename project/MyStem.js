import {CGFobject} from '../lib/CGF.js';
import { MyCylinder } from "./MyCylinder.js";

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
    constructor(scene, numCilynders, radius) {
        super(scene);

        this.numCilynders = numCilynders;
        this.radius = radius;
        this.cilynders = [];

        this.initObjects();
    }

    initObjects(){
        for(let i = 0; i < this.numCilynders; i++){
            let height = Math.random() + 0.5;
            let rotationX = (Math.random() * 50 - 25) * (Math.PI / 180);
            let rotationY = (Math.random() * 50 - 25) * (Math.PI / 180);
            let cylinder = new MyCylinder(this.scene, 30, 30, height, this.radius, rotationX, rotationY);
            this.cilynders.push(cylinder);
        }
    }

    display(){
        let totalHeight = 0;
        let xTranslation = 0;
        let zTranslation = 0;
        for(let i = 0; i < this.numCilynders; i++){
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