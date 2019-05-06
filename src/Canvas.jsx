import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { WebGLDepthBuffer } from "three";

class Canvas extends Component {



    componentDidMount() {
        this.sceneSetup();
        this.createCustomSceneObjects();
        this.addLights();
        this.createScene();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        this.stopAnimationLoop();
        this.removeCustomSceneObjects();
        this.sceneDestroy();
    }

    sceneSetup = () => {
        this.scene = new THREE.Scene();
        //background
        this.scene.background = new THREE.Color( 0x582c34 );
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        this.camera.position.z = 5;
        
        this.controls = new OrbitControls(this.camera);
        this.renderer = new THREE.WebGLRenderer();


        this.renderer.setSize( window.innerWidth, window.innerWidth);
        this.mount.appendChild(this.renderer.domElement);
        //create a group for multiple object rendering
        this.group = new THREE.Object3D();//create an empty container
    };


    // frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    //     const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    //     const halfFovY = THREE.Math.degToRad(this.camera.fov * .5);
    //     const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    //     // compute a unit vector that points in the direction the camera is now
    //     // in the xz plane from the center of the box
    //     const direction = (new THREE.Vector3())
    //         .subVectors(this.camera.position, boxCenter)
    //         .multiply(new THREE.Vector3(1, 0, 1))
    //         .normalize();
    
    //     // move the camera to a position distance units way from the center
    //     // in whatever direction the camera was from the center already
    //     this.camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
    
    //     // pick some near and far values for the frustum that
    //     // will contain the box.
    //     // camera.near = boxSize / 100;
    //     // camera.far = boxSize * 100;
    
    //     // camera.updateProjectionMatrix();
    
    //     // point the camera to look at the center of the box
    //     // camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
    // }

    createCustomSceneObjects = (geometry,material,position) => {
        //cube 1
        // this.geometry = new THREE.BoxGeometry(2, 2, 2);
        // this.material = new THREE.MeshPhongMaterial( {
        //     color: 0x156289,
        //     emissive: 0x072534,
        //     side: THREE.DoubleSide,
        //     flatShading: true
        // } );

        // this.cube1 = new THREE.Mesh(this.geometry, this.material);
        // this.cube1.position.set( -1, -1.5, 2 );
        // this.group.add(this.cube1);

        //load monk
        const monk = new GLTFLoader();

        monk.load('./monkCharacter/scene.gltf', (gltf) => {
            const root = gltf.scene;
            //resize monk Model
            root.scale.set(100,100,100)
            root.position.y = -90;
            root.position.x = -90;
            this.group.add(root);

            //scenter camera
            // this.camera.position.z = 425;
            // update orbit controls
            this.controls.update();
        });

        //load sword
        // const sword = new GLTFLoader(); 
        // sword.load('./swords/orcish/scene.gltf', (gltf) => {
        //     const root = gltf.scene;
        //     root.scale.set(10,10,10)
        //     this.group.add(root);

        //     //scenter camera
        //     this.camera.position.z = 225;
        //     // update orbit controls
        //     this.controls.update();
        // });

        const sword = new GLTFLoader(); 
        sword.load('./swords/flamesword/scene.gltf', (gltf) => {
            const root = gltf.scene;
            root.scale.set(10,10,10)
            this.group.add(root);

            //scenter camera
            this.camera.position.z = 225;
            root.position.x = -25;
            root.position.z = 12;
            // update orbit controls
            this.controls.update();
        });

        this.camera.rotation.y = 20;  // Y first
        this.camera.rotation.x = 10;  // X second
        this.camera.rotation.z = 0;

        // const gltfLoader = new GLTFLoader();

        // gltfLoader.load('./sword/scene.gltf', (gltf) => {
        //     const root = gltf.scene;
        //     this.scene.add(root);

        //     //scenter camera
        //     this.camera.position.z = 425;
        //     // update orbit controls
        //     this.controls.update();
        // });
    };

    addCustomObjectGroup = (...object) => {
        this.group.add(...object);
    }

    createScene = () => {
        this.scene.add(this.group);
    }

    addLights = () => {
        this.lights = [];
        this.lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        this.lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        this.lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        this.lights[ 0 ].position.set( 0, 200, 0 );
        this.lights[ 1 ].position.set( 100, 200, 100 );
        this.lights[ 2 ].position.set( - 100, - 200, - 100 );

        this.scene.add( this.lights[ 0 ] );
        this.scene.add( this.lights[ 1 ] );
        this.scene.add( this.lights[ 2 ] );
    }

    animate = () => {
        this.frameId = requestAnimationFrame(this.animate);

        // this.cube.rotation.x += 0.01;
        // this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    };

    startAnimationLoop = () => !this.frameId && this.animate();

    stopAnimationLoop = () => {
        cancelAnimationFrame(this.frameId);
        this.frameId = null
    };

    removeCustomSceneObjects = () => {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        this.geometry.dispose();
        this.material.dispose();
    };

    sceneDestroy = () => {
        this.mount.removeChild(this.renderer.domElement);
    };

    handleWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.render( this.scene, this.camera );
    };

    render() {
        return <div ref={ref => (this.mount = ref)} />;
    }
}

export default Canvas; 
