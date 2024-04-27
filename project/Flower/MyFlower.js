import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';


/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene, externalRadius, numPetals, heartRadius, stemRadius, stemSize, petalColor, receptacleColor, stemColor) {
        super(scene);
        this.numPetals = numPetals;
        this.externalRadius = externalRadius;
        this.heartRadius = heartRadius;
        this.stemRadius = stemRadius;
        this.stemSize = stemSize;
        this.petalColor = petalColor;
        this.receptacleColor = receptacleColor;
        this.stemColor = stemColor;

        this.initObjects();
        this.initMaterials(); 

    }

    initObjects(){
        this.petals = [];
        this.stems = [];

        let petalHeight = this.externalRadius - this.heartRadius;
        for(let i = 0; i < this.numPetals; i++){
            let curvatureAngle = Math.random() * -Math.PI/4;
            this.petals.push(new MyPetal(this.scene, petalHeight, curvatureAngle, Math.PI/(2.5), Math.PI/2, this.heartRadius));

        }

        this.receptacle = new MyReceptacle(this.scene, 30, 30);
        this.stem = new MyStem(this.scene, this.stemSize, this.stemRadius);
    }

    initMaterials() {

        this.petalMaterial = new CGFappearance(this.scene);
        this.petalMaterial.setAmbient(this.petalColor[0], this.petalColor[1], this.petalColor[2], 1.0);
        this.petalMaterial.setDiffuse(this.petalColor[0], this.petalColor[1], this.petalColor[2], 1.0);
        this.petalMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.petalMaterial.setShininess(10.0);

        this.receptacleMaterial = new CGFappearance(this.scene);
        this.receptacleMaterial.setAmbient(this.receptacleColor[0], this.receptacleColor[1], this.receptacleColor[2], 1.0);
        this.receptacleMaterial.setDiffuse(this.receptacleColor[0], this.receptacleColor[1], this.receptacleColor[2], 1.0);
        this.receptacleMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.receptacleMaterial.setShininess(10.0);

        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(this.stemColor[0], this.stemColor[1], this.stemColor[2], 1.0);
        this.stemMaterial.setDiffuse(this.stemColor[0], this.stemColor[1], this.stemColor[2], 1.0);
        this.stemMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.stemMaterial.setShininess(10.0);

    }


    display(){

        for(let i = 0; i < this.numPetals; i++){
            this.scene.pushMatrix();
            this.petalMaterial.apply();
            this.scene.rotate(i*Math.PI*2/this.numPetals, 0, 1, 0);
            this.petals[i].display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.receptacleMaterial.apply();
        this.scene.scale(this.heartRadius, this.heartRadius, this.heartRadius);
        this.receptacle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.stemMaterial.apply();
        this.scene.translate(0, -this.heartRadius, 0);
        this.stem.display();
        this.scene.popMatrix();  
    }

    getStemHeight(){
        return this.stem.getStemHeight();
    }


}