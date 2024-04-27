import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
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

        this.initMaterials(); 
        this.initObjects();

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
        this.stem = new MyStem(this.scene, this.stemSize, this.stemRadius, this.stemMaterial);
    }

    getIndexFromRandom(num) {

        if (num < 0.25) {
          return 0;
        }
        else if (num < 0.5) {
          return 1;
        }
        else if (num < 0.75) {
          return 2;
        }
        else {
          return 3;
        }
    
      }

    initMaterials() {

        this.petalTextures = [];
        this.petalTextures.push(new CGFtexture(this.scene, 'images/petals_flower/Petal1.jpg'));
        this.petalTextures.push(new CGFtexture(this.scene, 'images/petals_flower/Petal2.jpg'));
        this.petalTextures.push(new CGFtexture(this.scene, 'images/petals_flower/Petal3.jpg'));
        this.petalTextures.push(new CGFtexture(this.scene, 'images/petals_flower/Petal4.jpg'));

        this.receptacleTextures = [];
        this.receptacleTextures.push(new CGFtexture(this.scene, 'images/hearts_flower/Heart1.jpg'));
        this.receptacleTextures.push(new CGFtexture(this.scene, 'images/hearts_flower/Heart2.jpg'));
        this.receptacleTextures.push(new CGFtexture(this.scene, 'images/hearts_flower/Heart3.jpg'));
        this.receptacleTextures.push(new CGFtexture(this.scene, 'images/hearts_flower/Heart4.jpg'));
        
        this.stemTextures = [];
        this.stemTextures.push(new CGFtexture(this.scene, 'images/stems_flower/Stem1.jpg'));
        this.stemTextures.push(new CGFtexture(this.scene, 'images/stems_flower/Stem2.jpg'));
        this.stemTextures.push(new CGFtexture(this.scene, 'images/stems_flower/Stem3.jpg'));
        this.stemTextures.push(new CGFtexture(this.scene, 'images/stems_flower/Stem4.jpg'));

        this.petalMaterial = new CGFappearance(this.scene);
        this.petalMaterial.setAmbient(this.petalColor[0], this.petalColor[1], this.petalColor[2], 1.0);
        this.petalMaterial.setDiffuse(this.petalColor[0], this.petalColor[1], this.petalColor[2], 1.0);
        this.petalMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.petalMaterial.setShininess(10.0);
        this.petalMaterial.setTextureWrap('REPEAT', 'REPEAT');
        let randomPetalTexture = this.getIndexFromRandom(Math.random());
        this.petalMaterial.setTexture(this.petalTextures[randomPetalTexture]);

        this.receptacleMaterial = new CGFappearance(this.scene);
        this.receptacleMaterial.setAmbient(this.receptacleColor[0], this.receptacleColor[1], this.receptacleColor[2], 1.0);
        this.receptacleMaterial.setDiffuse(this.receptacleColor[0], this.receptacleColor[1], this.receptacleColor[2], 1.0);
        this.receptacleMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.receptacleMaterial.setShininess(10.0);
        this.receptacleMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        let randomReceptacleTexture = this.getIndexFromRandom(Math.random());
        this.receptacleMaterial.setTexture(this.receptacleTextures[randomReceptacleTexture]);

        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(this.stemColor[0], this.stemColor[1], this.stemColor[2], 1.0);
        this.stemMaterial.setDiffuse(this.stemColor[0], this.stemColor[1], this.stemColor[2], 1.0);
        this.stemMaterial.setSpecular(1, 1, 1, 1.0);
        this.stemMaterial.setShininess(10.0);
        this.stemMaterial.setTextureWrap('REPEAT', 'REPEAT');
        let randomStemTexture = this.getIndexFromRandom(Math.random());
        this.stemMaterial.setTexture(this.stemTextures[randomStemTexture]);

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