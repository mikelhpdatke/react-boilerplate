import React from 'react';
import Grid from '@material-ui/core/Grid';
import GridItem from 'components/Grid/GridItem.jsx';
import { PostApi, ip } from '_helpers/Utils';
import withStyles from '@material-ui/core/styles/withStyles';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const style = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});
class SelectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatbot: '.',
      topic: '.',
      listChatBot: [{ chatbot_name: 'thái bình' }],
      listTopic: [{ topic_name: 'câu hỏi chung' }],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    PostApi(`${ip.server}/chatbots`, {})
      .then(res => {
        console.log(res);
        if (Array.isArray(res)) this.setState({ listChatBot: res });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(e) {
    const { chatbot, topic } = this.state;
    // console.log(e);
    if (e.target.name == 'chatbot' && chatbot != e.target.value) {
      PostApi(`${ip.server}/topics/getbychatbotname`, {
        chatbotname: e.target.value,
      })
        .then(res => {
          if (Array.isArray(res)) this.setState({ listTopic: res });
        })
        .catch(err => {
          console.log(err);
        });
    }

    this.setState({ [e.target.name]: e.target.value }, () => {
      // console.log(chatbot, topic);
      // console.log(this.state);
      if (chatbot != this.state.chatbot || topic != this.state.topic)
        if (this.state.chatbot != '.' && this.state.topic != '.')
          this.props.onDoneStep({
            topic: this.state.topic,
            chatbot: this.state.chatbot,
          });
    });
    // console.log(this.state);
  }

  render() {
    const { classes } = this.props;
    const { topic, chatbot, listChatBot, listTopic } = this.state;
    return (
      <React.Fragment>
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
            >
              {this.state.listTopic.map(val => (
                <MenuItem value={val.topic_name}>{val.topic_name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </GridItem>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(SelectForm);
