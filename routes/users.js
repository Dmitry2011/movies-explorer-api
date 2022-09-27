const usersRouter = require('express').Router();
const {
  updateUserCheck,
} = require('../middlewares/validations');

const {
  updateUser, getCurrentUser,
} = require('../controllers/users');

// возвращает информацию о пользователе
usersRouter.get('/users/me', getCurrentUser);

// обновляет информацию о пользователе
usersRouter.patch('/users/me', updateUserCheck, updateUser);

module.exports = usersRouter;
