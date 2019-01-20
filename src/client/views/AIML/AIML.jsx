import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Table from 'components/Table/Table.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Grid from '@material-ui/core/Grid';

const styles = {
  flexContainer: {
    padding: 0,
    margin: 10,
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
    alignItems: 'center',
    textAlign: 'center',
  },
};

function TableList(props) {
  const { classes } = props;
  return (
    <GridContainer justify="center" alignItems="center">
      <GridItem xs={12} sm={12} md={12}>
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
                  className={classes.fab}
                >
                  Submit
                </Fab>
              </Grid>
              <Grid item>
                <Fab variant="extended" color="secondary" aria-label="Add">
                  Check / Preview
                </Fab>
              </Grid>
              <Grid item>
                <Fab variant="extended" color="primary" aria-label="Add">
                  Clear
                </Fab>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  color="textSecondary"
                  className={classes.flexContainer}
                >
                  View all questions-answers
                </Typography>
              </Grid>
            </Grid>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <Button variant="contained" color="primary" size="large">
          Write
        </Button>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(TableList);
