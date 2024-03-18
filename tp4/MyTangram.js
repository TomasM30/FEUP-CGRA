import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyDiamond } from "./tangram/MyDiamond.js";
import { MyTriangle } from "./tangram/MyTriangle.js";
import { MyParallelogram } from "./tangram/MyParallelogram.js";
import { MyTriangleSmall } from "./tangram/MyTriangleSmall.js";
import { MyTriangleBig } from "./tangram/MyTriangleBig.js"

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initMaterials()
        this.initObjects();   
    }
    
    initObjects() {
        this.diamond = new MyDiamond(this.scene, "green");
        this.trianglePurple = new MyTriangleSmall(this.scene, "purple");
        this.parallelogram = new MyParallelogram(this.scene, "yellow");
        this.trianglePink = new MyTriangle(this.scene, "pink");
        this.triangleRed = new MyTriangleSmall(this.scene, "red");
        this.triangleOrange = new MyTriangleBig(this.scene, "orange");
        this.triangleBlue = new MyTriangleBig(this.scene, "blue");
    }

    initMaterials() {

        this.tangramMaterial = new CGFappearance(this.scene);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram.png');
        this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');


        // Tangram Default Materials
        // Tangram Red Material
        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(1, 0, 0, 1);
        this.redMaterial.setDiffuse(1, 0, 0, 1);
        this.redMaterial.setSpecular(1, 0, 0, 1);
        this.redMaterial.setShininess(10.0);

        // Tangram Green Material
        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.setAmbient(0, 1, 0, 1);
        this.greenMaterial.setDiffuse(0, 1, 0, 1);
        this.greenMaterial.setSpecular(0, 1, 0, 1);
        this.greenMaterial.setShininess(10.0);        

        // Tangram Blue Material
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setAmbient(0, 0, 1, 1);
        this.blueMaterial.setDiffuse(0, 0, 1, 1);
        this.blueMaterial.setSpecular(0, 0, 1, 1);
        this.blueMaterial.setShininess(10.0);

        // Tangram Yellow Material
        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(1, 1, 0, 1);
        this.yellowMaterial.setDiffuse(1, 1, 0, 1);
        this.yellowMaterial.setSpecular(1, 1, 0, 1);
        this.yellowMaterial.setShininess(10.0);

        // Tangram Orange Material
        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.setAmbient(1, 0.5, 0, 1);
        this.orangeMaterial.setDiffuse(1, 0.5, 0, 1);
        this.orangeMaterial.setSpecular(1, 0.5, 0, 1);
        this.orangeMaterial.setShininess(10.0);

        // Tangram Purple Material
        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.setAmbient(0.5, 0, 0.5, 1);
        this.purpleMaterial.setDiffuse(0.5, 0, 0.5, 1);
        this.purpleMaterial.setSpecular(0.5, 0, 0.5, 1);
        this.purpleMaterial.setShininess(10.0);

        // Tangram Rose Material
        this.roseMaterial = new CGFappearance(this.scene);
        this.roseMaterial.setAmbient(1, 0, 0.5, 1);
        this.roseMaterial.setDiffuse(1, 0, 0.5, 1);
        this.roseMaterial.setSpecular(1, 0, 0.5, 1);
        this.roseMaterial.setShininess(10.0);

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
        

        this.tangramMaterial.apply();
        
        //this.greenMaterial.apply();
        this.diamond.display();
        
        //Small triangle side has the same length has the diamond -> sqrt(2)
        //this.purpleMaterial.apply();
        this.scene.rotate(-45.0*deg2rad, 0, 0, 1);
        this.scene.pushMatrix();
        this.scene.translate(0,Math.sqrt(2),0);
        this.scene.rotate(135.0*deg2rad, 0, 0, 1);
        this.trianglePurple.display();
        this.scene.popMatrix();
        
        //this.roseMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)/2,3*Math.sqrt(2)/2,0);
        this.scene.rotate(-45.0*deg2rad, 0, 0, 1);
        this.trianglePink.display();
        this.scene.popMatrix();
        
        //this.redMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0,2*Math.sqrt(2),0);
        this.scene.rotate(45.0*deg2rad, 0, 0, 1);
        this.triangleRed.display();
        this.scene.popMatrix();
        
        //this.orangeMaterial.apply();
        this.scene.pushMatrix();
        // sqrt(8)/2 to bring it to y=0 
        // sqrt(2)/2 to bring it to the top of the diamond
        // 2*sqrt(2) is the height of the 2 small triangles
        this.scene.translate(0, Math.sqrt(8)/2+Math.sqrt(2)/2+2*Math.sqrt(2),0);
        this.scene.rotate(135.0*deg2rad, 0, 0, 1);
        this.triangleOrange.display();
        this.scene.popMatrix();
        
        //this.blueMaterial.apply();
        this.scene.pushMatrix();  
        // sqrt(8)/2 to bring it to y=0 
        // sqrt(2)/2 to bring it to the top of the diamond
        // 2*sqrt(2) is the height of the 2 small triangles
        this.scene.translate(0, Math.sqrt(8)/2+Math.sqrt(2)/2+2*Math.sqrt(2),0);
        this.scene.rotate(-45.0*deg2rad, 0, 0, 1);
        this.triangleBlue.display();
        this.scene.popMatrix();
        
        //this.yellowMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2)/2+2*Math.sqrt(2)+Math.sqrt(8), 0);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(70.0*deg2rad, 0, 0, 1);

        this.parallelogram.display();
        this.scene.popMatrix();
    }
}