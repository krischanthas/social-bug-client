import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

/* Material ui */
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';


const styles = {
      card: {
            display: 'flex',
            marginBottom: 20,
      },
      image: {
            minWidth: 200
      },
      content: {
            padding: 25,
            objectFit: 'cover'
      }
}

class Shout extends Component {
      render() {
            const { classes, shout : { body, createdAt, userName, userImage, shoutId, likeCount, commentCount} } = this.props;
            return (
                  <Card className={classes.card}>
                        <CardMedia image={userImage} title="Profile image" className={classes.image}/>

                        <CardContent className={classes.content}>
                              <Typography varient="h5" component={Link} to={`/users/${userName}`} color="primary">{userName}</Typography>
                              <Typography varient="body2">{createdAt}</Typography>
                              <Typography varient="body1">{body}</Typography>
                        </CardContent>
                  </Card>
            )
      }
}

export default withStyles(styles)(Shout);
