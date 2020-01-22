const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

exports.handler = (event, context, callback) => {
  const params = {
    TableName: "pure-gym-tracker",
    Limit: 1
  };

  docClient.scan(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else {
      callback(null, data);
    }
  });
};
