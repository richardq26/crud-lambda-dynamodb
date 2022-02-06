const { v4 } = require("uuid");
const AWS = require("aws-sdk");
module.exports.addTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { title, description } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4();
  const newTask = { id, title, description, createdAt };

  await dynamodb
    .put({
      TableName: "TaskTable",
      Item: newTask,
    })
    .promise();

  return {
    statusCode: 200,
    // headers: {
    //   "Access-Control-Allow-Headers": "Content-Type",
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify(newTask),
  };
};
