var moment = require('moment');

var time = moment().valueOf();

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: time
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: time
  };
}

module.exports = {generateMessage, generateLocationMessage};
