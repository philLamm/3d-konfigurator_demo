import React from "react";
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
import Slider from "@material-ui/lab/Slider";

const handleMount = () => {
  let mountNode = React.findDOMNode();
  let unmount = React.unmountComponentAtNode(mountNode);
  // console.log(unmount); // false
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#282c34",
    minHeight: "100vh"
  },
  interface: {
    minHeight: "60vh"
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
  }
});

function App(props) {
  const { classes } = props;

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
            <Grid item xs={4}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleMount}
              >
                About this Project
              </Button>
            </Grid>
            <Grid item xs={4}>
              <img src={logo} className="App-logo" alt="logo" />
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" color="secondary">
                3D-Model Validator
              </Button>
            </Grid>
          </Grid>
          {/* HEADER END */}
          {/* CONTENT GRID */}
          <Grid container spacing={24}>
            <Grid item xs={1} />
            <Grid item xs={7}>
              <Canvas />
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
                    <img src={monkIcon} className={classes.icons} alt="logo" />
                    <Typography align="center" variant="caption" gutterBottom>
                      MONK
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <img
                      src={farmerIcon}
                      className={classes.icons}
                      alt="logo"
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
                    <img src={fireSword} className={classes.icons} alt="logo" />
                    <Typography align="center" variant="caption" gutterBottom>
                      FIRESWORD
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <img
                      src={orcishSword}
                      className={classes.icons}
                      alt="logo"
                    />
                    <Typography align="center" variant="caption" gutterBottom>
                      ORCISH SWORD
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <img src={holoSword} className={classes.icons} alt="logo" />
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
                <Grid item xs={2} />
                <Grid item xs={8}>
                  <Typography>Slider:</Typography>
                  <Slider min={0} max={4} step={1} />
                </Grid>
                <Grid item xs={2} />
              </Paper>
              {/* UI interface END */}
            </Grid>

            <Grid item xs={1} />
            {/* CONTEND GRID END */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(App);
