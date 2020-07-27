'use strict';

module.exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: 'My first API. ',
  };
  callback(null, response);
};