import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyHead } from './MyHead.js';
import { MyTorax } from './MyTorax.js';
import { MyAbdomen } from './MyAbdomen.js';
import { MyLeg } from './MyLeg.js';
import { MyWings } from './MyWings.js';
import { MyAntennae } from './MyAntennae .js';

/**
 * MyBee class
 * @constructor
 * @param scene - Reference to MyScene object
 * @param position - the position of the bee on the scene
 * @param orientation - the angle on the y axis of the bee
 * @param speed - the speed of the bee
 */
export class MyBee extends CGFobject{

    constructor(scene, position, orientation, speed){
        super(scene);

        this.position = position;
        this.orientation = orientation;
        this.speed = speed;
        this.descendingSpeed = speed;
        this.state = "controlled";
        this.ascendSpeed = [0, 0, 0];
        this.pollen = null;

        this.initMaterials();
        this.initObjects();
        this.initBuffers();
    }

    initObjects(){

        this.head = new MyHead(this.scene);     
        this.torax = new MyTorax(this.scene);
        this.abdomen = new MyAbdomen(this.scene);  
        this.wings = new MyWings(this.scene);  
        
        // Create the legs
        this.legs = [];
        for (let i = 0; i < 6; i++) {
            this.legs.push(new MyLeg(this.scene));
        }

        // Create the antennaes
        this.antennaes = [];
        for (let i = 0; i < 2; i++) {
            this.antennaes.push(new MyAntennae(this.scene));
        }

    }

    initMaterials(){
        this.legMaterial = new CGFappearance(this.scene);
        this.legMaterial.setAmbient(1, 1, 1, 1);
        this.legMaterial.setDiffuse(1, 1, 1, 1);
        this.legMaterial.setSpecular(1, 1, 1, 1);
        this.legMaterial.setShininess(10.0);
        this.legMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.legMaterial.setTexture(this.scene.beeLegTexture);

        /**
        * In this material the wings are transparent, so the sum of the `ALPHA` values
        * in the aterial must be less than 1
        */
        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setAmbient(0.3, 0.3, 0.3, 0.1);
        this.wingMaterial.setDiffuse(0.7, 0.7, 0.7, 0.1);
        this.wingMaterial.setSpecular(0.9, 0.9, 0.9, 0.1);
        this.wingMaterial.setEmission(0.1, 0.1, 0.1, 0.1);
        this.wingMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.wingMaterial.setTexture(this.scene.beeWingTexture);

    }


    /**
    * Pickup pollen from a flower
    * @param pollen - the pollen object to be picked up
    * 
    * Get the pollen object from the flower and store it in the bee to be displayed
    * 
    */
    pickupPollen(pollen){
        this.pollen = pollen;
    }

    /**
    * Drop pollen in the hive
    *
    * Drop the pollen object in the hive and puts the bee speed at 0
    */
    dropPollen(){
        this.pollen = null;
        this.speed = [0, 0, 0];
    }
    


    /**
    * Turn the bee
    * @param v - the angle to turn the bee
    * 
    * Turn the bee by the angle v
    */ 
    turn(v){

        this.orientation += v;
        
        var norm = Math.sqrt( Math.pow(this.speed[0], 2) + Math.pow(this.speed[2], 2), 2);
        this.speed[0] = norm * Math.sin(this.orientation);
        this.speed[2] = norm * Math.cos(this.orientation);
        
    }
    
    /**
    * Accelerate the bee
    * @param v - the acceleration value
    * 
    * Accelerate the bee by the value v
    */ 
    accelerate(v){
 
        let speedLimit = 1;
        this.speed[0] += v * Math.sin(this.orientation);
        this.speed[2] += v * Math.cos(this.orientation);

        // Limiting the speed
        if (this.speed[0] > speedLimit) this.speed[0] = speedLimit;
        if (this.speed[0] < -speedLimit) this.speed[0] = -speedLimit;
        if (this.speed[2] > speedLimit) this.speed[2] = speedLimit;
        if (this.speed[2] < -speedLimit) this.speed[2] = -speedLimit;

        /*
        * if the dot product between the direction vector and the speed vector is negative,
        * then the angle between the two vectors is greater than 90 degrees
        * so the bee should stop
        */
        let dirVec = [Math.sin(this.orientation), 0, Math.cos(this.orientation)];
        if(dirVec[0] * this.speed[0] + dirVec[2] * this.speed[2] < 0){
            this.speed[0] = 0;
            this.speed[2] = 0;
        }

    }

    // Reset the bee to the original state
    reset(){
        this.speed = [0, 0, 0];
        this.position = [0, 3, 0];
        this.orientation = 0;
    }

