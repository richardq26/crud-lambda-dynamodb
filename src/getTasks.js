const AWS = require("aws-sdk");

module.exports.getTasks = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "TaskTable",
  };

  const result = await dynamodb.scan(params).promise();
  const tasks = result.Items;

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tasks),
  };
};
