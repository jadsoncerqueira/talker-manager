// const { getKeys } = require('../data/keys.js');

const validationAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    // const fi = await getKeys();
    const val1 = token.length === 16;
    if (token && val1) {
      next();
    } else {
      res.status(401).json({ message: token ? 'Token inválido'
        : 'Token não encontrado',
    });
    //   res.status(401).json({ message: 'Token não encontrado' });
    }
};
  
module.exports = validationAuth;
