import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { connect } from "react-redux";
import { likeShout, unlikeShout } from "../../redux/actions/dataActions";
class LikeButton extends Component {
      checkLikedShout = () => {
            if (
                  this.props.user.likes &&
                  this.props.user.likes.find(
                        like => like.shoutId === this.props.shoutId
                  )
            )
                  return true;
            else return false;
      };

      likeShout = () => {
            this.props.likeShout(this.props.shoutId);
      };

      unlikeShout = () => {
            this.props.unlikeShout(this.props.shoutId);
      };

      render() {
            const { authenticated } = this.props.user;

            const likeButton = !authenticated ? (
                  <Link to="/login">
                        <MyButton tip="like">
                              <FavoriteBorder color="primary" />
                        </MyButton>
                        </Link>
            ) : this.checkLikedShout() ? (
                  <MyButton tip="unlike" onClick={this.unlikeShout}>
                        <FavoriteIcon color="primary" />
                  </MyButton>
            ) : (
                  <MyButton tip="like" onClick={this.likeShout}>
                        <FavoriteBorder color="primary" />
                  </MyButton>
            );

            return likeButton;
      }
}
LikeButton.propTypes = {
      likeShout: PropTypes.func.isRequired,
      unlikeShout: PropTypes.func.isRequired,
      user: PropTypes.object.isRequired,
      shoutId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
      user: state.user
});
const mapActionsToProps = {
      likeShout,
      unlikeShout
};
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
