import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyLeg } from './MyLeg.js';
import { MyHead } from './MyHead.js';

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

        this.scene.pushMatrix();

        this.scene.pushMatrix();
        for(let i = 0; i < 3; i++){
            this.scene.pushMatrix();
            this.scene.translate(0, 0, i * 4); // Translate each leg on the left side
            this.legs[i].display();
            this.scene.popMatrix();
        }
    
        for(let i = 3; i < 6; i++){
            this.scene.pushMatrix();
            this.scene.translate(0, 0, (i-3)*4);
            this.scene.rotate(Math.PI, 0, 1, 0); // Rotate the legs on the right side
            this.legs[i].display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.head.display();
        this.scene.popMatrix();

        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.popMatrix();
    }

}