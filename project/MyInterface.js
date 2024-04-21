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

        //Dropdown for textures
        this.gui.add(this.scene, 'selectedPanoramaTexture', this.scene.panoramaTextureIds).name('Panorama Texture').onChange(this.scene.updatePanoramaTexture.bind(this.scene));

        //Slider element for FOV
        this.gui.add(this.scene, 'FOV', 0.1, 3).name('Field of View').onChange(this.scene.updateFOV.bind(this.scene));

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}