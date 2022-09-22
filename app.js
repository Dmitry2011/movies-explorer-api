require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { errors, Joi, celebrate } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const NotFound = require('./errors/notFound');
const ErrorNotRecognized = require('./errors/status');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const {
  PORT,
  NODE_ENV,
  MONGO_URL,
  MONGO_URL_DEV,
} = process.env;

const app = express();

app.use(cors());

// подключились к серверу MongoDB
mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// для собирания JSON-формата
app.use(bodyParser.json());

// для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));

// подключаем логер запросов
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/', usersRouter);
app.use('/', moviesRouter);
app.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

// подключаем логер ошибок
app.use(errorLogger);

// обрабатываем ошибки celebrate
app.use(errors());

// центральный обработчик ошибок
app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(ErrorNotRecognized).send({ message: 'Произошла ошибка' });
  }
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`Приложение слушает порт ${PORT}`);
});
