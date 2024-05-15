import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyLeg } from './MyLeg.js';
import { MyHead } from './MyHead.js';
import { MyWing } from './MyWing.js';

export class MyBee extends CGFobject{

    constructor(scene){
        super(scene);
        this.legs = [];
        this.initMaterials();
        this.initObjects();
        this.initBuffers();
    }

    initObjects(){


        for(let i = 0; i < 6; i++){
            this.legs.push(new MyLeg(this.scene, this.legMaterial));
        }

        this.head = new MyHead(this.scene);   
        this.wing = new MyWing(this.scene);      
        /*  
        this.torax = new MyTorax(this.scene);         
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
        //this.scene.pushMatrix();
        //for(let i = 0; i < 6; i++){
        //    this.scene.pushMatrix();
        //    let side = i < 3 ? -1 : 1;
        //    let position = i % 3;
        //    this.scene.translate(0, 0, position * 2);
        //    if(side === 1) {
        //        this.scene.rotate(Math.PI, 0, 1, 0);
        //    }
        //    this.scene.scale(0.5, 1, 0.5);
        //    this.legs[i].display();
        //    this.scene.popMatrix();
        //}

        //this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.head.display();
        this.wing.display();
        this.scene.popMatrix();
    }

}