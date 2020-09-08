"use strict";

const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const resultNumber = process.env.RESULT_NUMBER || 8;
const tableName = process.env.books_table;

const fetchBooks = (number) => {
  const req = {
    TableName: tableName,
    Limit: number,
  };
  return dynamodb.scan(req).promise();
};

module.exports.handler = async (event, context, callback) => {
  const result = await fetchBooks(resultNumber);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(result),
  });
};
