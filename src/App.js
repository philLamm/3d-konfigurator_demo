import React from "react";
import logo from "./assets/fancy-voxel.png";
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

const handleMount = () => {

  let mountNode = React.findDOMNode();
  let unmount = React.unmountComponentAtNode(mountNode);
  // console.log(unmount); // false
};

function App() {
  return (
    <div className="App">
      <Grid container spacing={24}>
        <Grid container className="header" xs={12}>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              color="secondary"
              onclick={handleMount}
            >
              Load 3D-Model
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
        <Grid item xs={1} />
        <Grid item xs={6}>
          <Paper>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
            dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
            // consetetur sadipscing consetetur sadipscing consetetur
            {/* <Canvas className="canvas" /> */}
            <ThreeJSXCanvas vertices={[[-1, 0, 0], [0, 1, 0], [1, 0, 0], [0, -1, 0], [-1, 0, 0]]} />
           </Paper> 
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <Paper>
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam
          </Paper>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={12}>
          {/* <Paper className="footer">Footer.</Paper> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
