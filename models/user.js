const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const BadRequestError = require('../errors/badRequestError');
const AuthorizedError = require('../errors/authorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new BadRequestError({ message: 'Введен не верный формат почты' });
      }
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findOne(email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    // пользователь не нашёлся — отклоняем промис
    if (!user) {
      throw new AuthorizedError('Неправильные почта или пароль');
    }
    // нашёлся — сравниваем хеши
    return bcrypt.compare(password, user.password).then((matched) => {
      // хеши не совпали — отклоняем промис
      if (!matched) {
        throw new AuthorizedError('Неправильные почта или пароль');
      }
      // аутентификация успешна
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
