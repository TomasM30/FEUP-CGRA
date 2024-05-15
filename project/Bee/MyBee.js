import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyHead } from './MyHead.js';
import { MyTorax } from './MyTorax.js';
import { MyAbdomen } from './MyAbdomen.js';
import { MyLeg } from './MyLeg.js';
import { MyWings } from './MyWings.js';
import { MyAntennae } from './MyAntennae .js';

export class MyBee extends CGFobject{

    constructor(scene){
        super(scene);
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

    updateWings(timeSinceAppStart){
        this.wings.update(timeSinceAppStart);
    }


    display(){


        this.scene.pushMatrix();
        
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

        

        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.popMatrix();
    }

}