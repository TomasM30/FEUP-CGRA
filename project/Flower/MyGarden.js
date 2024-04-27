import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGarden extends CGFobject {
    constructor(scene, rows, columns) {
        super(scene);
    
        this.rows = rows;
        this.columns = columns;

        this.initObjects();

    }

    initObjects(){

        this.flowers = [];
        this.flower_heights = [];

        for(let i = 0; i < this.rows; i++){

            for(let j = 0; j < this.columns; j++){

                let n_petals = Math.random() * 10 + 5;
                let heart_radius = Math.random() + 0.5;
                let stem_radius = Math.random() * 0.1 + 0.1;
                let stem_size = Math.random() * 5 + 5;
                let externalRadius = Math.random() * 4 + 3; 
                let petalColor = [1, 1, 0];
                let receptacleColor = [88/255, 57/255, 39/255];
                let stemColor = [24/255, 70/255, 50/255];

                let flower = new MyFlower(this.scene, externalRadius, n_petals, heart_radius, stem_radius, stem_size, petalColor, receptacleColor, stemColor); 
                this.flowers.push(flower);
                this.flower_heights.push(flower.getStemHeight() + heart_radius);
            }
        }

    }

    display(){
        
        for (let i = 0; i < this.rows; i++) {

            for (let j = 0; j < this.columns; j++) {

                this.scene.pushMatrix();
                this.scene.translate(i * 8 , this.flower_heights[i*this.columns + j], j * 8);
                this.flowers[i * this.columns + j].display();
                this.scene.popMatrix();

            }

        }

    }
    
}