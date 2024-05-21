# CG 2023/2024

## Group T07G03
| Name             | Number    |
| ---------------- | --------- |
| José Martins     | 202108794 |
| Tomás Martins    | 202108776 |

## Instructions

| Control Key | Description |
| ----------- | ----------- |
| W           | Accelerate |
| A           | Turn Bee left |
| D           | Turn Bee right |
| S           | Brake |
| F           | Make the Bee descend to pick a pollen |
| P           | Make the Bee ascend after descending |
| O           | Transport the pollen to the hive after picking a pollen |
| R           | Restart the Bee position and velocity to the original one |

# Description

More detailed information about the project can be found in the documentation in the files.

## 1. SkySphere

### 1.1 Sphere Creation

The Sphere was used for more than just the panorama. To do that, we added some more parameters to the sphere creation function. It receives the number of slices and stacks, if it is inverted or not, the radius of the sphere and the texture to be applied.
It was hard to make the sphere look like a sphere, with the desired slices and stacks, but after it was done, it was easy to do the rest of the sphere.

### 1.2 Panorama
The panorama is a sphere with a texture that is applied to it. The texture is a panorama of a sky that is applied to the sphere. The sphere is placed in the center of the scene and the camera is placed inside the sphere, so the panorama is always visible.

### Screenshots

![panorama](screenshots/project-t07g3-1_1.png)
![panorama](screenshots/project-t07g3-1_2.png)
![panorama](screenshots/project-t07g3-1_3.png)

## 2. Flowers

### 2.1 Flower Model

The Flower model is composed by the following parts:
- Petal
- Stem
- Leaves
- Receptacle
- Pollen

#### 2.1.1 Petal

Petal model is composed by two triangles that are united by their bases and form an angle between them.

#### 2.1.2 Stem

The stem is composed by numerous cylinders with oblique sides that are united by their bases. Between each cylinder there is a leaf.

#### 2.1.3 Leaves

The leaves are composed by two triangles with a cylinder in the middle that works as an extension of the stem.

#### 2.1.4 Receptacle

The receptacle is a sphere that is placed on top of the stem and is the base of the petals.

#### 2.1.5 Garden

The garden is composed by a matrix of flowers objects.

### 2.2 Randomness on flower generation

The flower ans its components are randomly generated. The following parameters are randomly generated:

- Number of petals
- Colour of the petals
- Radius of the flower's heart
- Stem cylinder radius
- Stem size (number of stem cylinders)
- Cylinders of stem height
- Angles necessaries

### Screenshots

![Matrix of flowers](screenshots/project-t07g3-2_1.png)

![Single Flower](screenshots/project-t07g3-2_2.png)

## 3. Rocks and boulders

### 3.1 Rock Modelation

Each rock is a sphere with random scaling, with a texture applied to it. It was easy to make the rocks, since it was just a sphere with a texture applied to it.

### 3.2 Boulder Modelation

A boulder is a pyramid of rocks. On the top of the pyramid, there is a hive. The boulder is composed by a matrix of rocks objects. On the screenshot, the boulder doesn't have the hive on top of it, instead it has a normal rock.

### Screenshots

![boulder](screenshots/project-t07g3-3_1.png)
![single rock](screenshots/project-t07g3-3_2.png)
![single rock](screenshots/project-t07g3-3_3.png)

## 4. Bee

### 4.1 Bee Model

The Bee model is composed by the following parts:
- Abdomen
- Torax
- Wings
- Head


#### 4.1.1 Abdomen and Torax

The abdomen and torax are composed by two enlongated spheres to form the body of the Bee.

#### 4.1.2 Head

The head is composed by a sphere that is placed on top of the torax and is the base of the antennas and eyes.

#### 4.1.3 Legs and antennaes

The legs and antennaes are composed by cylinders that are placed on the head and torax.

#### 4.1.4 Wings

The wings are composed by like a scaled down enlongated sphere that is placed on the torax.

### 4.2 Animation

The Bee has a simple animation that makes it move forward and rotate. Also it is able to descend and ascend to pick up pollen and transport it to the hive. The bee movement is represented by a parabolic movement.

### Screenshots
![Bee from the side](screenshots/project-t07g3-4_1.png)

![Bee from the top](screenshots/project-t07g3-4_2.png)

![Bee from the bottom](screenshots/project-t07g3-4_3.png)

![Bee](screenshots/project-t07g3-5_1.png)

## 5. Polen and hives

### 5.1 Polen Modelation

The polen is a normal sphere with a texture applied to it. It's also here were ew apply a different scaling to each hemisphere of the sphere, to make it look like an egg. 

### 5.2 Hive Modelation

The hive is composed by:
- Main structure (parallelogram)
- Bottom entrance (difference between two parallelogram)
- Top entrance (difference between two parallelogram)
- Roof (smaller parallelogram on top of the main structure)

### Screenshots

![Bee up](screenshots/project-t07g3-6_1.png)
![Bee picking up pollen](screenshots/project-t07g3-6_2.png)
![Bee transporting pollen](screenshots/project-t07g3-6_3.png)
![Bee delivering pollen](screenshots/project-t07g3-6_4.png)
![After delivering pollen](screenshots/project-t07g3-6_5.png)

## 6. Shaders and animation

### 6.1 Grass

The grass is a stack of trapezoid, with the top being a triangle. We added randomness on the x and z axis to make the grass look more natural. The grass is also animated, so it looks like it is waving.

### 6.2 Waving the Grass

The waving was done with shaders. We used a sin function to make the grass wave. We also have wave random speed and wave stregth so that it looks more natural to each single grass.

### Screenshots

![Grass](screenshots/project-t07g3-7_1.png)
![Grass](screenshots/project-t07g3-7_2.png)

## 7. Additional developments

We choose to make the parabolic movement of the bee when going to a flower and traveling to the hive

![Final Scene](screenshots/project-t07g3-8_1.png)
