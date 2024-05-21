import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyUnitCubeQuad } from '../Common/MyUnitCubeQuad.js';

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initObjects();
        this.initMaterials();

        // Pollen object that will be displayed on the hive when the bee reaches the hive
        this.pollen = null;
	}

    // Hive composed by the main structure (box), a roof and two entrances
    initObjects(){
        this.box1 = new MyUnitCubeQuad(this.scene);
        this.roof = new MyUnitCubeQuad(this.scene);
        this.entrance1 = new MyUnitCubeQuad(this.scene);
        this.entrance2 = new MyUnitCubeQuad(this.scene);

    }

    /**
    * Add a pollen object to the hive object
    * @param pollen - Pollen object that will be displayed
    */
    addPollen(pollen){
        this.pollen = pollen;
    }

    initMaterials(){
        this.hiveMaterial = new CGFappearance(this.scene);
        this.hiveMaterial.setAmbient(1, 1, 1, 1);
        this.hiveMaterial.setDiffuse(1, 1, 1, 1);
        this.hiveMaterial.setSpecular(1, 1, 1, 1);
        this.hiveMaterial.setShininess(10.0);
        this.hiveMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.hiveMaterial.setTexture(this.scene.hiveTexture);

        this.entranceMaterial = new CGFappearance(this.scene);
        this.hiveMaterial.setAmbient(1, 1, 1, 1);
        this.hiveMaterial.setDiffuse(1, 1, 1, 1);
        this.hiveMaterial.setSpecular(1, 1, 1, 1);
        this.hiveMaterial.setShininess(10.0);
        this.entranceMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.entranceMaterial.setTexture(this.scene.entranceTexture);
    }

    display(){
    
        /**
         * Display the pollen object on the down entrance of the hive
         */
        this.scene.pushMatrix();
        if(this.pollen != null){
            this.scene.translate(0, -.65, .75);
            this.scene.scale(0.05, 0.05, 0.05);
            this.pollen.display();
        }
        this.scene.popMatrix();
        
        // Display the up entrance
        this.scene.pushMatrix();
        this.entranceMaterial.apply();
        this.scene.translate(0, .5, 0.33);
        this.scene.scale(0.85, 0.35, 0.85);
        this.entrance2.display();
        this.scene.popMatrix();

        // Display the down entrance
        this.scene.pushMatrix();
        this.entranceMaterial.apply();
        this.scene.translate(0, -0.5, 0.33);
        this.scene.scale(0.85, 0.35, 0.85);
        this.entrance1.display();
        this.scene.popMatrix();

        // Display the roof
        this.scene.pushMatrix();
        this.hiveMaterial.apply();
        this.scene.translate(0,1,0);
        this.scene.scale(2, 0.3, 2);
        this.roof.display();
        this.scene.popMatrix();

        // Display and transform the main structure of the hive to make it look like a parallelepiped
        this.scene.pushMatrix();
        this.hiveMaterial.apply();
        this.scene.scale(1.75, 2, 1.5);
        this.box1.display();
        this.scene.popMatrix();
    }
	

}

