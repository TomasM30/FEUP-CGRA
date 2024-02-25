import { CGFobject } from "../lib/CGF.js";
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

    display() {

        const deg2rad = Math.PI / 180;    

        const cos_a = Math.cos(45.0*deg2rad);
        const sin_a = Math.sin(45.0*deg2rad);
        const Ty = - (3 + Math.sqrt(8) + Math.sqrt(2)*2 + Math.sqrt(2)/2 )/2 + Math.sqrt(2)/2;


        this.scene.multMatrix([
        cos_a, sin_a, 0, 0,
        -sin_a, cos_a, 0, 0,
        0, 0, 1, 0,
        0, Ty, 0, 1
        ]);
        
        
        this.scene.greenMaterial.apply();
        this.diamond.display();
        
        //Small triangle side has the same length has the diamond -> sqrt(2)
        this.scene.purpleMaterial.apply();
        this.scene.rotate(-45.0*deg2rad, 0, 0, 1);
        this.scene.pushMatrix();
        this.scene.translate(0,Math.sqrt(2),0);
        this.scene.rotate(135.0*deg2rad, 0, 0, 1);
        this.trianglePurple.display();
        this.scene.popMatrix();
        
        this.scene.roseMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)/2,3*Math.sqrt(2)/2,0);
        this.scene.rotate(-45.0*deg2rad, 0, 0, 1);
        this.trianglePink.display();
        this.scene.popMatrix();
        
        this.scene.redMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0,2*Math.sqrt(2),0);
        this.scene.rotate(45.0*deg2rad, 0, 0, 1);
        this.triangleRed.display();
        this.scene.popMatrix();
        
        this.scene.orangeMaterial.apply();
        this.scene.pushMatrix();
        // sqrt(8)/2 to bring it to y=0 
        // sqrt(2)/2 to bring it to the top of the diamond
        // 2*sqrt(2) is the height of the 2 small triangles
        this.scene.translate(0, Math.sqrt(8)/2+Math.sqrt(2)/2+2*Math.sqrt(2),0);
        this.scene.rotate(135.0*deg2rad, 0, 0, 1);
        this.triangleOrange.display();
        this.scene.popMatrix();
        
        this.scene.blueMaterial.apply();
        this.scene.pushMatrix();  
        // sqrt(8)/2 to bring it to y=0 
        // sqrt(2)/2 to bring it to the top of the diamond
        // 2*sqrt(2) is the height of the 2 small triangles
        this.scene.translate(0, Math.sqrt(8)/2+Math.sqrt(2)/2+2*Math.sqrt(2),0);
        this.scene.rotate(-45.0*deg2rad, 0, 0, 1);
        this.triangleBlue.display();
        this.scene.popMatrix();
        
        this.scene.yellowMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2)/2+2*Math.sqrt(2)+Math.sqrt(8), 0);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(70.0*deg2rad, 0, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();
    }
}