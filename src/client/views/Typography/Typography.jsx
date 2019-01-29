import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components

import { PostApi, ip } from '_helpers/Utils';
// import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import GridItem from 'components/Grid/GridItem.jsx';
// import Input from '@material-ui/core/Input';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FilledInput from '@material-ui/core/FilledInput';

// component
import QAForm from 'components/QA/QA.jsx';
// import SelectForm from 'components/QA/SelectForm.jsx';
import Steppers from 'components/QA/Steppers.jsx';
import ListQA from 'components/QA/ListQA.jsx';
import QueryForm from 'components/QA/QueryForm.jsx';

const style = theme => ({
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

class TypographyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEle: '',
      topic: '.',
      entity: '.',
      chatbot: '.',
      onSubmit: false,
      queryFormTextQuestion: '',
      pattern:'',
      template:'',
      arrTop10:[],
    };
    this.data = new Map();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDoneStep = this.handleDoneStep.bind(this);
  }

  handleDelete = data => () => {
    if (data.label === 'React') {
      alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
      return;
    }
    console.log(data);
  };

  handleChange({ chatbot, entity, topic }) {
    // change picker
    console.log(chatbot, entity, topic);
    this.setState({ chatbot, entity, topic });
  }

  handleSubmit({text_question}, callBack) {
    // callBack('wtf');
    
    PostApi(`${ip.server}/aimlquestions/getaimlfromtext`, {
      textquestion:text_question,
    })
      .then(res => {
        // console.log('in post api done step.....');
        console.log(res);
        callBack(res)
        // this.setState({ newEle: res });
      })
      .catch(err => {
        console.log(err);
      });
      
  }

  handleDoneStep({ topic: topicname, chatbot: chatbotname }) {
    // console.log(topic, chatbot);
    this.setState({ topic:topicname, chatbot:chatbotname });
    PostApi(`${ip.server}/aimlquestions/listtop10`, {
      topicname,
      chatbotname,
    })
      .then(res => {
        //console.log('in post api done step.....');
        console.log(res);
        if (Array.isArray(res)) {
          this.setState({ arrTop10: res });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleMatch() {
    this.setState({queryFormTextQuestion:'', pattern:''});
  }

  render() {
    const { classes } = this.props;
    const { topic, entity, chatbot, listEntity, onSubmit, newEle } = this.state;
    // console.log('in Typograpy')
    // console.log(QA);
    return (
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Steppers onDoneStep={this.handleDoneStep} />
        <QueryForm
          text_question={this.state.queryFormTextQuestion}
          onSubmit={this.handleSubmit}
          topic={this.state.topic}
        />
        <Grid item md={12} xs={12}>
          <QAForm
            newEle={newEle}
            topic={topic}
            entity={entity}
            onSubmit={this.handleSubmit}
            chatbot={chatbot}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <ListQA
            newEle={newEle}
            topic={topic}
            entity={entity}
            chatbot={chatbot}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(TypographyPage);
