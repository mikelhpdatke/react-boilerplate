import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PostApi, ip } from '_helpers/Utils';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogQueryForm from './DialogQueryForm';

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      value:'',
    };
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleCloseDialog(value) {
    // console.log('???????');
    this.setState({ value, openDialog: false }, ()=>{console.log(this.state)});
  }

  render() {
    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={8}>
            <TextField
              required
              multiline
              fullWidth
              id="text_answer"
              label="text_answer"
              margin="normal"
              variant="outlined"
              value="123"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({ openDialog: true });
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <DialogQueryForm
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
        />
      </React.Fragment>
    );
  }
}

export default QueryForm;