    /**
    * Update function that will work as a state machine for the bee
    * @param timeSinceAppStart - the time since the application started
    */
    update(timeSinceAppStart){  
        this.wings.update(timeSinceAppStart);

        switch(this.state){
     
            // On this state the bee is controlled by the player
            case "controlled": 
                this.position[1] = 4 + Math.sin(timeSinceAppStart * Math.PI * 2);
                this.position[0] += this.speed[0];
                this.position[2] += this.speed[2];
                break;

            // On this state the bee is descending to pick up pollen on a parabolic path
            case "descending":

                if (this.checkFlowerCollision()){
                    this.state = "stopped";
                }
                else if (this.position[1] <= 0.4){
                    this.state = "stopped";
                }
                else {
                    let previousSpeedX = this.descendingSpeed;
                    let previousSpeedZ = this.descendingSpeed;
                    this.descendingSpeed[0] -= this.speed[0] * 0.05;
                    this.descendingSpeed[2] -= this.speed[2] * 0.05;
                    if (previousSpeedX * this.descendingSpeed[0] < 0) this.descendingSpeed[0] = 0;
                    if (previousSpeedZ * this.descendingSpeed[2] < 0) this.descendingSpeed[2] = 0;
                    this.position[0] += this.descendingSpeed[0];
                    this.position[1] += this.descendingSpeed[1];
                    this.position[2] += this.descendingSpeed[2];

                }
                break;
            
            // On this state the bee is ascending after picking up pollen
            case "ascending":

                this.ascendSpeed[0] += this.speed[0] * 0.05;
                this.ascendSpeed[2] += this.speed[2] * 0.05;
            
                if (Math.abs(this.ascendSpeed[0]) > Math.abs(this.speed[0])) this.ascendSpeed[0] = this.speed[0];
                if (Math.abs(this.ascendSpeed[2]) > Math.abs(this.speed[2])) this.ascendSpeed[2] = this.speed[2];

                this.position[0] += this.ascendSpeed[0];
                this.position[1] += this.ascendSpeed[1];
                this.position[2] += this.ascendSpeed[2];

                if(this.position[1] >= 3){
                    this.state = "controlled";
                }
                break;

            // On this state the bee is flying to the hive to drop the pollen on a parabolic path
            case "pollenDrop":

                let destination = this.scene.hiveCoords;
                let dx = destination[0] - this.position[0];
                let dy = destination[1] - this.position[1];
                let dz = 0.5+destination[2] - this.position[2];
                let distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
                
                if (distance < 0.5) {
                    if (this.pollen != null) {
                        this.scene.rockSet.hive.addPollen(this.pollen);
                        this.dropPollen();

                        this.ascendSpeed = [0,0.2,0];
                        this.state = "ascending";
                    }
                } else {
                    let targetOrientation = Math.atan2(dx, dz);
                    this.orientation = targetOrientation;
                
                    var norm = Math.sqrt( Math.pow(this.speed[0], 2) + Math.pow(this.speed[2], 2), 2);
                    if (norm < 0.2) norm = 0.2;
                    this.speed[0] = norm * Math.sin(this.orientation);
                    this.speed[2] = norm * Math.cos(this.orientation);
                
                    this.position[0] += this.speed[0];
                    this.position[2] += this.speed[2];
                    
                    this.position[1] += (dy*0.2);
                    

                }
                break;

            case "stopped":
                break;
            default:
                break;

        }

    }

    /**
    * Check if the bee is colliding with a flower and pick up the pollen
    * @return true if the bee is colliding with a flower, false otherwise
    */
    checkFlowerCollision() {
        for (let flowerCoord of this.scene.heartCoord) {
            let distanceX = Math.abs(this.position[0] - flowerCoord[0]);
            let distanceY = Math.abs(this.position[1] - flowerCoord[1]);
            let distanceZ = Math.abs(this.position[2] - flowerCoord[2]);

            if (distanceX < 0.4 && distanceY < 0.3 && distanceZ < 0.4) {
                let flower = this.scene.garden.getFlower(flowerCoord[3], flowerCoord[4]);
                let pollen = flower.pollen;
                if (pollen != null) {
                    this.pickupPollen(pollen);
                    flower.removePollen();
                }

                return true;
            }
        }
        return false;
    }

    display(){

        this.scene.pushMatrix();
        /**
        * Draw the pollen 
        * Puts the pollen object in the bee's legs
        */
        if(this.pollen != null){
            this.scene.translate(this.position[0], this.position[1]-0.4, this.position[2]);
            this.scene.scale(0.15, 0.15, 0.15);
            this.pollen.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);

        // Draw Head
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.75);
        this.head.display();
        this.scene.popMatrix();

        // Draw Antennaes
        for (let i = 0; i < 2; i++) {
            this.scene.pushMatrix();
            this.legMaterial.apply();
            this.scene.rotate((i * 2 - 1) * Math.PI/6, 0, 0, 1);
            this.scene.translate(0,0.2,0.7);
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.scene.scale(0.015, 0.06, 0.015);
            this.antennaes[i].display();
            this.scene.popMatrix();
        }

        // Draw Torax
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.3);
        this.torax.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0,-0.1,-0.4);
        this.abdomen.display();

        /**
        * Draw the legs
        * 3 legs on each side of the bee
        */
        this.scene.popMatrix();
        this.legMaterial.apply();
        for (let i = 0; i < 6; i++) {
            this.scene.pushMatrix();
            let side = i < 3 ? -1 : 1;
            let position = i % 3;
            if(i % 3 == 1) this.scene.translate(0, -0.05, 0);
            this.scene.rotate(side*Math.PI/6, 0, 0, 1);
            this.scene.translate(0.05 * side, -0.1, 0.1+ (position * 0.2));  
            this.scene.rotate(Math.PI, 0, 1, 0); 
            this.scene.scale(0.025, 0.07, 0.025);
            this.legs[i].display();
            this.scene.popMatrix();
        }

        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.enable(this.scene.gl.BLEND);

        // Draw Wings
        this.scene.pushMatrix();
        this.wingMaterial.apply();
        this.wings.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        
    }

}