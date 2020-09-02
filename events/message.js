const { prefix } = require('../config.json');

module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (cmd) cmd.execute(message, args);
}