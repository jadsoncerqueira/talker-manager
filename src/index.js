const express = require('express');
const bodyParser = require('body-parser');
const getData = require('../data/index.js');
const { randomToken } = require('./helpers/index.js');
const { validationId, validationCredentials, validateEmail } = require('../midd/index.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (request, response) => {
  const res = await getData();
  response.status(HTTP_OK_STATUS).json(res);
});

app.get('/talker/:id', validationId, async (request, response) => {
  const { id } = request.params;
  const res = await getData();
  const find = res.find((el) => el.id === Number(id));
  response.status(HTTP_OK_STATUS).json(find);
});

app.post('/login', validationCredentials, validateEmail, async (request, response) => {
  const token = randomToken();
  response.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
