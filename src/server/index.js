require('rootpath')();
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./_helpers/error-handler');
const jwt = require('./_helpers/jwt');

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
app.use(jsonParser);
app.use(urlencodedParser);
app.use(express.static('dist'));
app.use(cors());
app.use(jwt());
app.use('/api/users', require('./users/users.controller'));

app.use(errorHandler);

app.post('/api/users/register', jsonParser, (req, res) => {
  console.log(req.body);
  const { firstName, lastName, username, password } = req.body;
  console.log(firstName, lastName, username, password);
  res.status(200);
  res.send({ status: 'okkkkkkkkkk' });
  res.end();
});

app.get('/api/status', (req, res) => {
  res.send('ok');
});
app.listen(8081, () => console.log('Listening on port 8081!'));
