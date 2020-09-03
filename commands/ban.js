const fs = require('fs');
const allowedIds = ['543245463961206789', '138391131561000960', '261137941177303042'] // hardcoded por enquanto

const execute = async (message, client, args) => {
    const author = message.author;

    if (!allowedIds.includes(author.id)) return message.channel.send("Você não possui permissão");

    const userToBan = message.mentions.users.first();

    if (!userToBan) return message.channel.send('Utilize: !ban <usuário>');

    const config = JSON.parse(fs.readFileSync(process.cwd() + '/config.json'));
    const bans = config.bans;

    if (bans.includes(userToBan.id)) return message.channel.send('Usuário já está banido');

    bans.push(userToBan.id);

    config.bans = bans;

    const data = JSON.stringify(config);

    fs.writeFileSync(process.cwd() + '/config.json', data);

    return message.channel.send(`Usuário ${userToBan.username} banido com sucesso`);
}

module.exports = {
    name: 'ban',
    execute
}