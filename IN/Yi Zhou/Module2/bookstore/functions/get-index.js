'use strict';

// Require the fs library to read files
const fs = require('fs');
// Template library.
const Mustache = require('mustache'); // Template library.
const axios = require('axios');
const aws4 = require('aws4');
const awscred = require('awscred');
const URL = require('url'); // Come from node.js module

// Set a variable outside of function in order to reuse
var html;
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

const fetchBooks = async () => {
  // Use AWS4 to sign the request
  const url = URL.parse(process.env.fetch_books_api);
  const opts = {
    host: url.hostname,
    path: url.pathname,
  };

  // TODO: will be move to a helper function for reusing.
  // // User the awscred library to load credantial keys from the local profile.
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) await new Promise((resolve, reject) => {
    awscred.loadCredentials((err, data) => {
      if (err) reject(err);
      process.env.AWS_ACCESS_KEY_ID = data.accessKeyId;
      process.env.AWS_SECRET_ACCESS_KEY = data.secretAccessKey;
      // This is for the CodePipeline.
      // When we run the code there, a temporary IAM role will be used. So we have to add it as the session token.
      if (data.sessionToken) process.env.AWS_SESSION_TOKEN = data.sessionToken;
      resolve();
    });
  });

  aws4.sign(opts);

  const headers = {
    Host: opts.headers.Host,
    'X-Amz-Date': opts.headers['X-Amz-Date'],
    Authorization: opts.headers.Authorization,
    'X-Amz-Security-Token': opts.headers['X-Amz-Security-Token'],
  };
  // If 'X-Amz-Security-Token' does not exsit, delete it for the local test.
  if (!headers['X-Amz-Security-Token']) delete headers['X-Amz-Security-Token'];

  return axios.get(process.env.fetch_books_api, {
    headers,
  });
};

module.exports.handler = async (event, context, callback) => {
  const htmlcontent = await getHtml();
  const books = await fetchBooks();

  const returnHtml = Mustache.render(htmlcontent, {
    books: books.data.Items,
    searchAPI: process.env.search_books_api,
  });
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
    body: returnHtml,
  };
  callback(null, response);
};

