const UrlRegularExpression = /https?:\/\/(w{3}\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i;

const RuRegularExpression = /[а-яА-ЯЁё]/;

const EnRegularExpression = /^[a-zA-Z]+$/;

module.exports = {
  UrlRegularExpression,
  RuRegularExpression,
  EnRegularExpression,
};
