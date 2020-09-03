const fs = require('fs');

const execute = async (message, client, args) => {
    const respostas = JSON.parse(fs.readFileSync(process.cwd() + '/respostas.json'));
    let texto = '';
    for (let r in respostas) {
        let toAdd = ''
        for (let p of respostas[r]) {
            toAdd += ', `' + p + '`';
        }
        texto += '\n' + toAdd.substring(2) + ': ' + r;
    }
    message.channel.send(texto.substring(1));
}

module.exports = {
    name: 'dicas',
    execute
}