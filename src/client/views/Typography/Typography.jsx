import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';

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

const style = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  typo: {
    position: 'relative',
    width: '300px',
  },
  typoTopic: {
    position: 'relative',
    minWidth: '250px',
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
    width: '260px',
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

const topics = ['topic1', 'abc123', '12345'];
const entities = ['entity1', 'abc1235', 'zzzzzzz', 'gg', 'yasuo'];
const QA = [
  { Q: 'abc', A: '123' },
  { Q: 'abc', A: '123' },
  { Q: 'abc', A: '123' },
  { Q: 'abc', A: '123' },
  { Q: 'abc', A: '123' },
  { Q: 'abc', A: '123' },
];
class TypographyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: 'select Topic',
      entity: 'select Entity',
      chatbot: 'select chatbot',
      listChatBot: ['abc', '123'],
      listTopic: ['topc1', 'tp2'],
      listEntity: ['enti1'],
      onSubmit: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleDelete = data => () => {
    if (data.label === 'React') {
      alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
      return;
    }
    console.log(data);
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes } = this.props;
    const {
      topic,
      entity,
      chatbot,
      listChatBot,
      listTopic,
      listEntity,
      onSubmit,
    } = this.state;
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
                <MenuItem value={val}>{val}</MenuItem>
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
                <MenuItem value={val}>{val}</MenuItem>
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
                <MenuItem value={val}>{val}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </GridItem>
        <Grid item md={12} xs={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Question - Answer</h4>
            </CardHeader>
            <CardBody>
              <TextField
                required
                id="pattern-textfield"
                label="Q.."
                margin="normal"
                variant="outlined"
                fullWidth
                multiline
              />
              <TextField
                required
                multiline
                fullWidth
                id="pattern-textfield"
                label="A.."
                margin="normal"
                variant="outlined"
              />
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
                  >
                    Add
                  </Fab>
                </Grid>
              </Grid>
            </CardBody>
          </Card>
        </Grid>
        <Grid item md={12} xs={12}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Q/A</Typography>
              <Typography className={classes.secondaryHeading}>
                I am an expansion panel
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
                    <Paper
                      style={{
                        border: '3px solid #2c129d',
                        marginBottom: '8px',
                      }}
                    >
                      <TextField
                        required
                        id="pattern-textfield"
                        label="Q"
                        margin="normal"
                        variant="outlined"
                        value={val.Q}
                        fullWidth
                        multiline
                      />
                      <TextField
                        required
                        id="pattern-textfield"
                        label="A"
                        margin="normal"
                        value={val.A}
                        variant="outlined"
                        fullWidth
                        multiline
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(TypographyPage);
