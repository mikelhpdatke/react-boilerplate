import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
// import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Fab from '@material-ui/core/Fab';
// import NavigationIcon from '@material-ui/icons/Navigation';
// import { PostApi, ip } from '_helpers/Utils';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListQAForm from 'components/QA/ListQAForm.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';

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
    flexBasis: '45%',
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
      newEle: '.',
      arrTop10: props.arrTop10,
    };
    this.data = new Map();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const { arrTop10 } = props;
    if (arrTop10 != this.state.arrTop10) this.setState({ arrTop10 });
  }

  handleSubmit(e) {
    // console.log('in submit');
    // console.log(this.data);
    this.props.onSubmit(this.data);
  }

  // eslint-disable-next-line class-methods-use-this
  handleChange(e) {
    this.data.set(e.id_topics_q_a, e);
    // console.log(this.data);
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
    const { arrTop10 } = this.state;
    // console.log('in listQA render');
    // console.log(arrTop10);
    // console.log(this.props.QA);
    return (
      <div>
        <Card>
          <CardHeader color="danger">
            <h4 className={classes.cardTitleWhite}>
              Câu hỏi - Câu trả lời gần đây nhất
            </h4>
          </CardHeader>
          <CardBody>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              {arrTop10.map(val => (
                <Grid item key={val.id_topics_q_a}>
                  <ListQAForm
                    id_topics_q_a={val.id_topics_q_a}
                    text_question={val.aiml_question}
                    text_answer={val.aiml_answer}
                    onChange={this.handleChange}
                  />
                </Grid>
              ))}
            </Grid>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ListQA);
