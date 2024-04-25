import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';


/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene, externalRadius, numPetals, heartRadius, stemRadius, stemSize) {
        super(scene);
        this.numPetals = numPetals;
        this.externalRadius = externalRadius;
        this.heartRadius = heartRadius;
        this.stemRadius = stemRadius;
        this.stemSize = stemSize;


        this.initObjects();
    }

    initObjects(){
        this.petals = [];
        this.stems = [];

        let petalHeight = this.externalRadius - this.heartRadius;
        for(let i = 0; i < this.numPetals; i++){
            let curvatureAngle = Math.random() * -Math.PI/2;
            this.petals.push(new MyPetal(this.scene, petalHeight, curvatureAngle, Math.PI/(2.5), Math.PI/2, this.heartRadius));

        }

        this.receptacle = new MyReceptacle(this.scene, 10, 10);
        this.stem = new MyStem(this.scene, this.stemSize, this.stemRadius);
    }


    display(){

        for(let i = 0; i < this.numPetals; i++){
            this.scene.pushMatrix();
            this.scene.rotate(i*Math.PI*2/this.numPetals, 0, 1, 0);
            this.petals[i].display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.scene.scale(this.heartRadius, this.heartRadius, this.heartRadius);
        //this.receptacle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.translate(0, -this.heartRadius, 0);
        this.stem.display();
        this.scene.popMatrix();
        
    }
}