import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import { PostApi, ip } from '_helpers/Utils';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import GridItem from 'components/Grid/GridItem.jsx';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Chip from '@material-ui/core/Chip';
// import FaceIcon from '@material-ui/icons/Face';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Input from '@material-ui/core/Input';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

// component
import QAForm from 'components/QA/QA.jsx';
import ListQA from 'components/QA/ListQA.jsx';

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
      newEle:'',
      topic: '.',
      entity: '.',
      chatbot: '.',
      listChatBot: [
        {
          id_chatbot: 1,
          chatbot_name: 'thái bình',
          username: null,
        },
      ],
      listTopic: [{ id_topic: 17, topic_name: 'câu hỏi chung' }],
      listEntity: [
        {
          id_entity: 5,
          entity_name: 'quần chúng',
        },
      ],
      onSubmit: false,
    };
    this.data = new Map();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    PostApi(`${ip.server}/chatbots`, {})
      .then(res => {
        // console.log(res);
        if (Array.isArray(res)) this.setState({ listChatBot: res });
      })
      .catch(err => {
        console.log(err);
      });
    PostApi(`${ip.server}/topics`, {})
      .then(res => {
        if (Array.isArray(res)) this.setState({ listTopic: res });
      })
      .catch(err => {
        console.log(err);
      });
    PostApi(`${ip.server}/entities`, {})
      .then(res => {
        if (Array.isArray(res)) this.setState({ listEntity: res });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDelete = data => () => {
    if (data.label === 'React') {
      alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
      return;
    }
    console.log(data);
  };

  handleChange(e) {
    if (e.target.id == 'Q' || e.target.id == 'A')
      this.setState({ [e.target.id]: e.target.value });
    else
      this.setState({ [e.target.name]: e.target.value }, () => {
        const { topic, entity, chatbot } = this.state;
        if (topic != '.' && entity != '.' && chatbot != '.') {
          // console.log(topic, entity, chatbot);
        }
      });
  }

  handleSubmit(obj) {
    if ('id_topics_q_a' in obj) {
      console.log('in Typographyyyyy');
      console.log(obj);
    } else {
      const { textanswer, textquestion } = obj;
      const {
        topic: topicname,
        entity: entityname,
        chatbot: chatbotname,
      } = this.state;
      PostApi(`${ip.server}/textdbtoaimlconverter/addquestions`, {
        textquestion,
        textanswer,
        topicname,
        entityname,
        chatbotname,
      })
        .then(res => {
          console.log('in add Typo.....');
          console.log(res);
          this.setState({newEle:res});
          // window.location.reload();
          /*
          if (Array.isArray(res))
            this.setState(state => ({
              QA: [
                ...state.QA,
                {
                  id_topics_q_a: res,
                  textanswer,
                  textquestion,
                },
              ],
            }));
            */
        })
        .catch(err => {
          console.log(err);
        });
    }
    // console.log(obj);
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
        <GridItem>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="age-required">ChatBot</InputLabel>
            <Select
              value={this.state.chatbot}
              onChange={this.handleChange}
              name="chatbot"
              inputProps={{
                id: 'chatbot-required',
              }}
              className={classes.selectEmpty}
            >
              {this.state.listChatBot.map(val => (
                <MenuItem value={val.chatbot_name}>{val.chatbot_name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="age-required">Topic</InputLabel>
            <Select
              value={this.state.topic}
              onChange={this.handleChange}
              name="topic"
              inputProps={{
                id: 'topic-required',
              }}
              className={classes.selectEmpty}
            >
              {this.state.listTopic.map(val => (
                <MenuItem value={val.topic_name}>{val.topic_name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="entity-required">Entity</InputLabel>
            <Select
              value={entity}
              onChange={this.handleChange}
              name="entity"
              inputProps={{
                id: 'entity-required',
              }}
              className={classes.selectEmpty}
            >
              {listEntity.map(val => (
                <MenuItem value={val.entity_name}>{val.entity_name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </GridItem>
        <Grid item md={12} xs={12}>
          <QAForm onSubmit={this.handleSubmit} />
        </Grid>
        <Grid item md={12} xs={12}>
          <ListQA
            newEle={newEle}
            topic={topic}
            entity={entity}
            chatbot={chatbot}
            onSubmit={this.handleSubmit}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(TypographyPage);
