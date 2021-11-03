const emailRegex = /^[a-z]+(_|\.)?[a-z0-9]*@[a-z]+\.[a-z]{2,}$/i;
const alphaNumRegex = /^[a-z0-9]+$/i;
const userNameRegex = /^[a-z0-9_]+$/i;
const validStringRegex = /([^\s])/;

module.exports.isEmail = (emailLike) => {
  return emailLike ? emailRegex.test(emailLike) : false;
};

module.exports.isAlphaNumeric = (alphaNumLike) => {
  return alphaNumLike ? alphaNumRegex.test(alphaNumLike) : false;
};

module.exports.isValidUsername = (usernameLike) => {
  return usernameLike ? userNameRegex.test(usernameLike) : false;
};

module.exports.isNotEmpty = (stringLike) => {
  return validStringRegex.test(stringLike);
};
