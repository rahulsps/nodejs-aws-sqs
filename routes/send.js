require("dotenv").config();
var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.update({region:process.env.AWSREGION});
var sqs = new AWS.SQS({
  accessKeyId:process.env.AWSACCESSKEYID,
  secretAccessKey:process.env.AWSSECRETKEY,
  apiVersion: '2012-11-05'});

router.get('/:name/:age', function(req, res) {
  var params = {
    MessageBody: JSON.stringify({name:req.params.name, age:req.params.age}),
    QueueUrl:process.env.QUEUE_URL
  };
  sqs.sendMessage(params, function(err, data) {
    if (err){
      console.log(err, err.stack);
    }
    else{
      console.log(data);
    }
  });
  res.send('sent '+req.params.name+'/'+req.params.age+' to sqs!');
});

module.exports = router;
