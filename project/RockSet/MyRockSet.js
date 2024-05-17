import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import {MyRock} from './MyRock.js';
import { MyHive } from '../Bee/MyHive.js';


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
        this.rockMaterial.setAmbient(1, 1, 1, 1);
        this.rockMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rockMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.rockMaterial.setShininess(10.0);
        this.rockMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.rockMaterial.setTexture(texture);
    
    }

    init_rocks() {
     
        this.rocks = []; 
        this.scaleValues = [];
        this.rotations = [];

        for(let i = this.base_size; i > 0; i--) {
            
            for (let j = 0; j < i; j++) {

                for (let k = 0; k < i; k++) {

                    let rock = new MyRock(this.scene, 10, 10);
                    this.rocks.push(rock);

                    //Randomize the scale multiplier
                    let randX = Math.random() * 0.2 + 0.9;
                    let randY = Math.random() * 0.4 + 0.3;
                    let randZ = Math.random() * 0.2 + 0.9;
                    let randRot = Math.random() * 2 * Math.PI;

                    this.scaleValues.push([randX, randY, randZ]);
                    this.rotations.push(randRot);
            
                }
            }

        }

        this.hive = new MyHive(this.scene);

    }


    display() {

        let layer = 0;
        let curr_rock = 0;
        let lastPosition = [0, 0, 0];

        for (let i = this.base_size; i > 0; i--) {

            for (let j = 0; j < i; j++) {

                for (let k = 0; k < i; k++) {

                    let scaleX = this.scaleValues[curr_rock][0];
                    let scaleY = this.scaleValues[curr_rock][1];
                    let scaleZ = this.scaleValues[curr_rock][2];

                    this.scene.pushMatrix();
                    this.scene.translate(j*2 + layer, layer - (0.3*layer), k*2 + layer);
                    this.scene.scale(scaleX, scaleY, scaleZ);
                    this.scene.rotate(this.rotations[curr_rock], 0, 1, 0);
                    this.rockMaterial.apply();
                    this.rocks[curr_rock].display();
                    this.scene.popMatrix();

                    lastPosition = [j*2 + layer, layer - (0.3*layer) + scaleY, k*2 + layer];

                    curr_rock++;

                }

            }
        
            layer++;

        }

        this.scene.pushMatrix();
        this.scene.translate(lastPosition[0], lastPosition[1]+1, lastPosition[2]);
        this.hive.display();
        this.scene.popMatrix();

    }


}

