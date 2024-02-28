import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js"

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initObjects();   
        this.initmaterials();
    }
    
    initObjects() {
        this.diamond = new MyDiamond(this.scene);
        this.trianglePurple = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.trianglePink = new MyTriangle(this.scene);
        this.triangleRed = new MyTriangleSmall(this.scene);
        this.triangleOrange = new MyTriangleBig(this.scene);
        this.triangleBlue = new MyTriangleBig(this.scene);
    }

    initmaterials() {

        // Yellow
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(1, 1, 0, 1.0); 
        this.yellow.setDiffuse(1, 1, 0, 1.0); 
        this.yellow.setSpecular(1, 1, 1, 1.0); 
        this.yellow.setShininess(10.0);    
        
        // Blue
        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0.35, 0.35, 1, 1.0); 
        this.blue.setDiffuse(0.35, 0.35, 1, 1.0); 
        this.blue.setSpecular(1, 1, 1, 1.0); 
        this.blue.setShininess(10.0); 

        // Orange
        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(1, 0.5, 0, 1.0); 
        this.orange.setDiffuse(1, 0.5, 0, 1.0); 
        this.orange.setSpecular(1, 1, 1, 1.0); 
        this.orange.setShininess(10.0); 

        // Red
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(1, 0, 0, 1.0); 
        this.red.setDiffuse(1, 0, 0, 1.0); 
        this.red.setSpecular(1, 1, 1, 1.0); 
        this.red.setShininess(10.0); 

        // Pink
        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(1, 0.5, 0.8, 1.0); 
        this.pink.setDiffuse(1, 0.5, 0.8, 1.0); 
        this.pink.setSpecular(1, 1, 1, 1.0); 
        this.pink.setShininess(10.0); 

        // Purple
        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(0.5, 0, 0.5, 1.0); 
        this.purple.setDiffuse(0.5, 0, 0.5, 1.0); 
        this.purple.setSpecular(1, 1, 1, 1.0); 
        this.purple.setShininess(10.0); 

        // Green
        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0, 1, 0, 1.0); 
        this.green.setDiffuse(0, 1, 0, 1.0); 
        this.green.setSpecular(1, 1, 1, 1.0); 
        this.green.setShininess(10.0);  

    }

    display() {

        const deg2rad = Math.PI / 180;    

        const cos_a = Math.cos(45.0*deg2rad);
        const sin_a = Math.sin(45.0*deg2rad);
        const Ty = - (3 + Math.sqrt(8) + Math.sqrt(2)*2 + Math.sqrt(2) )/2 + Math.sqrt(2)/2;


        this.scene.multMatrix([
        cos_a, sin_a, 0, 0,
        -sin_a, cos_a, 0, 0,
        0, 0, 1, 0,
        0, Ty, 0, 1
        ]);
        
        
        this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.rotate(-45.0*deg2rad, 0, 0, 1);
        this.scene.pushMatrix();
        this.scene.translate(0,Math.sqrt(2),0);
        this.scene.rotate(135.0*deg2rad, 0, 0, 1);
        this.purple.apply();
        this.trianglePurple.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)/2,3*Math.sqrt(2)/2,0);
        this.scene.rotate(-45.0*deg2rad, 0, 0, 1);
        this.pink.apply();
        this.trianglePink.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0,2*Math.sqrt(2),0);
        this.scene.rotate(45.0*deg2rad, 0, 0, 1);
        this.red.apply();
        this.triangleRed.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        // sqrt(8)/2 to bring it to y=0 
        // sqrt(2)/2 to bring it to the top of the diamond
        // 2*sqrt(2) is the height of the 2 small triangles
        this.scene.translate(0, Math.sqrt(8)/2+Math.sqrt(2)/2+2*Math.sqrt(2),0);
        this.scene.rotate(135.0*deg2rad, 0, 0, 1);
        this.orange.apply();
        this.triangleOrange.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();  
        // sqrt(8)/2 to bring it to y=0 
        // sqrt(2)/2 to bring it to the top of the diamond
        // 2*sqrt(2) is the height of the 2 small triangles
        this.scene.translate(0, Math.sqrt(8)/2+Math.sqrt(2)/2+2*Math.sqrt(2),0);
        this.scene.rotate(-45.0*deg2rad, 0, 0, 1);
        this.blue.apply();
        this.triangleBlue.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2)/2+2*Math.sqrt(2)+Math.sqrt(8), 0);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(70.0*deg2rad, 0, 0, 1);
        this.yellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.trianglePurple.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.trianglePink.enableNormalViz();
        this.triangleRed.enableNormalViz();
        this.triangleOrange.enableNormalViz();
        this.triangleBlue.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.trianglePurple.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.trianglePink.disableNormalViz();
        this.triangleRed.disableNormalViz();
        this.triangleOrange.disableNormalViz();
        this.triangleBlue.disableNormalViz();
    }


}