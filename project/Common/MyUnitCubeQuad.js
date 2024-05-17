import {CGFobject} from '../../lib/CGF.js';
import { MyQuad } from "./MyQuad.js"; 

export class MyUnitCubeQuad extends CGFobject {

    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
    }

    display() {

        const deg2rad = Math.PI/180;

        //face da frente
        this.scene.pushMatrix();        
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        //face de trás
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(180.0*deg2rad, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        //face da direita
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(90.0*deg2rad, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        //face da esquerda
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-90.0*deg2rad, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        //face de cima
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-90.0*deg2rad, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //face de baixo
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(90.0*deg2rad, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        
        
    }

}