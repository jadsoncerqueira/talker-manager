const express = require('express');
const bodyParser = require('body-parser');
const getData = require('../data/index.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const validationId = (req, res, next) => {
  const { id } = req.params;
  if (Number(id) <= 4) {
    next();
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
};

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

app.listen(PORT, () => {
  console.log('Online');
});
