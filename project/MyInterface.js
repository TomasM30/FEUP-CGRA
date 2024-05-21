import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Checkbox element for Plane in GUI
        this.gui.add(this.scene, 'displayPlane').name('Display Plane');

        var panoramaFolder = this.gui.addFolder('Panorama and Sphere');
        //Checkbox element for Sphere in GUI
        panoramaFolder.add(this.scene, 'displaySphere').name('Display Sphere');
        //Checkbox element for Panorama in GUI
        panoramaFolder.add(this.scene, 'displayPanorama').name('Display Panorama');
        //Dropdown for textures selection in GUI
        panoramaFolder.add(this.scene, 'selectedPanoramaTexture', this.scene.panoramaTextureIds).name('Panorama Texture').onChange(this.scene.updatePanoramaTexture.bind(this.scene));
        //Slider element for FOV in GUI
        panoramaFolder.add(this.scene, 'FOV', 0.1, 3).name('Field of View').onChange(this.scene.updateFOV.bind(this.scene));

        var gardenFolder = this.gui.addFolder('Garden')
        //Checkbox element for Garden in GUI
        gardenFolder.add(this.scene, 'displayGarden').name('Display Garden');
        //Slider element for Garden Rows in GUI
        gardenFolder.add(this.scene, 'gardenRows', 1, 7, 1).name('Garden Rows').onChange(this.scene.updateGarden.bind(this.scene));
        //Slider element for Garden Columns in GUI
        gardenFolder.add(this.scene, 'gardenColumns', 1, 7, 1).name('Garden Columns').onChange(this.scene.updateGarden.bind(this.scene));


        //Checkbox element for Rock Set in GUI
        this.gui.add(this.scene, 'displayRockSet').name('Display Rock Set');

        var beeFolder = this.gui.addFolder('Bee');
        //Checkbox element for bees in GUI
        beeFolder.add(this.scene, 'displayBee').name('Display Bee');
        //Slider element for bee speed factor in GUI
        beeFolder.add(this.scene, 'beeSpeedFactor', 0.1, 3).name('Bee Speed Factor');
        //Slider element for bee scale factor in GUI
        beeFolder.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor')

        //Checkbox element for Grass in GUI
        this.gui.add(this.scene, 'displayFlowerBed').name('Display Grass');

        this.initKeys();
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;

        // disable the processKeyboard function
        this.processKeyboard = function(){};

        // create a named array to store which keys are being pressed
        this.activeKeys = {};

    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }

}