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
      Q: '',
      A: '',
      chatbot: '.',
      topic: '.',
      entity: '.',
      newEle: '.',
      QA: [],
    };
    this.data = new Map();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    console.log(e);
    // this.setState({ [e.target.id]: e.target.value });
  }

  handleClick(e) {
    this.setState(
      state => ({
        QA: [
          {
            id_topics_q_a: -1,
            text_question: 'blank',
            text_answer: 'blank',
            topic_name: this.props.topic,
            entity_name: this.props.entity,
          },
          ...state.QA,
        ],
      }),
      () => {
        console.log(this.state.QA);
      }
    );
    // const { Q, A } = this.state;
    // this.props.onSubmit({ textquestion: Q, textanswer: A });
    // this.setState({ A: '', Q: '' });
  }

  componentWillReceiveProps(props) {
    const { chatbot, topic, entity, newEle } = props;
    console.log('??? in QA');
    // console.log(chatbot, topic, entity);
    if (chatbot != '.' && topic != '.' && entity != '.')
      if (
        !(
          chatbot == this.state.chatbot &&
          topic == this.state.topic &&
          entity == this.state.entity &&
          newEle == this.state.newEle
        )
      )
        PostApi(`${ip.server}/textquestions/listquestions`, {
          chatbotname: chatbot,
          topicname: topic,
          entityname: entity,
        })
          .then(res => {
            console.log('in QA PostApi');
            console.log(res);
            if (Array.isArray(res)) {
              this.setState({ QA: res, chatbot, topic, entity, newEle });
              for (let i = 0; i < res.length; i++) {
                this.data.set(res[i].id_topics_q_a, res[i]);
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
  }

  render() {
    const { classes } = this.props;
    const { QA } = this.state;

    return (
      <div>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Question - Answer</h4>
          </CardHeader>
          <CardBody>
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
            {QA.sort((a, b) => a.id_topics_q_a < b.id_topics_q_a).map(val => {
              console.log(val);
              return (
                <InputQA
                  id_topics_q_a={val.id_topics_q_a}
                  text_question={val.text_question}
                  text_answer={val.text_answer}
                  onChange={this.handleChange}
                />
              );
            })}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(QA);
