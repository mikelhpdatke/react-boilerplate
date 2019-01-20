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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import TextField from '@material-ui/core/TextField';

const style = (theme) => ({
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
  { Q: 'abc', A: '123' }
]
class TypographyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicHeader: 'select Topic',
      entityHeader: 'select Entity',
    }
  }

  handleDelete = data => () => {
    if (data.label === 'React') {
      alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
      return;
    }
    console.log(data);
  };

  render() {
    const { classes } = this.props;
    const { topicHeader, entityHeader } = this.state;
    return (
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
      >
        <Grid item xs={3}>
          <ExpansionPanel className={classes.typoTopic}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Topics</Typography>
              <Typography className={classes.secondaryHeading}>{topicHeader}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ width: '100%' }}
              >
                {topics.map(val => (
                  <Grid item>
                    <Chip
                      icon={<FaceIcon />}
                      label={val}
                      onClick={() => { this.setState({ topicHeader: val }) }}
                      className={classes.chip}
                      color="secondary"
                      style={{ marginBottom: '5px' }}
                    />
                  </Grid>
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Entities</Typography>
              <Typography className={classes.secondaryHeading}>{entityHeader}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ width: '100%' }}
              >
                {entities.map(val => (
                  <Grid item>
                    <Chip
                      icon={<FaceIcon />}
                      label={val}
                      onClick={() => { this.setState({ entityHeader: val }) }}
                      className={classes.chip}
                      color="primary"
                      style={{ marginBottom: '5px' }}
                    />
                  </Grid>
                ))}
                <Grid item>
                  <Fab color="primary" aria-label="Add" size="small" className={classes.fab}>
                    <AddIcon />
                  </Fab></Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
        <Grid item xs={6}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Q/A</Typography>
              <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
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
                  <Paper style={{border: '3px solid #2c129d', marginBottom:'8px'}}>
                    <TextField
                      required
                      id="pattern-textfield"
                      label='Q'
                      margin="normal"
                      variant="outlined"
                      value={val.Q}
                      fullWidth
                      multiline
                    />
                    <TextField
                      required
                      id="pattern-textfield"
                      label='A'
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
      </Grid >
    );
  }
}

export default withStyles(style)(TypographyPage);
