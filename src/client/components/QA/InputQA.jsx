import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class InputQA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_topics_q_a: props.id_topics_q_a,
      text_question: props.text_question,
      text_answer: props.text_answer,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    console.log(e.target.id);
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSend() {
    const { text_answer, text_question } = this.state;
    this.props.onSend({ text_question, text_answer });
  }

  componentWillReceiveProps({ text_question, text_answer, id_topics_q_a }) {
    if (
      text_question != this.state.text_question ||
      text_answer != this.state.text_answer ||
      id_topics_q_a != this.state.id_topics_q_a
    )
      this.setState({ text_answer, text_question, id_topics_q_a });
  }

  render() {
    const { classes } = this.props;
    const { text_question, text_answer } = this.state;
    return (
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={12}>
          <TextField
            required
            id="text_question"
            label="Câu hỏi"
            margin="normal"
            variant="outlined"
            fullWidth
            multiline
            value={text_question}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            multiline
            fullWidth
            id="text_answer"
            label="Câu trả lời"
            margin="normal"
            variant="outlined"
            value={text_answer}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={this.handleSend}>
            Lưu
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(InputQA);
