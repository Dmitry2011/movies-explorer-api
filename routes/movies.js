const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { UrlRegularExpression, RuRegularExpression, EnRegularExpression } = require('../errors/regularExpression');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

// возвращает все фильмы
moviesRouter.get('/movies', getMovies);

// создаёт фильм
moviesRouter.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(UrlRegularExpression),
    trailer: Joi.string().required().regex(UrlRegularExpression),
    nameRU: Joi.string().required().regex(RuRegularExpression),
    nameEN: Joi.string().required().regex(EnRegularExpression),
    thumbnail: Joi.string().required().regex(UrlRegularExpression),
    movieId: Joi.string().required().length(24).hex(),
  }),
}), createMovie);

// удаляет фильм по идентификатору
moviesRouter.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = moviesRouter;
