import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../lib/CGF.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();
    this.initMaterials();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.tangram = new MyTangram(this);
    //this.unitCube = new MyUnitCube(this);
    this.unitCubeQuad = new MyUnitCubeQuad(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayTangram = true;
    
  }

  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initMaterials() {
    // Red Material
    this.redMaterial = new CGFappearance(this);
    this.redMaterial.setAmbient(1, 0, 0, 1);
    this.redMaterial.setDiffuse(1, 0, 0, 1);
    this.redMaterial.setSpecular(1, 0, 0, 1);
    this.redMaterial.setShininess(10.0);

    // Green Material
    this.greenMaterial = new CGFappearance(this);
    this.greenMaterial.setAmbient(0, 1, 0, 1);
    this.greenMaterial.setDiffuse(0, 1, 0, 1);
    this.greenMaterial.setSpecular(0, 1, 0, 1);
    this.greenMaterial.setShininess(10.0);

    // Blue Material
    this.blueMaterial = new CGFappearance(this);
    this.blueMaterial.setAmbient(0, 0, 1, 1);
    this.blueMaterial.setDiffuse(0, 0, 1, 1);
    this.blueMaterial.setSpecular(0, 0, 1, 1);
    this.blueMaterial.setShininess(10.0);

    // Yellow Material
    this.yellowMaterial = new CGFappearance(this);
    this.yellowMaterial.setAmbient(1, 1, 0, 1);
    this.yellowMaterial.setDiffuse(1, 1, 0, 1);
    this.yellowMaterial.setSpecular(1, 1, 0, 1);
    this.yellowMaterial.setShininess(10.0);

    // Orange Material
    this.orangeMaterial = new CGFappearance(this);
    this.orangeMaterial.setAmbient(1, 0.5, 0, 1);
    this.orangeMaterial.setDiffuse(1, 0.5, 0, 1);
    this.orangeMaterial.setSpecular(1, 0.5, 0, 1);
    this.orangeMaterial.setShininess(10.0);

    // Purple Material
    this.purpleMaterial = new CGFappearance(this);
    this.purpleMaterial.setAmbient(0.5, 0, 0.5, 1);
    this.purpleMaterial.setDiffuse(0.5, 0, 0.5, 1);
    this.purpleMaterial.setSpecular(0.5, 0, 0.5, 1);
    this.purpleMaterial.setShininess(10.0);

    // Rose Material
    this.roseMaterial = new CGFappearance(this);
    this.roseMaterial.setAmbient(1, 0, 0.5, 1);
    this.roseMaterial.setDiffuse(1, 0, 0.5, 1);
    this.roseMaterial.setSpecular(1, 0, 0.5, 1);
    this.roseMaterial.setShininess(10.0);
  }

  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);
    // ---- BEGIN Primitive drawing section

    const size = Math.sqrt(2)*3+Math.sqrt(8)+3 + 0.4; //0.4 for approximate to the size of the tangram

    this.pushMatrix();
    this.translate(size/2, -size/2, 0)

    this.pushMatrix();
    this.translate(0,0,-size/2);
    this.scale(size, size, size);
    //this.unitCube.display();
    this.unitCubeQuad.display();
    this.popMatrix();

    if (this.displayTangram) {
      this.tangram.display();
    }

    // ---- END Primitive drawing section
  }
}
