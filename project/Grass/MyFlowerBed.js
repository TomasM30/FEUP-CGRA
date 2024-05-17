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
        this.initObjects();
    
    }

    initObjects() {

        this.grass = [];

        for (let i = 0; i < this.base_size; i++) {
        
            for (let j = 0; j < this.base_size; j++) {
            
                let grass = new MyGrass(this.scene, 10);
                this.grass.push(grass);
            
            }
        
        }

    }

    display() {

        this.scene.pushMatrix();

        for (let i = 0; i < this.base_size; i++) {
        
            for (let j = 0; j < this.base_size; j++) {
            
                this.scene.pushMatrix();
                this.scene.translate(i+0.5, 0, j+0.5);
                this.grass[i * this.base_size + j].display();
                this.scene.popMatrix();
            
            }
        
        }



        this.scene.popMatrix();

    }


}

