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
        this.rotations = [];

        this.initObjects();
    }

    initObjects(){
        for(let i = 0; i < this.numCilynders; i++){
            let height = Math.random();
            this.cilynders.push(new MyCylinder(this.scene, 30, 30, height, this.radius));
            this.rotations.push(Math.random() * 25 * (Math.PI / 180));
        }
    }

    display(){
        let totalHeight = 2*this.radius*Math.sin(this.rotations[0]);
        for(let i = 0; i < this.numCilynders; i++){
            this.scene.pushMatrix();
            this.scene.translate(0, -totalHeight, 0);
            this.scene.translate(0, -this.cilynders[i].height/2, 0);
            //this.scene.rotate(this.rotations[i], 0, 0, 1);
            this.scene.translate(0, this.cilynders[i].height/2, 0);
            this.cilynders[i].display();
            this.scene.popMatrix();
            totalHeight += this.cilynders[i].height;
        }
    }
}