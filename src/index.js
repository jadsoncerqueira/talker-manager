const express = require('express');
const bodyParser = require('body-parser');
const { getData, setData } = require('../data/index.js');
// const { setKey } = require('../data/keys.js');
const { randomToken } = require('./helpers/index.js');
const {
  validationId,
  validationCredentials,
  validateEmail,
  validationNameCad,
  validationAgeCad,
  validationATalkCad,
  validationRateCad,
  validationWatCad,
  validationAuth,
} = require('../midd/index.js');

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

app.post('/login', validationCredentials, validateEmail, (__request, response) => {
  const token = randomToken();
  // setKey(token);
  response.status(HTTP_OK_STATUS).json({ token });
});

app.post(
  '/talker',
  validationAuth,
  validationNameCad,
  validationAgeCad,
  validationATalkCad,
  validationRateCad,
  validationWatCad,
  async (request, response) => {
    const { body } = request;
    const data = await getData();
    const aux = { id: data.length + 1, ...body };
    await setData(aux);
    response.status(HTTP_OK_STATUS + 1).json(aux);
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
