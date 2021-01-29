
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: 'us-west-2',
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});
// Create DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2018-11-26' });

const params = {
  RequestItems: {
    books: [
      {
        PutRequest: {
          Item: {
            name: { S: 'Data Wrangling with JavaScript' },
            image: { S: 'https://res.cloudinary.com/orderstaker/image/upload/v1544422702/others/Data-Wrangling-with-JavaScript.jpg' },
            topics: { SS: ['javascript', 'data'] },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            name: { S: 'Amazon Web Services in Action, 2nd Edition' },
            image: { S: 'https://res.cloudinary.com/orderstaker/image/upload/v1544422795/others/Amazon-Web-Services-in-Action-2nd-Edition.jpg' },
            topics: { SS: ['AWS', 'Cloud'] },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            name: { S: 'Scaling Your Node.js Apps' },
            image: { S: 'https://res.cloudinary.com/orderstaker/image/upload/v1544422878/others/Scaling-Your-Node.js-Apps.jpg' },
            topics: { SS: ['javascript', 'node'] },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            name: { S: 'Data Analysis and Visualization Using Python' },
            image: { S: 'https://res.cloudinary.com/orderstaker/image/upload/v1544422943/others/Data-Analysis-and-Visualization-Using-Python.jpg' },
            topics: { SS: ['data', 'python'] },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            name: { S: 'Think Like a Data Scientist' },
            image: { S: 'https://res.cloudinary.com/orderstaker/image/upload/v1544423012/others/Think-Like-a-Data-Scientist.jpg' },
            topics: { SS: ['data'] },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            name: { S: 'PHP, MySQL, JavaScript & HTML5 All-in-One For Dummies' },
            image: { S: 'https://res.cloudinary.com/orderstaker/image/upload/v1544423090/others/PHP-MySQL-JavaScript-HTML5-All-in-One-For-Dummies.jpg' },
            topics: { SS: ['php', 'mysql', 'javascript', 'html'] },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            name: { S: 'Ruby Data Processing' },
            image: { S: 'https://res.cloudinary.com/orderstaker/image/upload/v1544423188/others/1484234731.jpg' },
            topics: { SS: ['ruby', 'data'] },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            name: { S: 'Effective Java, 2nd Edition' },
            image: { S: 'https://res.cloudinary.com/orderstaker/image/upload/v1544423294/others/68554c5efe76419.jpg' },
            topics: { SS: ['java'] },
          },
        },
      },
    ],
  },
};

ddb.batchWriteItem(params, (err, data) => {
  if (err) console.log(err);
  else console.log('success', data);
});

/* Add one item */
// const paramsA = {
//   TableName: 'books',
//   Item: {
//     name: { S: '' },
//     image: { S: '' },
//     themes: { SS: [] },
//   },
// };

// ddb.putItem(paramsA, (err, data) => {
//   if (err) console.log(err);
//   else console.log(data);
// });