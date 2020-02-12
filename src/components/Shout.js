import React, { Component } from "react";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeleteShout from "./DeleteShout";

/* Material ui */
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

/* redux */
import { connect } from "react-redux";
import { likeShout, unlikeShout } from "../redux/actions/dataActions";

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
      checkLikedShout = () => {
            if (this.props.user.likes && this.props.user.likes.find(like => like.shoutId === this.props.shout.shoutId))
             return true;
             else return false;
      };

      likeShout = () => {
            this.props.likeShout(this.props.shout.shoutId);
      };

      unlikeShout = () => {
            this.props.unlikeShout(this.props.shout.shoutId);
      };

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
            
            const likeButton = !authenticated ? (
                  <MyButton tip="like">
                        <Link to="/login">
                              <FavoriteBorder color="primary" />
                        </Link>
                  </MyButton>
            ) : (
                  this.checkLikedShout() ? (
                        <MyButton tip="unlike" onClick={this.unlikeShout}>
                              <FavoriteIcon color="primary" />
                        </MyButton>
                  ) : (
                        <MyButton tip="like" onClick={this.likeShout}>
                              <FavoriteBorder color="primary" />
                        </MyButton>
                  )
            );

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

                              {likeButton}
                              <span>{likeCount} Likes</span>

                              <MyButton tip="comments">
                                    <ChatIcon color="primary" />
                              </MyButton>
                              <span>{commentCount} Comments</span>
                        </CardContent>
                  </Card>
            );
      }
}
Shout.propTypes = {
      likeShout: PropTypes.func.isRequired,
      unlikeShout: PropTypes.func.isRequired,
      user: PropTypes.object.isRequired,
      shout: PropTypes.object.isRequired,
      classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
      user: state.user
});
const mapActionsToProps = {
      likeShout,
      unlikeShout
};
export default connect(
      mapStateToProps,
      mapActionsToProps
)(withStyles(styles)(Shout));
