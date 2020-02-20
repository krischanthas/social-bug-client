import React, { Fragment } from "react";
import noImg from "../images/no-img.png";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
      ...theme.spread,
});

const ShoutSkeleton = props => {
      const { classes } = props;
      const content =  Array.from({ length: 5 }).map( (item, index) =>(
            <Card className={classes.card} key={index}>
                  <CardMedia className={classes.cover} image={noImg}/>
                  <CardContent className={classes.cardContent}>
                        <div className={classes.handle} />
                        <div className={classes.date} />
                        <div className={classes.fullLine} />
                        <div className={classes.fullLine} />
                        <div className={classes.halfLine} />
                  </CardContent>
            </Card>
      ))
      return (
            <Fragment>{content}</Fragment>
      )
};

ShoutSkeleton.propTypes = {
      classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShoutSkeleton)