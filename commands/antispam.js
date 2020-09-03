const fs = require('fs');
const allowedIds = ['543245463961206789', '138391131561000960', '261137941177303042'] // hardcoded por enquanto

const execute = async (message, client, args) => {
    const author = message.author;
    if (!allowedIds.includes(author.id)) return message.channel.send("Você não possui permissão");

    const str = args[0];
    if (!/\d+\/\d+/g.test(str)) 
        return message.channel.send('Formato inválido! <msg>/<s>');
    const splt = str.split('/');
    msg = parseInt(splt[0]);
    s = parseInt(splt[1]);

    const json = fs.readFileSync(process.cwd() + '/config.json', 'utf8');
    var config = JSON.parse(json);
    config['antispam'] = str;
    const data = JSON.stringify(config);
    fs.writeFileSync(process.cwd() + '/config.json', data);
    return message.channel.send(`Antispam definido para ${msg}msg/${s}s!`);
}

module.exports = {
    name: 'antispam',
    execute
}