import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { MyPollen } from '../Bee/MyPollen.js';


/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 * @param externalRadius - External radius of the flower (heart radius + petal height)
 * @param numPetals - Number of petals the flower will have
 * @param heartRadius - Radius of the heart of the flower
 * @param stemRadius - Radius of the stem of the flower
 * @param stemSize - Number of cylinders that compose the stem
 * @param petalColor - Color of the petals
 * @param receptacleColor - Color of the receptacle
 * @param stemColor - Color of the stem
 * @param petalTexture - Texture of the petals
 * @param receptacleTexture - Texture of the receptacle
 * @param stemTexture - Texture of the stem
 */
export class MyFlower extends CGFobject {
    constructor(scene, externalRadius, numPetals, heartRadius, stemRadius, stemSize, petalColor, receptacleColor, stemColor, petalTexture, receptacleTexture, stemTexture) {
        super(scene);
        this.numPetals = numPetals;
        this.externalRadius = externalRadius;
        this.heartRadius = heartRadius;
        this.stemRadius = stemRadius;
        this.stemSize = stemSize;
        this.petalColor = petalColor;
        this.receptacleColor = receptacleColor;
        this.stemColor = stemColor;
        this.coords = [];

        this.petalTexture = petalTexture;
        this.receptacleTexture = receptacleTexture;
        this.stemTexture = stemTexture;

        this.initMaterials();
        this.initObjects();

    }

    initObjects(){
        
        this.petals = [];
        this.stems = [];

        let petalHeight = this.externalRadius - this.heartRadius;
        for(let i = 0; i < this.numPetals; i++){
            // Randomize how the petal curves
            let curvatureAngle = Math.random() * -Math.PI/4;

            // Create a new petal and add it to the array
            this.petals.push(new MyPetal(this.scene, petalHeight, curvatureAngle, this.heartRadius));
        }

        this.receptacle = new MyReceptacle(this.scene, 30, 30);
        this.stem = new MyStem(this.scene, this.stemSize, this.stemRadius, this.stemMaterial);
        this.pollen = new MyPollen(this.scene);
    }

    initMaterials() {

        this.petalMaterial = new CGFappearance(this.scene);
        this.petalMaterial.setAmbient(this.petalColor[0], this.petalColor[1], this.petalColor[2], 1.0);
        this.petalMaterial.setDiffuse(this.petalColor[0], this.petalColor[1], this.petalColor[2], 1.0);
        this.petalMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.petalMaterial.setShininess(10.0);
        this.petalMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.petalMaterial.setTexture(this.petalTexture);

        this.receptacleMaterial = new CGFappearance(this.scene);
        this.receptacleMaterial.setAmbient(this.receptacleColor[0], this.receptacleColor[1], this.receptacleColor[2], 1.0);
        this.receptacleMaterial.setDiffuse(this.receptacleColor[0], this.receptacleColor[1], this.receptacleColor[2], 1.0);
        this.receptacleMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.receptacleMaterial.setShininess(10.0);
        this.receptacleMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.receptacleMaterial.setTexture(this.receptacleTexture);

        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(this.stemColor[0], this.stemColor[1], this.stemColor[2], 1.0);
        this.stemMaterial.setDiffuse(this.stemColor[0], this.stemColor[1], this.stemColor[2], 1.0);
        this.stemMaterial.setSpecular(1, 1, 1, 1.0);
        this.stemMaterial.setShininess(10.0);
        this.stemMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.stemMaterial.setTexture(this.stemTexture);
    }

    /**
     * Remove the pollen from the flower object
     */
    removePollen(){
        this.pollen = null;
    }


    display(){

        // Display each petal around the heart
        for(let i = 0; i < this.numPetals; i++){
            this.scene.pushMatrix();
            this.petalMaterial.apply();
            this.scene.rotate(i*Math.PI*2/(this.numPetals), 0, 1, 0);
            this.scene.rotate(Math.PI/2,1,0,0);
            this.petals[i].display();
            this.scene.popMatrix();
        }

        // Display the pollen object on top of the heart
        this.scene.pushMatrix();
        this.scene.translate(0, this.heartRadius, 0);
        this.scene.scale(0.15, 0.15, 0.15);
        if(this.pollen != null){
            this.pollen.display();
        }
        this.scene.popMatrix();
        

        // Display the heart
        this.scene.pushMatrix();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.receptacleMaterial.apply();
        this.scene.scale(this.heartRadius, this.heartRadius, this.heartRadius);
        this.receptacle.display();
        this.scene.popMatrix();

        // Display the stem
        this.scene.pushMatrix();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        this.stemMaterial.apply();
        this.scene.translate(0, -this.heartRadius, 0);
        this.stem.display();
        this.scene.popMatrix();  
    }

    /**
     * 
     * @returns the height of the stem
     */
    getStemHeight(){
        return this.stem.getStemHeight();
    }

    /**
     * 
     * @param coords - Coordinates of the heart
     */
    setCoords(coords){
        this.coords = coords;
    }


}