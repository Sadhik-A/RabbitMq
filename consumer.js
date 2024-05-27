var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost:5672", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "hello";

    channel.assertQueue(queue, {
      durable: false,
    });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, function (msg) {
      console.log(" [x] Received %s", msg.content.toString());
      if (msg.content.toString() === "Hello World!") {
        channel.ack(msg);
      }
      added acknowledment setup
    });
  });
});
