import React, { Component } from "react";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeleteShout from "./DeleteShout";
import ShoutDialog from "./ShoutDialog";
import LikeButton from "./LikeButton";

/* Material ui */
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";


/* redux */
import { connect } from "react-redux";

const styles = theme => ({
      ...theme.spread,
      card: {
            position: "relative",
            display: "flex",
            marginBottom: 20,
      },
      image: {
            minWidth: 200
      },
      content: {
            padding: 25,
            objectFit: "cover"
      }
});

class Shout extends Component {

      render() {
            dayjs.extend(relativeTime);

            const {
                  classes,
                  shout: {
                        body,
                        createdAt,
                        userName,
                        userImage,
                        shoutId,
                        likeCount,
                        commentCount
                  },
                  user: { authenticated, credentials }
            } = this.props;
            
            

            const deleteButton = authenticated && userName === credentials.handle ? (
                  <DeleteShout shoutId={shoutId}/>
            ) : null;

            return (
                  <Card className={classes.card}>
                        <CardMedia
                              image={userImage}
                              title="Profile image"
                              className={classes.image}
                        />

                        <CardContent className={classes.content}>
                              <Typography
                                    variant="h5"
                                    component={Link}
                                    to={`/users/${userName}`}
                                    color="primary"
                              >
                                    {userName}
                              </Typography>

                              {deleteButton}
                              
                              <Typography variant="body2">
                                    {dayjs(createdAt).fromNow()}
                              </Typography>

                              <Typography variant="body1">
                                    {body}
                              </Typography>
                        
                              <LikeButton shoutId={shoutId}/>
                              <span>{likeCount} Likes</span>

                              <MyButton tip="comments">
                                    <ChatIcon color="primary" />
                              </MyButton>
                              <span>{commentCount} Comments</span>
                              <ShoutDialog shoutId={shoutId} userName={userName}/>
                        </CardContent>
                  </Card>
            );
      }
}
Shout.propTypes = {
      user: PropTypes.object.isRequired,
      shout: PropTypes.object.isRequired,
      classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
      user: state.user
});

export default connect(
      mapStateToProps
)(withStyles(styles)(Shout));
