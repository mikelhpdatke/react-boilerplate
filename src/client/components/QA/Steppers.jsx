import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { PostApi, ip } from '_helpers/Utils';

const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Chọn Chatbot', 'Chọn Topic'];
}

class HorizontalLabelPositionBelowStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      listChatBot: [],
      listTopic: [],
      topic: '',
      chatbot: '',
    };
    this.handleDoneStep = this.handleDoneStep.bind(this);
  }

  handleChange = event => {
    // console.log(event.target.name);

    this.setState({ [event.target.name]: event.target.value }, () => {
      if (event.target.name == 'chatbot') {
        PostApi(`${ip.server}/topics/getbychatbotname`, {
          chatbotname: event.target.value,
        })
          .then(res => {
            if (Array.isArray(res)) this.setState({ listTopic: res });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  componentWillMount() {
    PostApi(`${ip.server}/chatbots`, {})
      .then(res => {
        console.log(res);
        if (Array.isArray(res)) this.setState({ listChatBot: res });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDoneStep() {
    const { topic, chatbot } = this.state;
    this.props.onDoneStep({ topic, chatbot });
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, topic, chatbot } = this.state;
    // console.log(activeStep);
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>
                {label}
                <br />
                <FormControl disabled={activeStep != index}>
                  <Select
                    value={index == 0 ? chatbot : topic}
                    onChange={this.handleChange}
                    style={{ minWidth: 100 }}
                    inputProps={{
                      name: index == 0 ? 'chatbot' : 'topic',
                      id: index == 0 ? 'chatbot' : 'topic',
                    }}
                  >
                    {index == 0
                      ? this.state.listChatBot.map(val => (
                          <MenuItem value={val.chatbot_name}>
                            {val.chatbot_name}
                          </MenuItem>
                        ))
                      : this.state.listTopic.map(val => (
                          <MenuItem value={val.topic_name}>
                            {val.topic_name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          {this.state.activeStep === steps.length ? (
            <React.Fragment>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleReset}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleDoneStep}
                >
                  Submit
                </Button>
              </Grid>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Grid item>
                <Button
                  variant="outlined"
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  color="primary"
                  onClick={this.handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </div>
    );
  }
}

HorizontalLabelPositionBelowStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLabelPositionBelowStepper);
