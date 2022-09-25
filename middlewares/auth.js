const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const AuthorizedError = require('../errors/authorizedError');

const {
  JWT_SECRET_DEV,
} = require('../utils/const');

module.exports = (req, res, next) => {
  // достаём заголовок
  const { authorization } = req.headers;
  // проверяем наличие токена
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorizedError('Необходима авторизация'));
    return;
  }

  // извлекаем токен
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // верифицируем токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    next(new AuthorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
