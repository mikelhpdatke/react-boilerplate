import React from 'react';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
// import { PostApi, ip } from '_helpers/Utils';
import withStyles from '@material-ui/core/styles/withStyles';
// import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import GridItem from 'components/Grid/GridItem.jsx';
// import Fab from '@material-ui/core/Fab';
import InputQA from './InputQA.jsx';

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
      id_topics_q_a: 'abc',
      pattern: props.pattern,
      template: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleChange(e) {
    console.log(e);
    // this.setState({ [e.target.id]: e.target.value });
  }

  handleSend({ text_question: pattern, text_answer: template }) {
    // console.log({pattern, template});
    this.props.onSend({ pattern, template });
  }

  componentWillReceiveProps(props) {
    // console.log(props);
    if (this.state.pattern != props.pattern)
      this.setState({ pattern: props.pattern, template: props.template });
  }

  render() {
    const { classes } = this.props;
    const { pattern, template, id_topics_q_a } = this.state;
    return (
      <div>
        <Card>
          <CardHeader color="danger">
            <h4 className={classes.cardTitleWhite}>Câu hỏi - Câu trả lời</h4>
          </CardHeader>
          <CardBody>
            <InputQA
              id_topics_q_a={id_topics_q_a}
              text_question={pattern}
              text_answer={template}
              onChange={this.handleChange}
              onSend={this.handleSend}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(QA);
