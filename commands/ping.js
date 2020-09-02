// exemplo comando

const execute = async (message, args) => {
    return message.channel.send('Pong!')
}

module.exports = {
    name: 'ping',
    execute
}