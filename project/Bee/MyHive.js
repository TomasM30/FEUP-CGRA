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
	}

    initObjects(){
        this.box1 = new MyUnitCubeQuad(this.scene);
        this.roof = new MyUnitCubeQuad(this.scene);
        this.entrance1 = new MyUnitCubeQuad(this.scene);
        this.entrance2 = new MyUnitCubeQuad(this.scene);

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
        this.scene.pushMatrix();
        this.entranceMaterial.apply();
        this.scene.translate(0, .5, 0.33);
        this.scene.scale(0.85, 0.15, 0.85);
        this.entrance2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.entranceMaterial.apply();
        this.scene.translate(0, -0.5, 0.33);
        this.scene.scale(0.85, 0.15, 0.85);
        this.entrance1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.hiveMaterial.apply();
        this.scene.translate(0,1,0);
        this.scene.scale(2, 0.3, 2);
        this.roof.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.hiveMaterial.apply();
        this.scene.scale(1.75, 2, 1.5);
        this.box1.display();
        this.scene.popMatrix();
    }
	

}

