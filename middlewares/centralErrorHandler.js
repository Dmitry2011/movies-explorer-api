const { ErrorNotRecognized } = require('../errors/status');

// центральный обработчик ошибок
module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(ErrorNotRecognized).send({ message: 'Произошла ошибка' });
  }
  next();
};
