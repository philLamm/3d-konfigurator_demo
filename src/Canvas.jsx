import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { WebGLDepthBuffer } from "three";
import * as THREEx from "threex.domevents";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const style = {
  height: "68vh"
};

class Canvas extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      meshes: [],
      char: this.props.char,
      weapon: this.props.weapon,
      openTooltip: false
    };
  }

  componentDidMount() {
    this.sceneSetup();
    this.reloadChar();
    // this.addLights();
    requestAnimationFrame(this.animate);
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    this.stopAnimationLoop();
    this.removeCustomSceneObjects();
    this.sceneDestroy();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.char !== this.state.char) {
      // this.setState({char});
      // alert("char prop changed!");
      this.reloadChar();
    }
    if (prevState.weapon !== this.state.weapon) {
      // this.setState({weapon});
      // alert("weapon prop changed!");
      this.reloadWeapon();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.char !== prevState.char) {
      return { char: nextProps.char };
    }
    if (nextProps.weapon !== prevState.weapon) {
      return { weapon: nextProps.weapon };
    } else return null;
  }

  sceneSetup = () => {
    //initialize scene variables
    this.raycaster = new THREE.Raycaster(); // raycaster for event listeners
    this.mouse = new THREE.Vector2(); // a "mouse" object (vector)
    this.scene = new THREE.Scene(); // the scene
    // this.camera = new THREE.PerspectiveCamera(
    //   75,
    //   this.mount.clientWidth / this.mount.clientHeight,
    //   1,
    //   1000
    // );
    let aspect = this.mount.clientWidth / this.mount.clientHeight;
    let D = 8;
    this.camera = new THREE.OrthographicCamera(
      -D * aspect,
      D * aspect,
      D,
      -D,
      1,
      1000
    );

    this.camera.position.z = 15;

    this.controls = new OrbitControls(this.camera); //orbit controls
    this.renderer = new THREE.WebGLRenderer(); // the scene renderer (render the canvas object)
    this.group = new THREE.Object3D(); //for object grouping in a scene

    //Setup the domEvens var, to get acces to the 3D model DOM events from the canvas object
    // this.domEvents = THREEx.DomEvents(this.camera, this.renderer.domElement);
    console.log("DomEvents: " + this.domEvents);

    //set scene variables
    this.scene.background = new THREE.Color(0xff6a6a);
    //set the canvas size to the parents element width & height (for this example the parent grid)
    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    //append canvas to the DOM
    this.mount.appendChild(this.renderer.domElement);
  };

  mouseHandle(event) {
    // this.mouse.x = (event.clientX / this.mount.clientWidth) * 2 - 1;
    // this.mouse.y = -(event.clientY / this.mount.innerHeight) * 2 + 1;
    // this.mouseX = event.clientX - this.mount.clientWidth / 2;
    // this.mouseY = event.clientY - this.mount.clientHeight / 2;
    event.preventDefault();
    // console.log(this.state.meshes);
    const windowArea = event.target.getBoundingClientRect();
    const mouse3D = new THREE.Vector3(
      (event.clientX / this.mount.clientWidth) * 2 - 1,
      -(event.clientY / this.mount.clientHeight) * 2 + 1,
      0.5
      // 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse3D, this.camera);
    let intersects = raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
      // console.log(this.state.meshes);
      console.log("in");
      this.isOpen = true;
      console.log(this.isOpen);
    } else {
      console.log("out");
      this.isOpen = false;
      console.log(this.isOpen);
    }
  }

  // onMouseHover(event) {
  //   // calculate mouse position in normalized device coordinates
  //   // (-1 to +1) for both components

  //   this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  //   this.raycaster.setFromCamera(this.mouse, this.camera);

  //   // calculate objects intersecting the picking ray
  //   var intersects = this.raycaster.intersectObjects(this.scene.children, true);

  //   for (var i = 0; i < intersects.length; i++) {
  //     intersects[i].object.material.color.setHex(Math.random() * 0xffffff);
  //   }
  // }

  onClickHandler(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
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
  }

  reloadChar = () => {
    //delete old 3d objects
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }

    const loadUrl = "./character/" + this.props.char + "/scene.gltf";
    const char = new GLTFLoader();
    char.load(loadUrl, gltf => {
      const root = gltf.scene || gltf.scenes[0];
      const clips = gltf.animations || [];

      root.updateMatrixWorld();
      this.content = root;

      //if animated
      if (clips.length > 0) {
        this.setClips(clips);
      }

      switch (this.props.char) {
        case "farmer": {
          console.log("farmer");
          console.log(this.props.char);
          root.position.x = -3;
          root.position.y = -70.5;
          console.log("farmer end");
        }
        case "octopussy": {
          root.scale.set(1, 1, 1);
          // this.camera.position.z = 800;
        }

        case "monkCharacter": {
          root.scale.set(10, 10, 10);
          this.scene.position.x = -3;
          root.position.y = -7.5;
        }
      }

      // if (this.props.char === "monkCharacter") {
      //   console.log("proptest");
      //   this.scene.position.x = -3;
      //   root.position.y = -7.5;
      //   root.scale.set(10, 10, 10);
      // } else if(this.props.char === "octopussy") {
      //   this.camera.position.z = 800;
      // }

      // root.scale.set(10, 10, 10);
      // const { meshes } = this.state;
      // gltf.scene.traverse(function(object) {
      //   if (object.isMesh) {
      //     //   this.MeshObjects.push(object);
      //     meshes.push(object);
      //   }
      // });

      // root.position.z = 150;
      // this.scene.position.x = -3;
      // root.position.y = -7.5;
      // update orbit controls
      this.controls.update();
      this.scene.add(root);
      // console.log(this.scene.getObjectByName(this.props.char, true))
      this.addLights();
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
    requestAnimationFrame(this.animate);
  };

  setClips(clips) {
    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer.uncacheRoot(this.mixer.getRoot());
      this.mixer = null;
    }

    clips.forEach(clip => {
      if (clip.validate()) clip.optimize();
    });

    this.clips = clips;
    if (!clips.length) return;

    this.mixer = new THREE.AnimationMixer(this.content);
  }

  addCustomObjectGroup = (...object) => {
    this.group.add(...object);
  };

  handleChangeColorMesh = color => {
    console.log("clicked");
    if (this.scene != undefined) {
      let mesh = this.scene.children;
      console.log(mesh);
      //   if (color === "red") {
      //     mesh.material.color.setHex(0xff0000);
      //     this.scene.add(mesh);
      //   } else if (color === "white") {
      //     mesh.material.color.setxHex(0xffffff);
      //     this.scene.add(mesh);
      //   } else {
      //     mesh.material.color.setHex(0x421010);
      //     this.scene.add(mesh);
      //   }
    }
  };
  // handleChangeColorMesh = () => {
  //   //
  // };

  createScene = () => {
    // this.scene.add(this.group);
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
    // this.light = new THREE.DirectionalLight(0xffffff, 1.1);

    // this.light.position.set(10, 20, 15);

    // this.scene.add(this.light);
  };

  animate = time => {
    requestAnimationFrame(this.animate);
    const dt = (time - this.prevTime) / 1000;
    this.controls.update();
    this.mixer && this.mixer.update(dt);

    // console.log(
    //   "24/7 animating... btw dis da char and weapon : " +
    //     this.props.char +
    //     "... + " +
    //     this.props.weapon
    // );

    //animation
    if (this.clips !== undefined) {
      if (this.props.animationPlay) {
        this.clips.forEach(clip => {
          // console.log(clip);
          this.mixer.clipAction(clip).play();
        });
      } else {
        this.clips.forEach(clip => {
          // console.log(clip);
          this.mixer.clipAction(clip).stop();
        });
      }
    }

    //mouse Move event
    // this.raycaster.setFromCamera(this.mouse, this.camera);

    // var intersects = this.raycaster.intersectObjects(this.scene.children);

    // if (intersects.length > 0) {
    //     console.log("intersected.")
    // }

    this.renderer.render(this.scene, this.camera);
    this.prevTime = time;
  };
  // !this.frameId &&
  startAnimationLoop = () => this.animate();

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
    const { char } = this.props;
    return (
      <Tooltip
        html={
          <div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                Pick a color
              </Grid>
              <Grid item xs={12}>
                <br />
              </Grid>
              <Grid item xs={4}>
                {/* <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "red",
                    borderRadius: "25px"
                  }}
                  onClick={this.handleChangeColorMesh("red")}
                /> */}
                <Button
                  onClick={() => {
                    if(this.props.char === "monkCharacter") {
                      let monk = this.scene.getObjectByName("monk").children[0];
                      monk.material.color.setHex(0xff0000);
                    } 
                  }}
                >
                  <img src="./icons/red.png" width="40px" height="40px" alt="my image"/>
                </Button>
              </Grid>
              <Grid item xs={4}>
                {/* <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "green",
                    borderRadius: "25px"
                  }}
                  onClick={this.handleChangeColorMesh("white")}
                /> */}
                <Button
                  onClick={() => {
                    if(this.props.char === "monkCharacter") {
                      let monk = this.scene.getObjectByName("monk").children[0];
                      monk.material.color.setHex(0x07f20b);
                    } 
                  }}
                >
                  <img src="./icons/green.png" width="48px" height="48px" alt="my image"/>
                </Button>
              </Grid>
              <Grid item xs={4}>
                {/* <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "white",
                    borderRadius: "25px"
                  }}
                  onClick={this.handleChangeColorMesh("default")}
                /> */}
                <Button
                  onClick={() => {
                    if(this.props.char === "monkCharacter") {
                      let monk = this.scene.getObjectByName("monk").children[0];
                      monk.material.color.setHex(0xffffff);
                    } 
                  }}
                >
                  <img src="./icons/reset.png" width="48px" height="48px" alt="my image"/>
                </Button>
              </Grid>
            </Grid>
          </div>
        }
        position="bottom"
        // trigger="mousemove"
        interactive
        animation="scale"
        theme="light"
        offset="360"
        distance="-360"
        open={this.isOpen}
      >
        <div
          // onMouseMove={e => this.mouseHandle(e)}
          onMouseMove={e => this.mouseHandle(e)}
          id="boardCanvas"
          style={style}
          char={char}
          ref={mount => {
            this.mount = mount;
          }}
        />
      </Tooltip>
    );
  }
}

export default Canvas;
