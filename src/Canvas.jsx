import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { WebGLDepthBuffer } from "three";

const style = {
  height: "60vh"
};

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
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.scene = new THREE.Scene();
    //background
    this.scene.background = new THREE.Color(0xffffff);
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.mount.clientWidth / this.mount.clientHeight,
      1,
      1000
    );
    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera);
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);

    this.mount.appendChild(this.renderer.domElement);
    //create a group for multiple object rendering
    this.group = new THREE.Object3D(); //create an empty container
  };

  onDocMouseDown(event) {
    event.preventDefault();
    console.log(this.state.meshes);
    const windowArea = event.target.getBoundingClientRect();
    const mouse3D = new THREE.Vector3(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
      0.5
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse3D, this.camera);
    let intersects = raycaster.intersectObjects(this.scene.children, true);
    // console.log(this.state.meshes);
    if (intersects.length > 0) {
      const hexCode = intersects[0].object.material.color.setHex(
        Math.random() * 0xffffff
      );
    }
  }

  onClickHandler(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    // const mouse3D = new THREE.Vector3(
    //   (event.clientX / this.mount.width) * 2 - 1,
    //   -(event.clientY / this.mount.height) * 2 + 1,
    //   0.5
    // );
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log(this.mouse.x + " --- " + this.mouse.y);
    // update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // calculate objects intersecting the picking ray
    var intersects = this.raycaster.intersectObjects(this.scene.children, true);

    for (var i = 0; i < intersects.length; i++) {
      intersects[i].object.material.color.setHex(Math.random() * 0xffffff);
    }
    // this.renderer.render(this.scene, this.camera);
  }

  createCustomSceneObjects = () => {
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

    // load monk
    // const monk = new GLTFLoader();

    // monk.load("./character/monkCharacter/scene.gltf", gltf => {
    //   const root = gltf.scene;
    //   const { meshes } = this.state;

    //   gltf.scene.traverse(function(object) {
    //     if (object.isMesh) {
    //       //   this.MeshObjects.push(object);
    //       object.name = "myMonk";
    //       meshes.push(object);
    //     }
    //   });

    //   //resize monk Model
    //   // root.scale.set(100, 100, 100);
    //   // this.camera.position.z = 175;
    //   // root.position.y = -90;
    //   //   root.position.x = -90;
    //   this.group.add(root);
    //   this.controls.update();
    // });

    // const farmer = new GLTFLoader();

    // farmer.load("./character/farmer/scene.gltf", gltf => {
    //   const root = gltf.scene;
    //   const { meshes } = this.state;
    //   gltf.scene.traverse(function(object) {
    //     if (object.isMesh) {
    //       //   this.MeshObjects.push(object);
    //       meshes.push(object);
    //       //   this.setState({
    //       //       meshes: meshes;
    //       //   })
    //     }
    //   });

    //   //resize monk Model
    //   root.scale.set(100, 100, 100);
    //   // root.position.y = -90;
    //   // root.position.x = -180;
    //   this.group.add(root);
    //   this.controls.update();
    // });

    // const octopus = new GLTFLoader();

    // octopus.load("./character/octopus/scene.gltf", gltf => {
    //   const root = gltf.scene;
    //   const { meshes } = this.state;
    //   gltf.scene.traverse(function(object) {
    //     if (object.isMesh) {
    //       //   this.MeshObjects.push(object);
    //       meshes.push(object);
    //       //   this.setState({
    //       //       meshes: meshes;
    //       //   })
    //     }
    //   });

    //   //resize monk Model
    //   root.scale.set(1, 1, 1);
    //   // root.position.y = -90;
    //   // root.position.x = -180;
    //   this.camera.position.z = 100;
    //   this.group.add(root);
    //   this.controls.update();
    // });

    // const flameSword = new GLTFLoader();
    // flameSword.load("./swords/flamesword/scene.gltf", gltf => {
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
    //   // root.position.x = 65;
    //   // root.position.z = 12;
    //   // update orbit controls
    //   this.controls.update();
    // });

    // const tyrannySword = new GLTFLoader();
    // tyrannySword.load("./swords/tyranny/scene.gltf", gltf => {
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

    const holosword = new GLTFLoader();
    holosword.load("./swords/holoSword/scene.gltf", gltf => {
      const root = gltf.scene;
      root.scale.set(10, 10, 10);

      const { meshes } = this.state;
      let mixer;
      mixer = new THREE.AnimationMixer(root);
      gltf.animations.forEach(clip => {
        mixer.clipAction(clip).play();
      });

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
      mixer.update(1);
      this.controls.update();
    });

    // let mixer;
    // const holoSword = new GLTFLoader();
    // holoSword.load("./swords/holoSword/scene.gltf", gltf => {
    //   const model = gltf.scene;

    //   mixer = new THREE.AnimationMixer(model);
    //   gltf.animations.forEach(clip => {
    //     mixer.clipAction(clip).play();
    //   });

    //   mixer.update(1);
    //   // root.scale.set(1, 1, 1);
    //   // const { meshes } = this.state;
    // });

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
    // this.geometry.dispose();
    // this.material.dispose();
  };

  sceneDestroy = () => {
    this.mount.removeChild(this.renderer.domElement);
  };

  handleWindowResize = () => {
    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    // return <div ref={ref => (this.mount = ref)} />;

    const { meshes } = this.state;

    return (
      <div
        onClick={e => this.onDocMouseDown(e)}
        id="boardCanvas"
        style={style}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default Canvas;
