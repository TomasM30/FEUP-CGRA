import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./Common/MySphere.js";
import { MyPanorama } from "./SkySphere/MyPanorama.js";
import { MyGarden } from "./Flower/MyGarden.js";
import { MyRockSet } from "./RockSet/MyRockSet.js";
import { MyBee } from "./Bee/MyBee.js";

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
    this.initMaterialsAndTextures();

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
    this.displayPanorama = true;
    this.selectedPanoramaTexture = 0;
    this.FOV = 1.7;
    this.displayGarden = false;
    this.gardenRows = 1;
    this.gardenColumns = 1;
    this.displayRockSet = false;
    this.base_size = 4;
    this.displayBee = true;
    this.beeSpeedFactor = 0.1;
    this.scaleFactor = 1.0;

    this.enableTextures(true);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, 30, 30);
    this.panorama = new MyPanorama(this, this.panoramaTextures[this.selectedPanoramaTexture]);
    this.garden = new MyGarden(this, this.gardenRows, this.gardenColumns);
    this.rockSet = new MyRockSet(this, this.base_size, this.rockTexture);
    this.bee = new MyBee(this, [0, 3, 0], 0, [0, 0, 0]);

    this.appStartTime=Date.now(); // current time in milisecs
    this.setUpdatePeriod(50); // **at least** 50 ms between animations
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  initMaterialsAndTextures() {
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.sphereMaterial = new CGFappearance(this);
    this.sphereMaterial.loadTexture('images/earth.jpg');
    this.sphereMaterial.setTextureWrap('REPEAT', 'REPEAT');


    //Initialize Panorama Textures
    this.panoramaTextureIds = { 'Panorama 1': 0, 'Panorama 2': 1, 'Panorama 3': 2 };
    this.panoramaTexture1 = new CGFtexture(this, "images/panorama/panorama1.jpg");
    this.panoramaTexture2 = new CGFtexture(this, "images/panorama/panorama2.jpg");
    this.panoramaTexture3 = new CGFtexture(this, "images/panorama/panorama3.jpg");
    this.panoramaTextures = [this.panoramaTexture1, this.panoramaTexture2, this.panoramaTexture3]

    this.petalTextures = [];
    this.petalTextures.push(new CGFtexture(this, 'images/petals_flower/Petal1.jpg'));
    this.petalTextures.push(new CGFtexture(this, 'images/petals_flower/Petal2.jpg'));
    this.petalTextures.push(new CGFtexture(this, 'images/petals_flower/Petal3.jpg'));
    this.petalTextures.push(new CGFtexture(this, 'images/petals_flower/Petal4.jpg'));

    this.receptacleTextures = [];
    this.receptacleTextures.push(new CGFtexture(this, 'images/hearts_flower/Heart1.jpg'));
    this.receptacleTextures.push(new CGFtexture(this, 'images/hearts_flower/Heart2.jpg'));
    this.receptacleTextures.push(new CGFtexture(this, 'images/hearts_flower/Heart3.jpg'));
    this.receptacleTextures.push(new CGFtexture(this, 'images/hearts_flower/Heart4.jpg'));
    
    this.stemTextures = [];
    this.stemTextures.push(new CGFtexture(this, 'images/stems_flower/Stem1.jpg'));
    this.stemTextures.push(new CGFtexture(this, 'images/stems_flower/Stem2.jpg'));
    this.stemTextures.push(new CGFtexture(this, 'images/stems_flower/Stem3.jpg'));
    this.stemTextures.push(new CGFtexture(this, 'images/stems_flower/Stem4.jpg'));

    this.leavesTextures = [];
    this.leavesTextures.push(new CGFtexture(this, 'images/leaves_flower/Leaf1.jpg'));
    this.leavesTextures.push(new CGFtexture(this, 'images/leaves_flower/Leaf2.jpg'));
    this.leavesTextures.push(new CGFtexture(this, 'images/leaves_flower/Leaf3.jpg'));
    this.leavesTextures.push(new CGFtexture(this, 'images/leaves_flower/Leaf4.jpg'));

    this.rockTexture = new CGFtexture(this, 'images/rock.jpg');

    this.beeLegTexture = new CGFtexture(this, 'images/bee/Leg.jpg');
    this.beeHeadTexture = new CGFtexture(this, 'images/bee/Torax.jpg');
    this.beeEyeTexture = new CGFtexture(this, 'images/bee/Eye.jpg');
    this.beeToraxTexture = new CGFtexture(this, 'images/bee/Torax.jpg');
    this.beeAbdomenTexture = new CGFtexture(this, 'images/bee/Abdomen.jpg');
    this.beeWingTexture = new CGFtexture(this, 'images/bee/Wing.jpg');
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
  
  updateBaseSize() {
    this.rockSet = new MyRockSet(this, this.base_size, this.rockTexture);
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  update(t)
  {
      // Continuous animation based on current time and app start time 
      var timeSinceAppStart=(t-this.appStartTime)/1000.0;

      this.bee.update(timeSinceAppStart);

      this.checkKeys();
  }

  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed=false;
    if (this.gui.isKeyPressed("KeyW")) {
        text+=" W ";
        keysPressed=true;
        this.bee.accelerate(this.beeSpeedFactor);
    }
    if (this.gui.isKeyPressed("KeyS")) {
        text+=" S ";
        keysPressed=true;
        this.bee.accelerate(-this.beeSpeedFactor);
    }
    if (this.gui.isKeyPressed("KeyA")) {
        text+=" A ";
        keysPressed=true;
        this.bee.turn(Math.PI/20);
    }
    if (this.gui.isKeyPressed("KeyD")) {
        text+=" D ";
        keysPressed=true;
        this.bee.turn(-Math.PI/20);
    }
    if (this.gui.isKeyPressed("KeyR")) {
        text += " R ";
        keysPressed = true;
        this.bee.reset();
    }
    if (keysPressed)
        console.log(text);
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

    if (this.displayGarden) {
      this.pushMatrix();
      this.garden.display();
      this.popMatrix();
    }
    
    if (this.displayRockSet) {
      this.pushMatrix();
      this.rockSet.display();
      this.popMatrix();
    }

    if (this.displayBee) {
      this.pushMatrix();
      this.translate(this.bee.position[0], this.bee.position[1], this.bee.position[2]);
      this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      this.translate(-this.bee.position[0], -this.bee.position[1], -this.bee.position[2]);      
      this.bee.display();
      this.popMatrix();


    }

    // ---- END Primitive drawing section
  }

  
}
