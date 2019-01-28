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
      entity: '.',
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
    };
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { topic, entity, chatbot } = this.state;
      this.props.onChange({ topic, entity, chatbot });
    });
    // console.log(this.state);
  }

  render() {
    const { classes } = this.props;
    const {
      topic,
      entity,
      chatbot,
      listChatBot,
      listEntity,
      listTopic,
    } = this.state;
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
            >
              {listEntity.map(val => (
                <MenuItem value={val.entity_name}>{val.entity_name}</MenuItem>
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
