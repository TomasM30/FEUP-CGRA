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

        //Checkbox element for Sphere in GUI
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');

        //Checkbox element for Panorama in GUI
        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama');

        //Dropdown for textures
        this.gui.add(this.scene, 'selectedPanoramaTexture', this.scene.panoramaTextureIds).name('Panorama Texture').onChange(this.scene.updatePanoramaTexture.bind(this.scene));

        //Slider element for FOV
        this.gui.add(this.scene, 'FOV', 0.1, 3).name('Field of View').onChange(this.scene.updateFOV.bind(this.scene));

        //Checkbox element for Garden in GUI
        this.gui.add(this.scene, 'displayGarden').name('Display Garden');

        //Slider element for Garden Rows in GUI
        this.gui.add(this.scene, 'gardenRows', 1, 10, 1).name('Garden Rows').onChange(this.scene.updateGarden.bind(this.scene));

        //Slider element for Garden Columns in GUI
        this.gui.add(this.scene, 'gardenColumns', 1, 10, 1).name('Garden Columns').onChange(this.scene.updateGarden.bind(this.scene));

        //Checkbox element for Rock Set in GUI
        this.gui.add(this.scene, 'displayRockSet').name('Display Rock Set');

        //Slider element for base size of Rock Set
        this.gui.add(this.scene, 'base_size', 1, 10, 1).name('Base Size').onChange(this.scene.updateBaseSize.bind(this.scene));

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
    }
}