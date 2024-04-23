import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyStem } from './MyStem.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';

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
            this.petals.push(new MyPetal(this.scene, petalHeight));
        }

        this.receptacle = new MyReceptacle(this.scene, 10, 10);

        for (let i = 0; i < this.stemSize; i++){
            this.stems.push(new MyStem(this.scene, 30,30));
        }
    }

    display(){

        for(let i = 0; i < this.numPetals; i++){
            this.scene.pushMatrix();
            this.scene.rotate(2 * Math.PI * i / this.numPetals, 0, 0, 1); // rotation around y-axis
            this.scene.translate(0, this.heartRadius, 0);
            this.petals[i].display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.scene.scale(this.heartRadius, this.heartRadius, this.heartRadius);
        this.receptacle.display();
        this.scene.popMatrix();

        let stemTranslateY = 0;
        for(let i = 0; i < this.stemSize; i++){
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.scene.translate(0, 0, this.heartRadius+stemTranslateY);
            this.scene.scale(this.stemRadius, this.stemRadius, 1);
            this.stems[i].display();
            this.scene.popMatrix();
            stemTranslateY += 1;
        }
    }
}