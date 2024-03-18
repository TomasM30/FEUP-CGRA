import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js"; 

export class MyUnitCubeQuad extends CGFobject {

    constructor(scene, text1 = null, text2 = null, text3 = null, text4 = null, text5 = null, text6 = null) {
        super(scene);
        this.quad = new MyQuad(this.scene);
        this.initTextures(text1, text2, text3, text4, text5, text6);
        this.initMaterials();
    }


    initTextures(text1, text2, text3, text4, text5, text6) {
        this.text1 = text1;
        this.text2 = text2;
        this.text3 = text3;
        this.text4 = text4;
        this.text5 = text5;
        this.text6 = text6;
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    chooseFilter() {
        if (this.scene.filteringNearest) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        }
        else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
    }

    
    display() {

        const deg2rad = Math.PI/180;

        //face da frente
        if (this.text2 != null){
           this.material.setTexture(this.text2);
           this.chooseFilter();
        } 
        this.material.apply();
        this.scene.pushMatrix();        
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        //face de trás
        if (this.text4 != null) {
            this.material.setTexture(this.text4);
            this.chooseFilter();            
        }
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(180.0*deg2rad, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        //face da direita
        if (this.text3 != null) {
            this.material.setTexture(this.text3);
            this.chooseFilter();
        }
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(90.0*deg2rad, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        //face da esquerda
        if (this.text5 != null) {
            this.material.setTexture(this.text5);
            this.chooseFilter();
        }
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-90.0*deg2rad, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        //face de cima
        if (this.text1 != null) {
            this.material.setTexture(this.text1);
            this.chooseFilter();
        }
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-90.0*deg2rad, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //face de baixo
        if (this.text6 != null) {
            this.material.setTexture(this.text6);
            this.chooseFilter();
        }
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(90.0*deg2rad, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        
        
    }

}