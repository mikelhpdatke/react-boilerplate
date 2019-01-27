import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { PostApi, ip } from '_helpers/Utils';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListQAForm from 'components/QA/ListQAForm.jsx';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  typo: {
    position: 'relative',
    width: '100%',
  },
  typoTopic: {
    position: 'relative',
    minWidth: '100%',
  },
  cardHeader: {
    width: '80px',
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '500px',
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ListQA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatbot: '.',
      topic: '.',
      entity: '.',
      QA: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const { chatbot, topic, entity } = props;
    // console.log('???');
    // console.log(chatbot, topic, entity);
    if (chatbot != '.' && topic != '.' && entity != '.')
      if (
        !(
          chatbot == this.props.chatbot &&
          topic == this.props.topic &&
          entity == this.props.entity
        )
      )
        PostApi(`${ip.server}/textdbtoaimlconverter/listquestions`, {
          chatbotname: chatbot,
          topicname: topic,
          entityname: entity,
        })
          .then(res => {
            // console.log('in ListQA PostApi');
            // console.log(res);
            if (Array.isArray(res)) {
              this.setState({ QA: res });
            }
          })
          .catch(err => {
            console.log(err);
          });
  }

  handleSubmit(e) {
    alert('awdasd');
    e.preventDefault();
  }

  // eslint-disable-next-line class-methods-use-this
  handleChange(e) {
    // console.log(e);
    /*
    const { QA } = this.state;
    for (let i = 0; i < QA.length; i++)
      if (QA[i].id_topics_q_a == e.id_topics_q_a) {
        QA[i].id_topics_q_a = e.id_topics_q_a;
        QA[i].text_question = e.text_question;
        QA[i].text_answer = e.text_answer;
        // console.log(QA[i][typeQA]);
        // console.log('??')
        break;
      }
    // console.log(QA);
    this.setState({ QA });
    */
  }

  render() {
    const { classes } = this.props;
    const { QA } = this.state;
    console.log('in listQA');
    console.log(QA);
    // console.log(this.props.QA);
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Q/A</Typography>
            <Typography className={classes.secondaryHeading}>
              <Fab
                size="small"
                color="secondary"
                aria-label="Add"
                className={classes.margin}
                onClick={this.handleSubmit}
              >
                <NavigationIcon />
              </Fab>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              {QA.map(val => (
                <Grid item>
                  <ListQAForm
                    id_topics_q_a={val.id_topics_q_a}
                    text_question={val.text_question}
                    text_answer={val.text_answer}
                    onChange={this.handleChange}
                  />
                </Grid>
              ))}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(ListQA);
