const moviesRouter = require('express').Router();

const {
  createMovieCheck,
  deleteMovieCheck,
} = require('../middlewares/validations');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

// возвращает все фильмы
moviesRouter.get('/movies', getMovies);

// создаёт фильм
moviesRouter.post('/movies', createMovieCheck, createMovie);

// удаляет фильм по идентификатору
moviesRouter.delete('/movies/:movieId', deleteMovieCheck, deleteMovie);

module.exports = moviesRouter;
