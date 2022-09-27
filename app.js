require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT,
  NODE_ENV,
  MONGO_URL,
  MONGO_URL_DEV,
} = require('./utils/const');

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

app.use(router);

// подключаем логер ошибок
app.use(errorLogger);

// обрабатываем ошибки celebrate
app.use(errors());

// центральный обработчик ошибок
app.use(centralErrorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`Приложение слушает порт ${PORT}`);
});
