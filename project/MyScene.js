import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./Common/MySphere.js";
import { MyPanorama } from "./SkySphere/MyPanorama.js";
import { MyGarden } from "./Flower/MyGarden.js";
import { MyRockSet } from "./RockSet/MyRockSet.js";
import { MyBee } from "./Bee/MyBee.js";
import { MyHive } from "./Bee/MyHive.js";
import { MyFlowerBed } from "./Grass/MyFlowerBed.js";

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
    this.displayPlane = true;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.selectedPanoramaTexture = 0;
    this.FOV = 1.7;
    this.displayGarden = true;
    this.gardenRows = 5;
    this.gardenColumns = 5;
    this.displayRockSet = true;
    this.base_size = 4;
    this.displayBee = true;
    this.beeSpeedFactor = 0.1;
    this.scaleFactor = 0.5;
    this.displayFlowerBed = true;
    this.flowerBedSize = 50;

    this.enableTextures(true);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,100, 0, 10, 0, 10);
    this.sphere = new MySphere(this, 30, 30);
    this.panorama = new MyPanorama(this, this.panoramaTextures[this.selectedPanoramaTexture]);
    
    this.petalColors = [
      [1, 0.5, 0.5], // light red
      [0.5, 1, 0.5], // light green
      [0.5, 0.5, 1], // light blue
      [1, 1, 0.5], // light yellow
      [1, 0.5, 1], // light magenta
      [0.5, 1, 1]  // light cyan
    ];
    this.garden = new MyGarden(this, this.gardenRows, this.gardenColumns);
    this.rockSet = new MyRockSet(this, this.base_size, this.rockTexture);
    this.bee = new MyBee(this, [0, 3, 0], 0, [0, 0, 0]);
    this.hive = new MyHive(this);
    this.flowerBed = new MyFlowerBed(this, this.flowerBedSize);
    this.heartCoord = [];
    this.hiveCoords = [-this.base_size, 2.5, -this.base_size];


    // Scale the coords of the flowers to be checked by the bee
    for (let flower of this.garden.flowers) {
      let scaledCoords = flower.coords.map((coord, index) => {
        if (index < 3) {
            return coord * (3 / 9);
        } else {
            return coord;
        }
    });      
    this.heartCoord.push(scaledCoords);
  }

    this.appStartTime=Date.now(); // current time in milisecs
    this.setUpdatePeriod(50); // **at least** 50 ms between animations
  }

  // Created 3 lights to make the scene brighter
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
    
    this.lights[1].setPosition(0, 10, 0, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update();

    this.lights[2].setPosition(0, 0, 10, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].enable();
    this.lights[2].update();
 
  }

  initCameras() {
    this.camera = new CGFcamera(
      1,
      0.1,
      1000,
      vec3.fromValues(-50, 25, 25),
      vec3.fromValues(0, 0, 0)
    );
  }

  initMaterialsAndTextures() {
    this.floorTexture = new CGFtexture(this, "images/floor.jpg");

    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.floorTexture);
    this.appearance.setAmbient(1, 1, 1, 1);
    this.appearance.setDiffuse(1, 1, 1, 1);
    this.appearance.setSpecular(1, 1, 1, 1);
    this.appearance.setShininess(10.0);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.sphereMaterial = new CGFappearance(this);
    this.sphereMaterial.loadTexture('images/earth.jpg');
    this.sphereMaterial.setTextureWrap('REPEAT', 'REPEAT');

    //Initialize Panorama Textures
    this.panoramaTextureIds = { 'Panorama 1': 0, 'Panorama 2': 1, 'Panorama 3': 2, 'Panorama 4': 3};
    this.panoramaTexture1 = new CGFtexture(this, "images/panorama/panorama1.jpg");
    this.panoramaTexture2 = new CGFtexture(this, "images/panorama/panorama2.jpg");
    this.panoramaTexture3 = new CGFtexture(this, "images/panorama/panorama3.jpg");
    this.panoramaTexture4 = new CGFtexture(this, "images/panorama/panorama4.jpg");
    this.panoramaTextures = [this.panoramaTexture1, this.panoramaTexture2, this.panoramaTexture3, this.panoramaTexture4]

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

    // beeHead and beeTorax textures are the same, but we created two different variables to mantain the code more readable
    this.beeLegTexture = new CGFtexture(this, 'images/bee/Leg.jpg');
    this.beeHeadTexture = new CGFtexture(this, 'images/bee/Torax.jpg');
    this.beeEyeTexture = new CGFtexture(this, 'images/bee/Eye.jpg');
    this.beeToraxTexture = this.beeHeadTexture;
    this.beeAbdomenTexture = new CGFtexture(this, 'images/bee/Abdomen.jpg');
    this.beeWingTexture = new CGFtexture(this, 'images/bee/Wing.jpg');

    this.pollenTexture = new CGFtexture(this, 'images/pollen/Pollen.jpg');

    this.hiveTexture = new CGFtexture(this, 'images/hive/Hive.jpg');
    this.roofTexture = new CGFtexture(this, 'images/hive/Roof.jpg');
    this.entranceTexture = new CGFtexture(this, 'images/hive/Entrance.jpeg');

    this.grassTexture = new CGFtexture(this, 'images/grass.jpg');
    this.grassShader = new CGFshader(this.gl, 'Grass/shaders/grass.vert', 'Grass/shaders/grass.frag');
    this.grassShader.setUniformsValues({ timeFactor: 0, windStrength: 0.1 });
  }

  updateFOV() {
    this.camera.fov = this.FOV;
  }

  updatePanoramaTexture() {
    this.panorama.updateTexture(this.panoramaTextures[this.selectedPanoramaTexture]);
  }

  // We need to create a new garden object to update the number of rows and columns and check the colisions with the objects
  updateGarden() {
    this.garden = new MyGarden(this, this.gardenRows, this.gardenColumns);
  }  

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  // Wind is updated for each grass object
  updateWind() {
      this.grassShader.setUniformsValues({ windStrength: Math.random() * 0.1 + 0.1});
  }

  // Called periodically (as per setUpdatePeriod() in init())
  update(t)
  {
      // Continuous animation based on current time and app start time 
      var timeSinceAppStart=(t-this.appStartTime)/1000.0;

      // updates the bee position based on his state
      this.bee.update(timeSinceAppStart);

      // Reads the key inputs
      this.checkKeys();

      // Updates the wind with the time factors
      this.grassShader.setUniformsValues({ timeFactor: t / 100 % 100000 });
  }

  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed=false;
    if(this.bee.state == "controlled"){
      if (this.gui.isKeyPressed("KeyW")) { // Accelerate
          text+=" W ";
          keysPressed=true;
          this.bee.accelerate(this.beeSpeedFactor);
      }
      if (this.gui.isKeyPressed("KeyS")) { // Break
          text+=" S ";
          keysPressed=true;
          this.bee.accelerate(-this.beeSpeedFactor);
      }
      if (this.gui.isKeyPressed("KeyA")) { // Turn left
          text+=" A ";
          keysPressed=true;
          this.bee.turn(Math.PI/20);
      }
      if (this.gui.isKeyPressed("KeyD")) { // Turn right
          text+=" D ";
          keysPressed=true;
          this.bee.turn(-Math.PI/20);
      }

      if (this.gui.isKeyPressed("KeyF") && this.displayGarden) { // Descend
        text += " F ";
        keysPressed = true;
        console.log(this.bee.speed);
        this.bee.descendingSpeed = [this.bee.speed[0], -0.2, this.bee.speed[2]];
        this.bee.state = "descending"
      }

      if (this.gui.isKeyPressed("KeyR")) { // Reset
        text += " R ";
        keysPressed = true;
        
        this.bee.reset();
        this.bee.state = "controlled";
      }

      if (this.gui.isKeyPressed("KeyO") && this.bee.pollen !=null) { // Go to hive and drop pollen
        text += " O ";
        keysPressed = true;
        this.bee.state = "pollenDrop"
      }
    }
    else if (this.bee.state == "stopped") { // Only works after the bee descends
      if (this.gui.isKeyPressed("KeyP")  && this.displayGarden) { // Ascend
        text += " P ";
        keysPressed = true;
        this.bee.ascendSpeed = [0,0.2,0];
        this.bee.state = "ascending"
      }
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

    /**
     * Scales the plane to make it bigger than the observer can see
     * Rotates the plane to be horizontal
     * Displays the plane with the desired texture
     */
    if (this.displayPlane) {
      this.pushMatrix();
      this.appearance.apply();
      this.translate(0,0,0);
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

    if (this.displayPanorama) this.panorama.display();

    // Scales the garden to be smaller than the bee 
    if (this.displayGarden) {
      this.pushMatrix();
      this.scale(3/9,3/9, 3/9);
      this.garden.display();
      this.popMatrix();
    }
    
    if (this.displayRockSet) {
      this.pushMatrix();
      this.translate(-2*this.base_size, 0, -2*this.base_size);
      this.rockSet.display();
      this.popMatrix();
    }

    /**
     * Activates the grass shader
     * Translates the flower bed to the desired position
     * Displays the flower bed
     * Deactivates the grass shader
     */
    if (this.displayFlowerBed) {
      this.setActiveShader(this.grassShader);
      this.pushMatrix();
      this.translate(-25, 0, -25);
      this.flowerBed.display();
      this.popMatrix();
      this.setActiveShader(this.defaultShader);
    }

    /**
     * Translates the hive to hive to the (0,0,0) position so that
     * the scaling doesn't affect the position of the bee
     * Displays the bee
     */
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
