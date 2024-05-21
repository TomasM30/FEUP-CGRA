import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyCylinder } from '../Common/MyCylinder.js';

/**
 * MyAntennae class
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAntennae extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cylinders = []; // Array to hold the cylinder objects that make up the antennae
        this.initObjects();
    }

    // Initialize the cylinder objects that make up the antennae.
    initObjects(){
        // Create two cylinder objects

        // Cylinder 1 - vertical cylinder
        let cylinder1 = new MyCylinder(this.scene, 30, 30, 1.5, 0, 0);

        // Cylinder 2 - rotated cylinder
        let cylinder2 = new MyCylinder(this.scene, 30, 30, 1, 0,Math.PI/2.5);

        // Add the cylinders to the array
        this.cylinders.push(cylinder1);
        this.cylinders.push(cylinder2);
    }

    // Display the antennae on the scene.
    display(){

        // Variables to hold the total height and translations in the x and z directions
        let totalHeight = 0;
        let xTranslation = 0;
        let zTranslation = 0;

        // Loop through the cylinders array
        for(let i = 0; i < 2; i++){
            this.scene.pushMatrix();

            // Translate each cylinder so they are connected
            this.scene.translate(xTranslation, -totalHeight, zTranslation);

            // Display the current cylinder
            this.cylinders[i].display();
            this.scene.popMatrix();

            // Update the total height and translations for the next cylinder
            totalHeight += this.cylinders[i].height;
            xTranslation += this.cylinders[i].getExtremeX();
            zTranslation += this.cylinders[i].getExtremeZ();
        }
    }
}