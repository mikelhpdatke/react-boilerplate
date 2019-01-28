import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PostApi, ip } from '_helpers/Utils';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class QueryForm extends React.Component {
  render() {
    return (
      <Grid container direction="row" justify="space-evenly" alignItems="center">
        <Grid item xs={8}>
          <TextField
            required
            multiline
            fullWidth
            id="text_answer"
            label="text_answer"
            margin="normal"
            variant="outlined"
            value={'123'}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default QueryForm;