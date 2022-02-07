const AWS = require("aws-sdk");

module.exports.deleteTask = async (event, context) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb
    .delete({ TableName: "TaskTable", Key: { id: event.pathParameters.id } })
    .promise();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Task deleted",
    }),
  };
};
