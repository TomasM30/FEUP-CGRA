import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyLeg } from './MyLeg.js';
import { MyHead } from './MyHead.js';
import { MyTorax } from './MyTorax.js';
import { MyWing } from './MyWing.js';

export class MyBee extends CGFobject{

    constructor(scene){
        super(scene);
        this.initMaterials();
        this.initObjects();
        this.initBuffers();
    }

    initObjects(){


        this.legs = [];
        for(let i = 0; i < 6; i++){
            this.legs.push(new MyLeg(this.scene, this.legMaterial));
        }

        this.head = new MyHead(this.scene);     
        this.torax = new MyTorax(this.scene);  
        this.wing = new MyWing(this.scene);      
        /*       
        this.abdomen = new MyAbdomen(this.scene);         
        this.wing = [];         
        this.wing[0] = new MyWing(this.scene);         
        this.wing[1] = new MyWing(this.scene);         
        this.wing[2] = new MyWing(this.scene);         
        this.wing[3] = new MyWing(this.scene);         
        */ 
    }

    initMaterials(){
        this.legMaterial = new CGFappearance(this.scene);
        this.legMaterial.setAmbient(1, 1, 1, 1);
        this.legMaterial.setDiffuse(1, 1, 1, 1);
        this.legMaterial.setSpecular(1, 1, 1, 1);
        this.legMaterial.setShininess(10.0);
        this.legMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.legMaterial.setTexture(this.scene.beeLegTexture);
    }

    display(){

        this.scene.pushMatrix();

        this.scene.pushMatrix();
        this.torax.display();
        this.scene.popMatrix();
        
        /*
        this.scene.pushmatrix();
        this.head.display();
        this.scene.popMatrix();
        */ 

        /*
        this.scene.pushMatrix();
        this.wing.display();
        this.scene.popMatrix();
        */

        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.popMatrix();
    }

}