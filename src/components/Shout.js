import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs'

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
// const styles = (theme) => ({
//       ...theme.spread
// })

class Shout extends Component {
      render() {
            dayjs.extend(relativeTime)
            const { classes, shout : { body, createdAt, userName, userImage, shoutId, likeCount, commentCount} } = this.props;
            return (
                  <Card className={classes.card}>
                        <CardMedia image={userImage} title="Profile image" className={classes.image}/>

                        <CardContent className={classes.content}>
                              <Typography variant="h5" component={Link} to={`/users/${userName}`} color="primary">{userName}</Typography>
                              <Typography variant="body2">{dayjs(createdAt).fromNow()}</Typography>
                              <Typography variant="body1">{body}</Typography>
                        </CardContent>
                  </Card>
            )
      }
}

export default withStyles(styles)(Shout);
