const { celebrate, Joi } = require('celebrate');
const { UrlRegularExpression } = require('../errors/regularExpression');

const signUpСheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const signInСheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createMovieCheck = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(UrlRegularExpression),
    trailerLink: Joi.string().required().regex(UrlRegularExpression),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(UrlRegularExpression),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieCheck = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

const updateUserCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  signUpСheck,
  signInСheck,
  createMovieCheck,
  deleteMovieCheck,
  updateUserCheck,
};
