const mongoose = require('mongoose');
const { UrlRegularExpression, RuRegularExpression, EnRegularExpression } = require('../errors/regularExpression');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return UrlRegularExpression.test(value);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return UrlRegularExpression.test(value);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return UrlRegularExpression.test(value);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return RuRegularExpression.test(value);
      },
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return EnRegularExpression.test(value);
      },
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
