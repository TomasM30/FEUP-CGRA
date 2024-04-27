import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import {MyRock} from './MyRock.js';
/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {
	constructor(scene, base_size, texture) {
		super(scene);

        this.base_size = base_size;

        this.init_rocks();

        this.rockMaterial = new CGFappearance(this.scene);
        this.rockMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.rockMaterial.setTexture(texture);
    
    }

    init_rocks() {
     
        this.rocks = []; 
        this.scaleValues = [];

        for(let i = this.base_size; i > 0; i--) {
            
            for (let j = 0; j < i; j++) {

                for (let k = 0; k < i; k++) {

                    let rock = new MyRock(this.scene, 10, 10);
                    this.rocks.push(rock);

                    //Randomize the scale multiplier
                    let randX = Math.random() * 0.2 + 0.9;
                    let randY = Math.random() * 0.4 + 0.3;
                    let randZ = Math.random() * 0.2 + 0.9;

                    this.scaleValues.push([randX, randY, randZ]);
            
                }
            }

        }

    }


    display() {

        let layer = 0;
        let curr_rock = 0;

        for (let i = this.base_size; i > 0; i--) {

            for (let j = 0; j < i; j++) {

                for (let k = 0; k < i; k++) {

                    let scaleX = this.scaleValues[curr_rock][0];
                    let scaleY = this.scaleValues[curr_rock][1];
                    let scaleZ = this.scaleValues[curr_rock][2];

                    this.scene.pushMatrix();

                    this.scene.scale(scaleX, scaleY, scaleZ);

                    this.scene.translate(j*2 + layer, layer, k*2 + layer);
                    this.rockMaterial.apply();
                    this.rocks[curr_rock].display();
                    this.scene.popMatrix();

                    curr_rock++;

                }

            }
        
            layer++;

        }

    }

}

