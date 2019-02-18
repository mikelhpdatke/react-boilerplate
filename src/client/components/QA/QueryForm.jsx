import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
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
      arrdialogs: [],
    };
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    const { text_question, topic } = this.state;
    if (text_question != props.text_question || topic != props.topic)
      this.setState({ text_question: props.text_question, topic: props.topic });
  }

  handleCloseDialog(value) {
    // console.log('???????');
    this.setState({ value, openDialog: false }, () => {
      if (value == undefined) return;
      if (value == 'None') {
        // xu ly khong trung
        console.log('Khong trung');
        this.props.onNotMatch(value);
      } else {
        // xu ly trung
        console.log('Trung');
        this.props.onMatch(value);
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
          // console.log('in post Query Form.....');
          // console.log(res);
          if (Array.isArray(res)) {
            this.setState({
              pattern: data,
              arrdialogs: ['None', ...res.map(val => val.aiml_question)],
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
              label="Nhập câu hỏi"
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
              Gửi
            </Button>
          </Grid>
        </Grid>
        <DialogQueryForm
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          pattern={this.state.pattern}
          topic={this.state.topic}
          arrdialogs={this.state.arrdialogs}
        />
      </React.Fragment>
    );
  }
}

export default QueryForm;
