import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PostApi, ip } from '_helpers/Utils';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogQueryForm from './DialogQueryForm';

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      value: '',
      text_question: '',
      pattern: '',
      topic: '',
      arrDialogs: [],
    };
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ text_question: props.text_question, topic: props.topic });
  }

  handleCloseDialog(value) {
    // console.log('???????');
    this.setState({ value, openDialog: false }, () => {
      console.log(this.state);
      if (value == 'None') {
        // xu ly khong trung
        // this.props.onNotMatch({ text_question });
      } else {
        // xu ly trung
        // this.props.onMatch();
      }
    });
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const callBackSubmit = data => {
      // console.log('in post Query Form before.....');
      // console.log(data);
      // console.log(this.state.topic);
      PostApi(`${ip.server}/aimlquestions/getsimilarpatternindb`, {
        aimlpatternfromtext: data,
        topicname: this.state.topic,
      })
        .then(res => {
          console.log('in post Query Form.....');
          console.log(res);
          if (Array.isArray(res)) {
            this.setState({
              pattern: data,
              arrDialogs: ['None', ...res.map(val => val.aiml_question)],
              openDialog: true,
            });
          }
          // this.setState({ newEle: res });
        })
        .catch(err => {
          console.log(err);
        });
    };
    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={8}>
            <TextField
              required
              multiline
              fullWidth
              id="text_question"
              label="text_question"
              margin="normal"
              variant="outlined"
              value={this.state.text_question}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.props.onSubmit(
                  { text_question: this.state.text_question },
                  callBackSubmit
                );
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <DialogQueryForm
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          pattern={this.state.pattern}
          topic={this.state.topic}
          arrDialogs={this.state.arrDialogs}
        />
      </React.Fragment>
    );
  }
}

export default QueryForm;
