'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.books_table;
const resultNumber = process.env.RESULT_NUMBER || 8;

const fetchBookByTopic = (topic, number) => {
  const req = {
    TableName: tableName,
    Limit: number,
    FilterExpression: 'contains(topics, :topic)',
    ExpressionAttributeValues: { ':topic': topic },
  };
  return dynamodb.scan(req).promise();
};

module.exports.handler = async (event, context, callback) => {
  const { topic } = JSON.parse(event.body);
  const books = await fetchBookByTopic(topic, resultNumber);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(books),
  });
};