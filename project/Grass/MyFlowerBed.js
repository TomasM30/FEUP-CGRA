import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyGrass } from './MyGrass.js';


/**
 * MyFlowerBed
 * @constructor
 * @param scene - Reference to MyScene object
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

    initObjects() {

        this.grass = [];

        for (let i = 0; i < this.base_size; i++) {
        
            for (let j = 0; j < this.base_size; j++) {
            
                let grass = new MyGrass(this.scene, 10);
                this.grass.push(grass);
                this.rotations.push(Math.random() * 2 * Math.PI);
            
            }
        
        }

    }

    display() {

        this.scene.pushMatrix();

        this.grassMaterial.apply();

        for (let i = 0; i < this.base_size; i++) {
        
            for (let j = 0; j < this.base_size; j++) {
            
                this.scene.pushMatrix();
                this.scene.translate(i+0.5, 0, j+0.5);
                this.scene.rotate(this.rotations[i * this.base_size + j], 0, 1, 0);
                this.grass[i * this.base_size + j].display();
                this.scene.updateWind();
                this.scene.popMatrix();
            
            }
        
        }


        this.scene.popMatrix();

    }


}

