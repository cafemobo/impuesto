'use strict';

console.log('Loading function');
const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
    event.Records.forEach((record) => {
        console.log('Received event:', JSON.stringify(event, null, 2));
        //console.log(record.eventID);
        //console.log(record.eventName);
//console.log('DynamoDB Record: %j', record.dynamodb);
    
     if (record.eventName == 'INSERT') {
            var ID = parseInt(record.dynamodb.NewImage.ID.N);
            var prod = JSON.stringify(record.dynamodb.NewImage.producto.S);
            var pre = parseInt(record.dynamodb.NewImage.precio.N);
            var can = parseInt(record.dynamodb.NewImage.cantidad.N);
            var time = JSON.stringify(record.dynamodb.ApproximateCreationDateTime);
            var total1=can*pre;
            var params = {
                TableName: 'impuestos',
                Item: {
                ID: ID,
                total: total1,
                impuesto: total1*0.19, 
                created: time
                 }
                 };
            dynamo.putItem(params, function(err, data)
            {
                if (err) {
                    console.error("Unable to send message. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Results from sending message: ", JSON.stringify(data, null, 2));
                }
            });
        }
    });
    callback(null, `Successfully processed ${event.Records.length} records.`);
};
