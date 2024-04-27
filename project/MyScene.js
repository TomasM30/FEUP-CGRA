import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./SkySphere/MySphere.js";
import { MyPanorama } from "./SkySphere/MyPanorama.js";
import { MyFlower } from "./Flower/MyFlower.js";
import { MyGarden } from "./Flower/MyGarden.js";

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

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayPlane = false;
    this.displaySphere = false;
    this.displayPanorama = false;
    this.displayFlower = true;
    this.displayGarden = false;
    this.gardenRows = 3;
    this.gardenColumns = 1;
    this.base_size = 1;
    this.FOV = 1.0;
    this.scaleFactor = 1;
    this.selectedPanoramaTexture = 1;
    this.enableTextures(true);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, 30, 30);

    let petalColor = [1, 1, 0];
    let receptacleColor = [88/255, 57/255, 39/255];
    let stemColor = [24/255, 70/255, 50/255];
    this.flower = new MyFlower(this, 3, 10, 1, 0.1, 5, petalColor, receptacleColor, stemColor);

    this.garden = new MyGarden(this, this.gardenRows, this.gardenColumns);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.sphereMaterial = new CGFappearance(this);
    this.sphereMaterial.loadTexture('images/earth.jpg');
    this.sphereMaterial.setTextureWrap('REPEAT', 'REPEAT');

    //Initialize Panorama object and Textures

    this.panoramaTextureIds = { 'Panorama 1': 0, 'Panorama 2': 1, 'Panorama 3': 2 };

    this.panoramaTexture1 = new CGFtexture(this, "images/panorama1.jpg");
    this.panoramaTexture2 = new CGFtexture(this, "images/panorama2.jpg");
    this.panoramaTexture3 = new CGFtexture(this, "images/panorama3.jpg");
    this.panoramaTextures = [this.panoramaTexture1, this.panoramaTexture2, this.panoramaTexture3]

    this.panorama = new MyPanorama(this, this.panoramaTextures[this.selectedPanoramaTexture]);
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  updateFOV() {
    this.camera.fov = this.FOV;
  }

  updatePanoramaTexture() {
    this.panorama.updateTexture(this.panoramaTextures[this.selectedPanoramaTexture]);
  }

  updateGarden() {
    this.garden = new MyGarden(this, this.gardenRows, this.gardenColumns);
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

    // ---- BEGIN Primitive drawing section

    if (this.displayPlane) {
      this.pushMatrix();
      this.appearance.apply();
      this.translate(0,-100,0);
      this.scale(400,400,400);
      this.rotate(-Math.PI/2.0,1,0,0);
      this.plane.display();
      this.popMatrix();
    }

    if (this.displaySphere) {
      this.pushMatrix();
      this.sphereMaterial.apply();
      this.sphere.display();
      this.popMatrix();
    }

    if (this.displayPanorama) {
      this.pushMatrix();
      this.panorama.display();
      this.popMatrix();
    }

    if (this.displayFlower) {
      this.pushMatrix();
      this.sphereMaterial.apply();
      this.flower.display();
      this.popMatrix();
    }

    if (this.displayGarden) {
      this.pushMatrix();
      this.garden.display();
      this.popMatrix();
    }



    // ---- END Primitive drawing section
  }
}
