import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import { withToastManager } from 'react-toast-notifications';

import { PostApi, ip } from '_helpers/Utils';
// import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
// import GridItem from 'components/Grid/GridItem.jsx';
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
      pattern: '',
      template: '',
      arrTop10: [],
    };
    this.data = new Map();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDoneStep = this.handleDoneStep.bind(this);
    this.handleMatch = this.handleMatch.bind(this);
    this.handleNotMatch = this.handleNotMatch.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  notiError = () => {
    this.props.toastManager.add(`Something went wrong, pls try again`, {
      appearance: 'error',
      autoDismiss : true,
      autoDismissTimeout: 3000,
    });
  };

  notiSucess = (text) => {
    this.props.toastManager.add(text, {
      appearance: 'success',
      autoDismiss : true,
      autoDismissTimeout: 3000,
    });
  };

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

  handleSubmit({ text_question }, callBack) {
    // callBack('wtf');
    console.log('wtf');
    console.log(text_question);
    this.setState({ queryFormTextQuestion: text_question });
    PostApi(`${ip.server}/aimlquestions/getaimlfromtext`, {
      textquestion: text_question,
    })
      .then(res => {
        console.log('in post api typoHandle Submit.....');
        console.log(res);
        this.setState({ pattern: res }, () => {
          console.log('in pyto pattern set state', res);
        });
        callBack(res);
        // this.setState({ newEle: res });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDoneStep({ topic: topicname, chatbot: chatbotname }) {
    // console.log(topic, chatbot);
    this.setState({ topic: topicname, chatbot: chatbotname });
    PostApi(`${ip.server}/aimlquestions/listtop10`, {
      topicname,
      chatbotname,
    })
      .then(res => {
        // console.log('in post api done step.....');
        console.log(res);
        if (Array.isArray(res)) {
          this.setState({ arrTop10: res });
          this.notiSucess('Load data ok!');
        }
      })
      .catch(err => {
        console.log(err);
        this.notiError();
      });
  }

  handleMatch() {
    this.setState({ queryFormTextQuestion: '', pattern: '', template: '' }, () => {
      this.notiSucess('Câu hỏi đã trùng, nhập câu khác!!');
      
    });
  }

  handleNotMatch() {
    console.log('in typo Not Match');
    this.notiSucess('Câu hỏi không bị trùng. Hãy nhập câu trả lời ở mục Pattern - Template');
  }

  handleSend({ pattern, template }) {
    const { topic: topicname } = this.state;
    PostApi(`${ip.server}/aimlquestions/add`, {
      topicname,
      aimlquestion: pattern,
      aimlanswer: template,
    })
      .then(res => {
        // console.log('in post api done step.....');
        //console.log(res);
        this.notiSucess('Gửi dữ liệu thành công!!!');
        this.setState({ queryFormTextQuestion: '', pattern: '', template: '' });
        // if (Array.isArray(res)) {
        //  this.setState({ arrTop10: res });
        // }
      })
      .catch(err => {
        this.notiError();
        console.log(err);
      });
  }

  render() {
    // const { classes, toastManager  } = this.props;
    // const { topic, entity, chatbot, listEntity, onSubmit, newEle } = this.state;
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
          onMatch={this.handleMatch}
          onNotMatch={this.handleNotMatch}
        />
        <Grid item md={12} xs={12}>
          <QAForm
            pattern={this.state.pattern}
            template={this.state.template}
            onSend={this.handleSend}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <ListQA arrTop10={this.state.arrTop10} />
        </Grid>
      </Grid>
    );
  }
}

export default withToastManager(withStyles(style)(TypographyPage));
