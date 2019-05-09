import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    height: "40vh"
  },
  slider: {
    padding: "22px 0px"
    // height: "55vh"
  }
};

class ZoomSlider extends React.Component {
  state = {
    value: 3
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Typography id="label" style={{ color: "white" }}>
          Zoom:
        </Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          aria-labelledby="label"
          min={0}
          max={6}
          step={1}
          onChange={this.handleChange}
          vertical
        />
      </div>
    );
  }
}

ZoomSlider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ZoomSlider);
