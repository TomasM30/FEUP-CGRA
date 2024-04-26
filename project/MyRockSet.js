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

        this.init_rocks(base_size);

        this.rockMaterial = new CGFappearance(this.scene);
        this.rockMaterial.setTextureWrap('REPEAT', 'REPEAT');
    
    }

    init_rocks(base_size) {
     
        this.rocks = []; 

        for(let i = base_size; i > 0; i--) {
            
            for (let j = 0; j < i; j++) {
                let rock = new MyRock(this.scene, 10, 10);
                this.rocks.push(rock);
            }

        }

        console.log(this.rocks.length)

    }


    display() {

        for (let i = this.base_size; i > 0; i--) {

            for (let j = 0; j < i; j++) {

                this.scene.pushMatrix();
                //this.rockMaterial.apply();
                //this.scene.translate(j, 0, i);
                this.rocks[j].display();
                this.scene.popMatrix();

            }

        }

    }

}

