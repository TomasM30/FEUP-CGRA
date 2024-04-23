import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyStem } from './MyStem.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
	constructor(scene, ext_radius, n_petals, petal_color, receptacle_radius, receptacle_color, stem_radius, stem_stacks, stem_color, flower_color) {
		super(scene);

        this.initObjects(stem_stacks, receptacle_color, receptacle_radius, petal_len, petal_color);

        this.ext_radius = ext_radius;
        this.n_petals = n_petals;
        this.stem_radius = stem_radius;
        this.petal_len = ext_radius - receptacle_radius;

        this.initMaterials(petal_color, receptacle_color, stem_color, flower_color);

		this.initBuffers();
	}

    initObjects(stem_stacks, receptacle_color, receptacle_radius, petal_len, petal_color){ {
        this.petal = new MyPetal(this.scene, 30, petal_len, petal_color);
        this.receptacle = new MyReceptacle(this.scene, 10, 10, receptacle_radius, receptacle_color);
        this.stem = new MyStem(this.scene, stem_stacks);
    }

	
	initBuffers() {


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}

