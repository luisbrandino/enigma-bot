execute = async (message, client, args) => {
    const tentativa = args.join(' ');
    const fs = require('fs');
    fs.readFile(process.cwd() + '/usados.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      obj = JSON.parse(data ? data : '[]');
      naoUsado = obj.indexOf(tentativa) === -1;
      if (naoUsado) {
        obj.push(tentativa);
        json = JSON.stringify(obj);
        fs.writeFile(process.cwd() + '/usados.json', json, ()=>{});
      }
      message.react(naoUsado ? '😊' : '❌');
    });
}

module.exports = {
  name: 'verificar',
  execute
}
