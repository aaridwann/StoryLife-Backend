const amqplib = require('amqplib');
const url = 'amqp://localhost:5672'

const Connection = async (queue: string,) => {
    let connection, channel;
    connection = await amqplib.connect(url)
    channel = await connection.createChannel()
    // channel.assertQueue(queue,{durable:false})
    return { connection, channel }
}
export default Connection