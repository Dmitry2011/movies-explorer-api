const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUser, getCurrentUser,
} = require('../controllers/users');

// возвращает информацию о пользователе
usersRouter.get('/users/me', getCurrentUser);

// обновляет информацию о пользователе
usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = usersRouter;
