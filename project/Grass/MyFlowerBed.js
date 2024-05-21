import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyGrass } from './MyGrass.js';


/**
 * MyFlowerBed
 * @constructor
 * @param scene - Reference to MyScene object
 * @param base_size - Size of the Matrix of Grass
 */
export class MyFlowerBed extends CGFobject {
	constructor(scene, base_size) {
		super(scene);

        this.base_size = base_size;
        this.rotations = [];
        this.initObjects();

        this.grassMaterial = new CGFappearance(this.scene);
        this.grassMaterial.setAmbient(0.1, 1, 0.1, 1);
        this.grassMaterial.setDiffuse(0.1, 1, 0.1, 1);
        this.grassMaterial.setSpecular(0.1, 1, 0.1, 1);
        this.grassMaterial.setShininess(10.0);
        this.grassMaterial.setTexture(this.scene.grassTexture);
        this.grassMaterial.setTextureWrap('REPEAT', 'REPEAT');

    
    }

    /**
     * Generates base_size x base_size grass objects
     * and generates random rotations and scales for each grass object
     */
    initObjects() {

        this.grass = [];
        this.scales = [];

        for (let i = 0; i < this.base_size; i++) {
        
            for (let j = 0; j < this.base_size; j++) {
            
                let grass = new MyGrass(this.scene, 10);
                this.grass.push(grass);
                this.rotations.push(Math.random() * 2 * Math.PI);
                this.scales.push(0.25 + Math.random() * 0.5);            
            }
        
        }

    }

    /**
     * Treats My flower bed as a matrix of grass objects
     * For each matrix position, checks if exists a rock set or a flower in the garden
     * If not, displays the grass object with the respective scale and rotation
     */
    display() {

        this.scene.pushMatrix();

        this.grassMaterial.apply();

        for (let i = 0; i < this.base_size; i++) {
        
            for (let j = 0; j < this.base_size; j++) {
                let hasRockSet = i>= this.scene.base_size*4 && i<=this.scene.base_size*6 && j>= this.scene.base_size*4 && j<=this.scene.base_size*6;
                let hasFlowerGarden = i >= this.base_size/2 && i <= this.base_size*0.5+this.scene.gardenRows*2 && j >= this.base_size/2 && j <= this.base_size*0.5+this.scene.gardenColumns*2;
                if(!(hasRockSet || hasFlowerGarden)){
                    this.scene.pushMatrix();
                    this.scene.translate(i+0.5, 0, j+0.5);
                    this.scene.scale(1, this.scales[i * this.base_size + j], 1);
                    this.scene.rotate(this.rotations[i * this.base_size + j], 0, 1, 0);
                    this.grass[i * this.base_size + j].display();
                    this.scene.updateWind();
                    this.scene.popMatrix();
                }
                
            
            }
        
        }


        this.scene.popMatrix();

    }


}

