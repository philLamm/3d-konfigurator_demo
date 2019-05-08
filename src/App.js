import React from "react";
import logo from "./assets/fancy-voxel.png";
import poppy from "./assets/poppy.png";
import arrow from "./assets/arrow.png";
import "./App.css";
import Canvas from "./Canvas";
import "./index.css";
import "typeface-roboto";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "typeface-roboto";
import Button from "@material-ui/core/Button";
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
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

function App() {
  return (
    <div className="App">
      <Grid container spacing={24}>
        <Grid container className="header" xs={12}>
          <Grid item xs={4}>
            <Button variant="outlined" color="secondary" onClick={handleMount}>
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
        {/* <Grid item xs={1} />
        <Grid container alignItems="center" justify="center">
          <Grid alignItems="center" item xs={4}>
            <Button variant="outlined" color="secondary">
              <Typography className="ownCreateBtn" color="secondary" variant="h1">
                Create your own Character here!
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <img src={poppy} className="App-logoWolf" alt="logo" />
          </Grid>
        </Grid>

        <Grid item xs={12} /> */}
        <Grid container alignItems="center" justify="center">
          <Grid item xs={1} />
          <Grid item xs={6}>
            {/* <Canvas />
             */}
            <Paper>
              <Grid item xs={12}>
                Header
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={3}>
            <Paper>
              <Grid item xs={12}>
                {/* <Typography
                  className="ownCreateBtn"
                  color="inherit"
                  variant="body"
                >
                  Character Creation
                </Typography> */}
                <p>Character Creation</p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <Divider variant="middle" />
                </p>
              </Grid>
              <Grid container className="character" xs={12}>
                <Grid item xs={4}>
                  <Button variant="outlined" color="secondary">
                    Save Character Files
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="outlined" color="secondary">
                    Save Character Files
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="outlined" color="secondary">
                    Save Character Files
                  </Button>
                </Grid>
              </Grid>
              <Grid container className="sword" xs={12}>
                <Grid item xs={4}>
                  <Button variant="outlined" color="secondary">
                    Save Character Files
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="outlined" color="secondary">
                    Save Character Files
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="outlined" color="secondary">
                    Save Character Files
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <p>
                  <Divider variant="middle" />
                </p>
              </Grid>
              <Grid container className="sword" xs={12}>
                <Grid container className="sword" xs={12}>
                  <Grid item xs={4} />
                  <Grid item xs={4}>
                    <Typography>Slider:</Typography>
                    <Slider min={0} max={4} step={1} />
                  </Grid>
                  <Grid item xs={4} />
                </Grid>
                <Grid item xs={12}>
                  Background on/off
                </Grid>
                <Grid item xs={12}>
                  ------------
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" color="secondary">
                    Save Character Files
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
