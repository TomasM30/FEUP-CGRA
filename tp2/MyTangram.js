import { CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js"

export class MyTangram extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initObjects();
  }

  initObjects() {
    this.diamond = new MyDiamond(this.scene);
    this.trianglePurple = new MyTriangle(this.scene);
    this.parallelogram = new MyParallelogram(this.scene);
    this.trianglePink = new MyTriangleSmall(this.scene);
    this.triangleRed = new MyTriangle(this.scene);
    this.triangleOrange = new MyTriangleBig(this.scene);
    this.triangleBlue = new MyTriangleBig(this.scene);
  }

  display() {
    const deg2rad = Math.PI / 180;    
  
    const cos_a = Math.cos(45.0*deg2rad);
    const sin_a = Math.sin(45.0*deg2rad);
  
    this.scene.pushMatrix(); // Save the current transformation matrix
  
    this.scene.multMatrix([
      cos_a, -sin_a, 0, 0,
      sin_a, cos_a, 0, 0,
      0, 0, 1, 0,
      0, -4, 0, 1
    ]);
    
    this.diamond.display();
    this.scene.pushMatrix();
    this.scene.rotate(45.0*deg2rad, 0, 0, 1);
    this.scene.scale(1/Math.sqrt(2), 1/Math.sqrt(2),1);
    this.scene.translate(0,2,0);
    this.trianglePurple.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.scale(Math.sqrt(2), Math.sqrt(2),1);
    this.scene.rotate(135.0*deg2rad,0,0,1);
    this.scene.translate(1.5,-0.5,0);
    this.trianglePink.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(-45.0*deg2rad, 0, 0, 1);
    this.scene.scale(1/Math.sqrt(2), 1/Math.sqrt(2),1);
    this.scene.pushMatrix();
    this.scene.translate(-4,0,0)
    this.triangleRed.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(-7.1,0,0);
    this.scene.scale(1.5,1.5,0);
    this.scene.rotate(-135.0*deg2rad,0,0,1);
    this.triangleOrange.display();
    this.scene.scale(-1,-1,1);
    this.triangleBlue.display();
    this.scene.popMatrix();
    this.scene.scale(-1,1,1);
    this.scene.translate(9.2,0,0);
    this.scene.rotate(-20.0*deg2rad, 0, 0, 1);
    this.parallelogram.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
  }
}