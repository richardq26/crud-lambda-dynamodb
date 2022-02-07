const AWS = require("aws-sdk");

module.exports.getTask = async (event, context) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb
    .get({ TableName: "TaskTable", Key: { id: event.pathParameters.id } })
    .promise();
 

  if (!result.Item) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Task not found",
      }),
    };
  }
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result.Item),
  };
};
