import React, { useState } from "react";
import logo from "./assets/fancy-voxel.png";
import monkIcon from "./assets/ui-Icons/character/monk.png";
import farmerIcon from "./assets/ui-Icons/character/farmer.png";
import octopusIcon from "./assets/ui-Icons/character/octopus.png";
import fireSword from "./assets/ui-Icons/weapon/firesword.png";
import holoSword from "./assets/ui-Icons/weapon/holoSword.png";
import orcishSword from "./assets/ui-Icons/weapon/orcishSword.png";
import poppy from "./assets/poppy.png";
import arrow from "./assets/arrow.png";
import "./App.css";
import Canvas from "./Canvas";
import "typeface-roboto";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ThreeJSXCanvas from "./ThreeJSXCanvas";
import Divider from "@material-ui/core/Divider";
import ZoomSlider from "./ZoomSlider";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const SliderChange = () => {};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#282c34",
    minHeight: "100vh"
  },
  interface: {
    minHeight: "60vh",
    marginLeft: "20px"
  },
  interfaceTypoHead: {
    marginTop: "20px"
  },
  divider: {
    padding: "25px"
  },
  icons: {
    width: "100px",
    height: "80px",
    marginTop: "20px",
    border: "1px solid rgba(245, 0, 87, 0.5)",
    padding: "4px 6px",
    borderRadius: "4px"
  },
  redFont: {
    color: "rgba(245, 0, 87, 1)"
  },
  AnimateBtn: {
    width: "100%"
  },
  slider: {
    marginBottom: "20px"
  }
});

function App(props) {
  const { classes } = props;

  const [animationPlay, setAnimationPlay] = useState(false);
  const [char, setChar] = useState("holoSword");
  const [weapon, setWeapon] = useState("flamesword");
  const [showCanvas, setShowCanvas] = useState(false);
  const [loaded, setLoaded] = useState(true);

  const handleAnimation = () => {
    console.log("clicked.");
    animationPlay ? setAnimationPlay(false) : setAnimationPlay(true);
  };

  const handleCanvasLoader = () => {
    loaded ? setLoaded(false) : setLoaded(true);
    console.log("canvas loaded.");
    showCanvas ? setShowCanvas(false) : setShowCanvas(true);
  };

  const showStatus = () => {
    console.log("current char:" + char);
    console.log("current char:" + weapon);
  };

  const handleReload = () => {
    console.log("canvas reloaded.");
    // setShowCanvas(false);
    // setShowCanvas(true);
    // const canvas = document.getElementById("Canvas");
    // const ctx = canvas.getContext("2d");
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.location.reload()
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* HEADER */}
        <Grid container spacing={24}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {loaded && (
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCanvasLoader}
                >
                  Load Configurator
                </Button>
              </Grid>
            )}
            {!loaded && (
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCanvasLoader}
                >
                  Unload Configurator
                </Button>
              </Grid>
            )}
            <Grid item xs={4}>
              <img src={logo} className="App-logo" alt="logo" />
            </Grid>
            {!loaded && (
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleReload}
                >
                  Reloaded 3D Konfigurator Modelz
                </Button>
              </Grid>
            )}
            {loaded && (
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={showStatus}
                >
                  3D-Model Validator
                </Button>
              </Grid>
            )}
          </Grid>
          {/* HEADER END */}
          {/* CONTENT GRID */}
          {showCanvas && (
            <Grid alignItems="center" container spacing={24}>
              <Grid item xs={1} />
              <Grid item xs={7}>
                <Canvas
                  animationPlay={animationPlay}
                  char={char}
                  weapon={weapon}
                />
              </Grid>
              <Grid item xs={3}>
                {/* UI interface */}
                <Paper className={classes.interface}>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <Typography
                        className={classes.interfaceTypoHead}
                        color="inherit"
                        variant="h6"
                      >
                        Character Creation
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.divider}>
                      <Divider variant="middle" />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center" variant="caption" gutterBottom>
                      PICK A WARRIOR & A WEAPON!
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={24}
                  >
                    <Grid item xs={1} />
                    <Grid item xs={3}>
                      {/* WARRIORS START */}
                      <img
                        src={monkIcon}
                        className={classes.icons}
                        alt="logo"
                        onClick={() => setChar("monkCharacter")}
                      />
                      <Typography align="center" variant="caption" gutterBottom>
                        MONK
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <img
                        src={farmerIcon}
                        className={classes.icons}
                        alt="logo"
                        onClick={() => setChar("farmer")}
                      />
                      <Typography align="center" variant="caption" gutterBottom>
                        FARMER
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <img
                        src={octopusIcon}
                        className={classes.icons}
                        alt="logo"
                        onClick={() => setChar("octopussy")}
                      />
                      <Typography align="center" variant="caption" gutterBottom>
                        OCTOPUSSY
                      </Typography>
                      {/* WARRIORS END */}
                    </Grid>
                    <Grid item xs={1} />
                  </Grid>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={24}
                  >
                    <Grid item xs={1} />
                    <Grid item xs={3}>
                      {/* WEAPON START */}
                      <img
                        src={fireSword}
                        className={classes.icons}
                        alt="logo"
                        onClick={() => setWeapon("flamesword")}
                      />
                      <Typography align="center" variant="caption" gutterBottom>
                        FIRESWORD
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <img
                        src={orcishSword}
                        className={classes.icons}
                        alt="logo"
                        onClick={() => setWeapon("orcish")}
                      />
                      <Typography align="center" variant="caption" gutterBottom>
                        ORCISH SWORD
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <img
                        src={holoSword}
                        className={classes.icons}
                        alt="logo"
                        onClick={() => setWeapon("holoSword")}
                      />
                      <Typography align="center" variant="caption" gutterBottom>
                        LASERSCHNETZLOR
                      </Typography>
                      {/* WEAPON END */}
                    </Grid>
                    <Grid item xs={1} />
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.divider}>
                      <Divider variant="middle" />
                    </div>
                  </Grid>
                  <Grid container>
                    <Grid item xs={2} />
                    <Grid item xs={8}>
                      <Button
                        className={classes.AnimateBtn}
                        variant="outlined"
                        color="secondary"
                        onClick={handleAnimation}
                      >
                        Play Animation
                      </Button>
                    </Grid>
                    <Grid item xs={2} />
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.divider}>
                      <Divider variant="middle" />
                    </div>
                  </Grid>
                  <Grid container>
                    <Grid item xs={2} />
                    <Grid item xs={8}>
                      <br />
                      <br />
                      <Nouislider
                        range={{ min: 0, max: 100 }}
                        start={0}
                        range={{
                          min: 0,
                          max: 100
                        }}
                        connect={[true, false]}
                        tooltips={true}
                        // onChange={this.SliderChange}
                      />
                      <br />
                      <Typography align="center" variant="caption" gutterBottom>
                        ZOOM IN & OUT
                      </Typography>
                      <br />
                    </Grid>
                    <Grid item xs={2} />
                  </Grid>
                </Paper>
                {/* UI interface END */}
              </Grid>
              <Grid item xs={1} />
              {/* CONTEND GRID END */}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(App);
