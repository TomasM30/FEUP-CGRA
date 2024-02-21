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

  initMaterials() {
    // Red Material
    this.redMaterial = new CGFappearance(this.scene);
    this.redMaterial.setAmbient(1, 0, 0, 1);
    this.redMaterial.setDiffuse(1, 0, 0, 1);
    this.redMaterial.setSpecular(1, 0, 0, 1);
    this.redMaterial.setShininess(10.0);

    // Green Material
    this.greenMaterial = new CGFappearance(this.scene);
    this.greenMaterial.setAmbient(0, 1, 0, 1);
    this.greenMaterial.setDiffuse(0, 1, 0, 1);
    this.greenMaterial.setSpecular(0, 1, 0, 1);
    this.greenMaterial.setShininess(10.0);

    // Blue Material
    this.blueMaterial = new CGFappearance(this.scene);
    this.blueMaterial.setAmbient(0, 0, 1, 1);
    this.blueMaterial.setDiffuse(0, 0, 1, 1);
    this.blueMaterial.setSpecular(0, 0, 1, 1);
    this.blueMaterial.setShininess(10.0);

    // Yellow Material
    this.yellowMaterial = new CGFappearance(this.scene);
    this.yellowMaterial.setAmbient(1, 1, 0, 1);
    this.yellowMaterial.setDiffuse(1, 1, 0, 1);
    this.yellowMaterial.setSpecular(1, 1, 0, 1);
    this.yellowMaterial.setShininess(10.0);

    // Orange Material
    this.orangeMaterial = new CGFappearance(this.scene);
    this.orangeMaterial.setAmbient(1, 0.5, 0, 1);
    this.orangeMaterial.setDiffuse(1, 0.5, 0, 1);
    this.orangeMaterial.setSpecular(1, 0.5, 0, 1);
    this.orangeMaterial.setShininess(10.0);

    // Purple Material
    this.purpleMaterial = new CGFappearance(this.scene);
    this.purpleMaterial.setAmbient(0.5, 0, 0.5, 1);
    this.purpleMaterial.setDiffuse(0.5, 0, 0.5, 1);
    this.purpleMaterial.setSpecular(0.5, 0, 0.5, 1);
    this.purpleMaterial.setShininess(10.0);

    // Rose Material
    this.roseMaterial = new CGFappearance(this.scene);
    this.roseMaterial.setAmbient(1, 0, 0.5, 1);
    this.roseMaterial.setDiffuse(1, 0, 0.5, 1);
    this.roseMaterial.setSpecular(1, 0, 0.5, 1);
    this.roseMaterial.setShininess(10.0);
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
      0, -3, 0, 1
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
  }
}