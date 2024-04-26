import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MyRock} from './MyRock.js';
/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {
	constructor(scene, base_size) {
		super(scene);

        this.base_size = base_size;

        this.init_rocks();

        this.rockMaterial = new CGFappearance(this.scene);
        this.rockMaterial.setTextureWrap('REPEAT', 'REPEAT');
    
    }

    init_rocks() {
     
        this.rocks = []; 

        for(let i = this.base_size; i > 0; i--) {
            
            for (let j = 0; j < i; j++) {

                for (let k = 0; k < i; k++) {

                    let rock = new MyRock(this.scene, 10, 10);
                    this.rocks.push(rock);
            
                }
            }

        }

    }


    display() {

        let layer = 0;
        let curr_rock = 0;

        for (let i = this.base_size; i > 0; i--) {

            let inc_x = 0;

            for (let j = 0; j < i; j++) {
                
                let inc_z = 0;

                for (let k = 0; k < i; k++) {

                    this.scene.pushMatrix();
                    this.scene.translate(j + inc_x + layer, layer, k + inc_z + layer);
                    //this.scene.scale(0.5, 0.5, 0.5);
                    //this.rockMaterial.apply();
                    this.rocks[curr_rock].display();
                    this.scene.popMatrix();

                    curr_rock++;
                    inc_z++;

                }

                inc_x++;

            }
        
            layer += 0.8;

        }

    }

}

