import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyHead } from './MyHead.js';
import { MyTorax } from './MyTorax.js';
import { MyAbdomen } from './MyAbdomen.js';
import { MyLeg } from './MyLeg.js';
import { MyWings } from './MyWings.js';
import { MyAntennae } from './MyAntennae .js';


export class MyBee extends CGFobject{

    constructor(scene, position, orientation, speed){
        super(scene);

        this.position = position;
        this.orientation = orientation;
        this.speed = speed;
        this.state = "controlled";
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
        
        this.legs = [];
        for (let i = 0; i < 6; i++) {
            this.legs.push(new MyLeg(this.scene));
        }

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

        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setAmbient(0.3, 0.3, 0.3, 0.2);
        this.wingMaterial.setDiffuse(0.7, 0.7, 0.7, 0.2);
        this.wingMaterial.setSpecular(0.9, 0.9, 0.9, 0.2);
        this.wingMaterial.setEmission(0.1, 0.1, 0.1, 0.2);
        this.wingMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.wingMaterial.setTexture(this.scene.beeWingTexture);

    }
    

    turn(v){

        this.orientation += v;
        
        var norm = Math.sqrt( Math.pow(this.speed[0], 2) + Math.pow(this.speed[2], 2), 2);
        this.speed[0] = norm * Math.sin(this.orientation);
        this.speed[2] = norm * Math.cos(this.orientation);
        
    }
    
    accelerate(v){
 
        this.speed[0] += v * Math.sin(this.orientation);
        this.speed[2] += v * Math.cos(this.orientation);

        //if the dot product between the direction vector and the speed vector is negative,
        //then the angle between the two vectors is greater than 90 degrees
        //and the speed should be 0
        let dirVec = [Math.sin(this.orientation), 0, Math.cos(this.orientation)];
        if(dirVec[0] * this.speed[0] + dirVec[2] * this.speed[2] < 0){
            this.speed[0] = 0;
            this.speed[2] = 0;
        }

    }

    reset(){
        this.speed = [0, 0, 0];
        this.position = [0, 3, 0];
        this.orientation = 0;
    }

    update(timeSinceAppStart){  
        this.wings.update(timeSinceAppStart);

        switch(this.state){
        
            case "controlled": 
                this.position[1] = 4 + Math.sin(timeSinceAppStart * Math.PI * 2);
                this.position[0] += this.speed[0];
                this.position[2] += this.speed[2];
                break;

            case "descending":
                
                if (this.checkFlowerCollision()){
                    this.state = "stopped";
                }
                else if (this.position[1] <= 0.4){
                    this.state = "stopped";
                }
                else {
                    this.position[1] -= 0.1;
                }
                break;
            
            case "ascending":

                this.position[1] += 0.1;
                if(this.position[1] >= 3){
                    this.state = "controlled";
                }
                break;

            case "stopped":
                break;
            default:
                break;

        }

    }


    checkFlowerCollision() {
        for (let flowerCoord of this.scene.heartCoord) {
            let distanceX = Math.abs(this.position[0] - flowerCoord[0]);
            let distanceY = Math.abs(this.position[1] - flowerCoord[1]);
            let distanceZ = Math.abs(this.position[2] - flowerCoord[2]);
    
            if (distanceX < 0.2 && distanceY < 0.3 && distanceZ < 0.2) {
                console.log("Bee is above a flower");
                let flower = this.scene.garden.flowers[flowerCoord[3]][flowerCoord[4]];
                return true;
            }
        }
        return false;
    }

    display(){

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

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.3);
        this.torax.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0,-0.1,-0.4);
        this.abdomen.display();
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

        this.scene.pushMatrix();
        this.wingMaterial.apply();
        this.wings.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        
    }

}