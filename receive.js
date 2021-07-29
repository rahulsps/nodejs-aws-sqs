require("dotenv").config();
var AWS = require('aws-sdk');
AWS.config.update({region:process.env.AWSREGION});
var sqs = new AWS.SQS({
  accessKeyId:process.env.AWSACCESSKEYID,
  secretAccessKey:process.env.AWSSECRETKEY,
  apiVersion: '2012-11-05'});

var params = {
  QueueUrl:process.env.QUEUE_URL,
  AttributeNames: ["All"],
  MaxNumberOfMessages: '10'
};

function listen(){
  sqs.receiveMessage(params, function(err, data) {
    if (err){
      console.log(err, err.stack);
    }
    else{
      console.log(data);
    }
  });
}

setInterval(listen,5000);
