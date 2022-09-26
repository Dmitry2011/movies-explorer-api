const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFound = require('../errors/notFound');
const {
  signUpСheck,
  signInСheck,
} = require('../middlewares/validations');

router.post('/signup', signUpСheck, createUser);

router.post('/signin', signInСheck, login);

router.use(auth);

router.use('/', usersRouter);
router.use('/', moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
