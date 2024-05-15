import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyCylinder } from "../Common/MyCylinder.js";
import { MyLeaf } from "./MyLeaf.js";

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
    constructor(scene, numCilynders, radius, stemMaterial, leavesTextures) {
        super(scene);

        this.numCilynders = numCilynders;
        this.radius = radius;
        this.stemMaterial = stemMaterial;
        this.cilynders = [];
        this.leaves = [];
        this.rotationsY = [];
        this.rotationsZ = [];
        this.leavesTextures = leavesTextures;
        this.leafTextureOrder = [];

        this.initObjects();
        this.initMaterials();

    }

    initObjects(){
        for(let i = 0; i < this.numCilynders; i++){
            let height = Math.random() + 0.5;
            let rotationX = (Math.random() * 50 - 25) * (Math.PI / 180);
            let rotationY = (Math.random() * 50 - 25) * (Math.PI / 180);
            let cylinder = new MyCylinder(this.scene, 30, 30, height, rotationX, rotationY);
            this.cilynders.push(cylinder);
        }

        for(let i = 0; i < this.numCilynders - 1; i++){
            let leaf = new MyLeaf(this.scene, this.radius);
            let randomRotationY = Math.random() * 360 * (Math.PI / 180);
            let randomRotationZ = Math.random() * 360 * (Math.PI / 180);
            this.rotationsY.push(randomRotationY);
            this.rotationsZ.push(randomRotationZ);
            this.leaves.push(leaf);
        }
    }

    initMaterials(){

        this.leafMaterial = new CGFappearance(this.scene);
        this.leafMaterial.setAmbient(1, 1, 1, 1);
        this.leafMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leafMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.leafMaterial.setShininess(10.0);
        this.leafMaterial.setTextureWrap('REPEAT', 'REPEAT');

        for (let i = 0; i < this.leaves.length; i++) {

            let num = Math.random();
            if (num < 0.25) {
                this.leafTextureOrder.push(this.leavesTextures[0]);
            }
            else if (num < 0.5) {
                this.leafTextureOrder.push(this.leavesTextures[1]);
            }
            else if (num < 0.75) {
                this.leafTextureOrder.push(this.leavesTextures[2]);
            }
            else {
                this.leafTextureOrder.push(this.leavesTextures[3]);
            }
        }

    }

    display(){

        let totalHeight = 0;
        let xTranslation = 0;
        let zTranslation = 0;
        for(let i = 0; i < this.numCilynders; i++){
            
            this.scene.pushMatrix();
            this.scene.scale(this.radius, 1, this.radius);
            this.scene.translate(xTranslation, -totalHeight, zTranslation);
            this.stemMaterial.apply();
            this.cilynders[i].display();
            this.scene.popMatrix();
            totalHeight += this.cilynders[i].height;
            xTranslation += this.cilynders[i].getExtremeX();
            zTranslation += this.cilynders[i].getExtremeZ();
            
            if (i < this.numCilynders - 1) {
                this.scene.pushMatrix();
                this.scene.translate(xTranslation*this.radius, -totalHeight, zTranslation*this.radius);
                this.scene.rotate(this.rotationsY[i], 0, 1, 0);
                this.scene.rotate(this.rotationsZ[i], 0, 0, 1);
                this.scene.rotate(Math.PI / 2, 1, 0, 0);
                this.leafMaterial.setTexture(this.leafTextureOrder[i]);
                this.leafMaterial.apply();
                this.leaves[i].display();
                this.scene.popMatrix();
            }

        }

    }

    getStemHeight(){
        let totalHeight = 0;
        for(let i = 0; i < this.numCilynders; i++){
            totalHeight += this.cilynders[i].height;
        }
        return totalHeight;
    }
}