import {CGFobject} from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';
import { MyPollen } from '../Bee/MyPollen.js';

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

    initObjects(){

        this.flowers = [];
        this.flower_heights = [];
        this.totalHeight = [];
        this.pollens = [];

        for(let i = 0; i < this.rows; i++){

            for(let j = 0; j < this.columns; j++){

                let n_petals = Math.floor(Math.random() * 10 + 5);
                let heart_radius = Math.random() + 0.5;
                let stem_radius = Math.random() * 0.1 + 0.1;
                let stem_size = Math.floor(Math.random() * 5 + 5);
                let externalRadius = Math.random() * 4 + 3; 
                let petalColor = [1, 1, 0];
                let receptacleColor = [88/255, 57/255, 39/255];
                let stemColor = [24/255, 70/255, 50/255];
                let petalText = this.scene.petalTextures[this.getIndexFromRandom(Math.random())];
                let receptacleText = this.scene.receptacleTextures[this.getIndexFromRandom(Math.random())];
                let stemText = this.scene.stemTextures[this.getIndexFromRandom(Math.random())];


                let flower = new MyFlower(this.scene, externalRadius, n_petals, heart_radius, stem_radius, stem_size, petalColor, receptacleColor, stemColor, petalText, receptacleText, stemText); 
                this.flowers.push(flower);
                this.flower_heights.push(flower.getStemHeight() + heart_radius);
                this.totalHeight.push(flower.getStemHeight() + heart_radius + heart_radius);

                let pollen = new MyPollen(this.scene);
                this.pollens.push(pollen);
            }
        }

    }

    display(){
        
        for (let i = 0; i < this.rows; i++) {

            for (let j = 0; j < this.columns; j++) {

              this.scene.pushMatrix();
              this.scene.translate(i * 8 , this.totalHeight[i*this.columns + j], j * 8);
              this.scene.scale(0.15, 0.15, 0.15);
              this.pollens[i * this.columns + j].display();
              this.scene.popMatrix();

              this.scene.pushMatrix();
              this.scene.translate(i * 8 , this.flower_heights[i*this.columns + j], j * 8);
              this.flowers[i * this.columns + j].display();
              this.scene.popMatrix();

            }

        }

    }
    
}