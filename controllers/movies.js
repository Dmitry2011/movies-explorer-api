const Movie = require('../models/movie');
const NotFound = require('../errors/notFound');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');

// Создание нового фильма
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки фильма.'));
      }
      return next(err);
    });
};

// Получение фильмов
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

// Удаление фильма
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFound('Фильм не найдена.');
    })
    .then((movie) => {
      if (movie.owner.valueOf() !== _id) {
        throw new ForbiddenError('Нельзя удалить чужуй фильм!');
      }
      Movie.findByIdAndRemove(movieId)
        .then((deletedMovie) => res.status(200).send(deletedMovie))
        .catch(next);
    })
    .catch(next);
};
