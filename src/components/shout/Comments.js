import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
      ...theme.spread,

      commentImage: {
            maxWidth: "100%",
            height: 100,
            objectFit: "cover",
            borderRadius: "50%",
            textAlign: "center",
            marginLeft: "35%"
      },
      commentData: {
            marginLeft: 10
      }
});

class Comments extends Component {
      render() {
            const { comments, classes } = this.props;
            return (
                  <Grid container>
                        {comments.map((comment, index) => {
                              const {
                                    body,
                                    createdAt,
                                    userImage,
                                    userName
                              } = comment;
                              return (
                                    <Fragment key={createdAt}>
                                          <Grid item sm={12}>
                                                <Grid container>
                                                      <Grid item sm={3}>
                                                            <img
                                                                  src={
                                                                        userImage
                                                                  }
                                                                  alt="comment"
                                                                  className={
                                                                        classes.commentImage
                                                                  }
                                                            />
                                                      </Grid>
                                                      <Grid item sm={9}>
                                                            <div
                                                                  className={
                                                                        classes.commentData
                                                                  }
                                                            >
                                                                  <Typography
                                                                        variant="h5"
                                                                        component={
                                                                              Link
                                                                        }
                                                                        to={`/users/${userName}`}
                                                                        color="primary"
                                                                  >
                                                                        {
                                                                              userName
                                                                        }
                                                                  </Typography>
                                                                  <Typography
                                                                        variant="body2"
                                                                        color="textSecondary"
                                                                  >
                                                                        {dayjs(
                                                                              createdAt
                                                                        ).format(
                                                                              "h:mm a, MMMM DD YYYY"
                                                                        )}
                                                                  </Typography>

                                                                  <hr
                                                                        className={
                                                                              classes.invisibleSeperator
                                                                        }
                                                                  />

                                                                  <Typography variant="body1">
                                                                        {body}
                                                                  </Typography>
                                                            </div>
                                                      </Grid>
                                                </Grid>
                                          </Grid>
                                          {index !== comments.length - 1 && (
                                                <hr
                                                      className={
                                                            classes.invisibleSeperator
                                                      }
                                                />
                                          )}
                                    </Fragment>
                              );
                        })}
                  </Grid>
            );
      }
}

Comments.propTypes = {
      comments: PropTypes.array.isRequired,
      classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comments);
