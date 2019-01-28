import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

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
    // this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    console.log(e.target.id);
    this.setState({ [e.target.id]: e.target.value });
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
        <Grid item xs={6}>
          <TextField
            required
            id="text_question"
            label="text_question"
            margin="normal"
            variant="outlined"
            fullWidth
            multiline
            value={text_question}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            multiline
            fullWidth
            id="text_answer"
            label="text_answer"
            margin="normal"
            variant="outlined"
            value={text_answer}
            onChange={this.handleChange}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(InputQA);
