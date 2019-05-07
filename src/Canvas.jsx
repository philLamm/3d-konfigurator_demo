import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { WebGLDepthBuffer } from "three";

class Canvas extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      meshes: []
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.sceneSetup();
    this.createCustomSceneObjects();
    this.addLights();
    this.createScene();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    this.stopAnimationLoop();
    this.removeCustomSceneObjects();
    this.sceneDestroy();
  }

  sceneSetup = () => {
    this.scene = new THREE.Scene();
    //background
    this.scene.background = new THREE.Color(0x582c34);
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera);
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(1200, 800);
    this.mount.appendChild(this.renderer.domElement);
    //create a group for multiple object rendering
    this.group = new THREE.Object3D(); //create an empty container
  };

  onDocMouseDown(event, mesh) {
    console.log("clicked.");
    const windowArea = event.target.getBoundingClientRect();
    const mouse3D = new THREE.Vector3(
      (event.clientX / this.mount.width) * 2 - 1,
      -(event.clientY / this.mount.height) * 2 + 1,
      0.5
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse3D, this.camera);
    let intersects = raycaster.intersectObjects(mesh);
    if (intersects.length > 0) {
      //   const hexCode = intersects[0].object.material.color.setHex(
      //     Math.random() * 0xffffff
      //   );
      const hexCode2 = intersects[0].object.material.color.setHex(
        Math.random() * 0xffffff
      );
    }
  }

  createCustomSceneObjects = (geometry, material, position) => {
    //cube 1
    // this.geometry = new THREE.BoxGeometry(2, 2, 2);
    // this.material = new THREE.MeshPhongMaterial({
    //   color: 0x156289,
    //   emissive: 0x072534,
    //   side: THREE.DoubleSide,
    //   flatShading: true
    // });

    // this.cube1 = new THREE.Mesh(this.geometry, this.material);
    // this.cube1.position.set(-1, -1.5, 2);
    // this.group.add(this.cube1);

    //load monk
    const monk = new GLTFLoader();

    monk.load("./monkCharacter/scene.gltf", gltf => {
      const root = gltf.scene;
      const { meshes } = this.state;

      gltf.scene.traverse(function(object) {
        if (object.isMesh) {
          //   this.MeshObjects.push(object);
          meshes.push(object);
          //   this.setState({
          //       meshes: meshes;
          //   })
        }
      });

      //resize monk Model
      root.scale.set(100, 100, 100);
      root.position.y = -90;
      //   root.position.x = -90;
      this.group.add(root);
      this.controls.update();
    });

    // const sword = new GLTFLoader();
    // sword.load("./swords/flamesword/scene.gltf", gltf => {
    //   const root = gltf.scene;
    //   root.scale.set(10, 10, 10);

    //   const { meshes } = this.state;

    //   gltf.scene.traverse(function(object) {
    //     if (object.isMesh) {
    //       //   this.MeshObjects.push(object);
    //       meshes.push(object);
    //     }
    //   });

    //   this.group.add(root);

    //   console.log(meshes);

    //   //scenter camera
    //   this.camera.position.z = 175;
    //   root.position.x = 65;
    //   root.position.z = 12;
    //   // update orbit controls
    //   this.controls.update();
    // });

    const sword = new GLTFLoader();
    sword.load("./swords/tyranny/scene.gltf", gltf => {
      const root = gltf.scene;
      root.scale.set(10, 10, 10);

      const { meshes } = this.state;

      gltf.scene.traverse(function(object) {
        if (object.isMesh) {
          //   this.MeshObjects.push(object);
          meshes.push(object);
        }
      });

      this.group.add(root);

      console.log(meshes);

      //scenter camera
      this.camera.position.z = 175;
      root.position.x = 65;
      root.position.z = 12;
      // update orbit controls
      this.controls.update();
    });

    this.camera.rotation.y = 20; // Y first
    this.camera.rotation.x = 10; // X second
    this.camera.rotation.z = 0;
  };

  addCustomObjectGroup = (...object) => {
    this.group.add(...object);
  };

  createScene = () => {
    this.scene.add(this.group);
  };

  addLights = () => {
    this.lights = [];
    this.lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    this.lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    this.lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    this.lights[0].position.set(0, 200, 0);
    this.lights[1].position.set(100, 200, 100);
    this.lights[2].position.set(-100, -200, -100);

    this.scene.add(this.lights[0]);
    this.scene.add(this.lights[1]);
    this.scene.add(this.lights[2]);
  };

  animate = () => {
    this.frameId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  startAnimationLoop = () => !this.frameId && this.animate();

  stopAnimationLoop = () => {
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
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
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    // return <div ref={ref => (this.mount = ref)} />;

    const { meshes } = this.state;

    return (
      <div>
        <div
          onClick={e => this.onDocMouseDown(e, meshes)}
          id="boardCanvas"
          style={{ width: "55vw", height: "15vw" }}
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}

export default Canvas;
