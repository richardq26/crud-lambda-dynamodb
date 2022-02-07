const AWS = require("aws-sdk");

module.exports.updateTask = async (event, context) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  event.body = JSON.parse(event.body);
  const params = {
    TableName: "TaskTable",
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: "set #done = :done",
    ExpressionAttributeNames: {
      "#done": "done",
    },
    ExpressionAttributeValues: {
      ":done": event.body.done,
    },
    ReturnValues: "ALL_NEW",
  };

  const result = await dynamodb.update(params).promise();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result.Attributes),
  };
};
