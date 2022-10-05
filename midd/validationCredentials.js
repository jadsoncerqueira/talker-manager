const credentials = ['email', 'password'];

let aux = true;

const message = (body) => {
  if (credentials[1] in body && body.password.length < 6) {
    aux = false;
    return 'O "password" deve ter pelo menos 6 caracteres';
  }

  if ((credentials[0] in body)) {
    return 'O campo "password" é obrigatório';
  } 
  
  if ((credentials[1] in body)) {
    return 'O campo "email" é obrigatório';
  }
  return 'email e senha são obrigatórios';
};

const validationCredentials = async (req, res, next) => {
  const { body } = req;
  const validation = credentials.every((el) => el in body);

  const resposta = message(body);

  // validation = resposta !== 'O "password" deve ter pelo menos 6 caracteres';
  
  if (validation && aux) {
    next();
  } else {
    aux = true;
    res.status(404).json({ message: resposta });
  }
};

module.exports = validationCredentials;