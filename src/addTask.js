const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

module.exports.addTask = middy(async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { title, description } = event.body;
  const createdAt = new Date().toISOString();
  const id = v4();
  const newTask = { id, title, description, createdAt, done: false };

  await dynamodb
    .put({
      TableName: "TaskTable",
      Item: newTask,
    })
    .promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  };
}).use(jsonBodyParser());

// Si se definiera la funcion al inicion como const = addTask,
// para el middleware se realizaría la exportación así:
// module.exports = {
//   addTask: middy(addTask).use(jsonBodyParser())
// }
