// exemplo comando

const execute = async (message, client, args) => {
    return message.channel.send('Pong!')
}

module.exports = {
    name: 'ping',
    execute
}