const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/notFound');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');

const {
  JWT_SECRET_DEV,
} = require('../utils/const');

// создание нового пользователя
module.exports.createUser = (req, res, next) => {
  const {
    email,
  } = req.body;
    // хешируем пароль
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(200).send({
      name: user.name,
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(`Пользователь ${email} уже существует.`));
      } if (err.name === 'ValidationError') {
        return next(new BadRequestError('Введены не корректные данные.'));
      }
      return next(err);
    });
};

// аутентификация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
        {
          expiresIn: '7d',
        },
      );
      return res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.name === 'BadRequest') {
        return next(new BadRequestError('Введены не корректные данные.'));
      }
      return next(err);
    });
};

// возвращаем информацию о текущем пользователе
module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    if (!user) {
      return next(new NotFound('Пользователь не найден.'));
    }
    return res.status(200).send(user);
  }).catch(next);
};

// обновление информации о пользователе
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные пользователя.'));
      } else {
        next(err);
      }
    });
};
