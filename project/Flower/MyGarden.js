import {CGFobject} from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 * @param rows - Number of rows of flowers
 * @param columns - Number of columns of flowers
 */
export class MyGarden extends CGFobject {
    constructor(scene, rows, columns) {
        super(scene);
    
        this.rows = rows;
        this.columns = columns;

        this.initObjects();

    }

    /**
     * 
     * @param num - Random number between 0 and 1
     * @returns Index from 0 to 3
     */
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

                // Random number of petals between 5 and 15
                let n_petals = Math.floor(Math.random() * 10 + 5);

                // Random heart radius between 0.85 and 1.15
                let heart_radius = Math.random() * 0.3 + 0.85;

                // Random stem radius between 0.1 and 0.2
                let stem_radius = Math.random() * 0.1 + 0.1;

                // Random number of cylinders that compose the stem between 3 and 4
                let stem_size = Math.floor(Math.random() * 2 + 3);

                // Random external radius between 3 and 7
                let externalRadius = Math.random() * 4 + 3; 

                // Random colour from an array of colours defined in the scene
                let petalColor = this.scene.petalColors[Math.floor(Math.random() * this.scene.petalColors.length)];

                // Colors for the receptacle and stem
                let receptacleColor = [88/255, 57/255, 39/255];
                let stemColor = [24/255, 70/255, 50/255];

                // Random textures for the petals, receptacle and stem
                let petalText = this.scene.petalTextures[this.getIndexFromRandom(Math.random())];
                let receptacleText = this.scene.receptacleTextures[this.getIndexFromRandom(Math.random())];
                let stemText = this.scene.stemTextures[this.getIndexFromRandom(Math.random())];


                let flower = new MyFlower(this.scene, externalRadius, n_petals, heart_radius, stem_radius, stem_size, petalColor, receptacleColor, stemColor, petalText, receptacleText, stemText); 
                this.flowers.push(flower);
                this.flower_heights.push(flower.getStemHeight() + heart_radius);
                this.totalHeight.push(flower.getStemHeight() + heart_radius + heart_radius);

                flower.setCoords([i * 8, this.totalHeight[i*this.columns + j], j * 8, i, j]);

            }
        }

    }


    // Display the flower in a matrix like format
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

    getFlower(i, j){
        return this.flowers[i * this.columns + j];
    }
    
}