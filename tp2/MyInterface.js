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

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //Checkbox element to display Diamond
        this.gui.add(this.scene, 'displayDiamond').name('Display Green');

        //Checkbox element to display Purple Triangle
        this.gui.add(this.scene, 'displayPurpleTriangle').name('Display Purple Triangle')

        //Checkbox element to display Pink Triangle
        this.gui.add(this.scene, 'displayPinkTriangle').name('Display Pink Triangle')

        //Checkbox element to display Red Triangle
        this.gui.add(this.scene, 'displayRedTriangle').name('Display Red Triangle')

        //Checkbox element to display Orangle Triangle
        this.gui.add(this.scene, 'displayOrangeTriangle').name('Display Orange Triangle')

        //Checkbox element to display Blue Triangle
        this.gui.add(this.scene, 'displayBlueTriangle').name('Display Blue Triangle')

        //Checkbox element to display Parallelogram
        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallelogram')


        return true;
    }
}