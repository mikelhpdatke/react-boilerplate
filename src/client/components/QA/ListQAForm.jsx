import React from 'react';

import { PostApi, ip } from '_helpers/Utils';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class ListQAForm extends React.Component {
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
    // console.log(e.target.id);
    this.setState({ [e.target.id]: e.target.value });
    const { id_topics_q_a, text_question, text_answer } = this.state;
    console.log(id_topics_q_a);
    this.props.onChange({ id_topics_q_a, text_question, text_answer });
  }

  render() {
    const { classes } = this.props;
    const { text_question, text_answer, id_topics_q_a } = this.state;
    return (
      <div>
        <Paper
          style={{
            border: '3px solid black',
            marginBottom: '8px',
            width: '800px',
          }}
        >
          <TextField
            required
            id="text_question"
            label="Q"
            margin="normal"
            variant="outlined"
            value={text_question}
            fullWidth
            multiline
            onChange={this.handleChange}
          />
          <TextField
            required
            id="text_answer"
            label="A"
            margin="normal"
            value={text_answer}
            variant="outlined"
            fullWidth
            onChange={this.handleChange}
            multiline
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ListQAForm);
