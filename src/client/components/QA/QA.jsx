import React from 'react';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import { PostApi, ip } from '_helpers/Utils';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import GridItem from 'components/Grid/GridItem.jsx';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Q: '',
      A: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    console.log(e.target.id);
    this.setState({ [e.target.id]: e.target.value });
  }
  handleClick(e){
    const { Q, A} = this.state;
    this.props.onSubmit({textquestion:Q,textanswer:A});
    this.setState({A:'',Q:''});
  }
  render() {
    const { classes } = this.props;
    const { Q, A } = this.state;
    return (
      <div>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Question - Answer</h4>
          </CardHeader>
          <CardBody>
            <TextField
              required
              id="Q"
              label="Q.."
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              value={Q}
              onChange={this.handleChange}
            />
            <TextField
              required
              multiline
              fullWidth
              id="A"
              label="A.."
              margin="normal"
              variant="outlined"
              value={A}
              onChange={this.handleChange}
            />
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item>
                <Fab
                  variant="extended"
                  aria-label="Delete"
                  color="primary"
                  className={classes.fab}
                  onClick={this.handleClick}
                >
                  Add
                </Fab>
              </Grid>
            </Grid>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(QA);
