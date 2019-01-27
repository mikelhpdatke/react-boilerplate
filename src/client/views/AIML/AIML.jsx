import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// api
import { PostApi, ip } from '_helpers/Utils';

// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
// import Table from 'components/Table/Table.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
// import NavigationIcon from '@material-ui/icons/Navigation';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Input from '@material-ui/core/Input';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  flexContainer: {
    padding: 0,
    margin: 10,
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
    alignItems: 'center',
    textAlign: 'center',
  },
});

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatbot: '.',
      listChatBot: [
        {
          id_chatbot: 1,
          chatbot_name: 'thái bình',
          username: null,
        },
      ],
      listTopic:[{ id_topic: 17, topic_name: 'câu hỏi chung' }],
      topic: '.',
      onSubmit: false,
      statusSubmit: -1,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    PostApi(`${ip.server}/chatbots`, {})
      .then(res => {
        //console.log(res);
        if (Array.isArray(res)) this.setState({ listChatBot: res });
      })
      .catch(err => {
        console.log(err);
      });
    PostApi(`${ip.server}/topics`, {})
      .then(res => {
        if (Array.isArray(res)) this.setState({ listTopic: res });
      })
      .catch(err => {
        console.log(err);
      });
   
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes } = this.props;
    const { statusSubmit, onSubmit } = this.state;
    const successButton = (
      <Button variant="contained" color="primary" className={classes.button}>
        OK
      </Button>
    );
    const errorButton = (
      <Button variant="contained" color="secondary" className={classes.button}>
        Error
      </Button>
    );
    const normalButton = (
      <Button variant="outlined" disabled className={classes.button}>
        Status
      </Button>
    );
    let statusButton;
    if (onSubmit) statusButton = <CircularProgress />;
    else if (statusSubmit === -1) statusButton = normalButton;
    else if (statusSubmit === 0) statusButton = successButton;
    else if (statusSubmit === 1) statusButton = errorButton;
    // console.log(onSubmit);
    // console.log(statusButton==<CircularProgress/>);
    return (
      <GridContainer justify="space-around" alignItems="center">
        <GridItem>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="chatbot-required">ChatBot</InputLabel>
            <Select
              value={this.state.chatbot}
              onChange={this.handleChange}
              name="chatbot"
              inputProps={{
                id: 'chatbot-required',
              }}
              className={classes.selectEmpty}
            >
              {this.state.listChatBot.map(val => (
                <MenuItem value={val.chatbot_name}>{val.chatbot_name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="age-required">Topic</InputLabel>
            <Select
              value={this.state.topic}
              onChange={this.handleChange}
              name="topic"
              inputProps={{
                id: 'topic-required',
              }}
              className={classes.selectEmpty}
            >
              {this.state.listTopic.map(val => (
                <MenuItem value={val.topic_name}>{val.topic_name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Question - Answer</h4>
            </CardHeader>
            <CardBody>
              <TextField
                required
                id="pattern-textfield"
                label="Q.."
                margin="normal"
                variant="outlined"
                fullWidth
                multiline
              />
              <TextField
                required
                multiline
                fullWidth
                id="pattern-textfield"
                label="A.."
                margin="normal"
                variant="outlined"
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
                    className={classes.fab}
                    onClick={() => {
                      this.setState({ onSubmit: true });
                      setTimeout(() => {
                        this.setState({ onSubmit: false, statusSubmit: 0 });
                      }, 2000);
                    }}
                  >
                    Submit
                  </Fab>
                </Grid>
                <Grid item>{statusButton}</Grid>
                <Grid item>
                  <Fab variant="extended" color="primary" aria-label="Add">
                    Clear
                  </Fab>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    color="textSecondary"
                    className={classes.flexContainer}
                  >
                    View all questions-answers
                  </Typography>
                </Grid>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(TableList);
