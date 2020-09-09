'use strict';

const fs = require('fs'); // Require the fs library to read files

var html; // Set a variable outside of function in order to reuse

// The function that will read content from our html file
const getHtml = () => {
  if (html) return html; // If the content has existed, do not read it again
  // Return a promise
  return new Promise((resolve, reject) => {
    fs.readFile('static/index.html', 'utf8', (err, data) => {
      if (err) reject(err);
      html = data;
      resolve(html);
    });
  });
};

// The main Lambda function
module.exports.handler = async (event, context, callback) => {
  const htmlcontent = await getHtml(); // Get the content

  const response = {
    statusCode: 200,
    headers: { // Set up the header
      'Content-Type': 'text/html; charset=UTF-8',
    },
    body: htmlcontent,
  };
  callback(null, response);
};