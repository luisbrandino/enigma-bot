const Discord = require("discord.js");
const axios = require('axios');
const fs = require('fs');

require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

// carregando as proxies
function loadProxies() {
    console.log('Carregando proxies...');

    axios.get('https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt')
        .then(res => {
            const proxyList = res.data.split('\n');
            proxyList.shift(); // remove o This List Was Generated by SpeedX
            proxyList.shift(); // remove o primeiro \n
            proxyList.pop(); // remove o ultimo \n 

            const proxies = [];
 
            proxyList.forEach(proxy => {
                const ip = proxy.split(':')[0];
                const port = proxy.split(':')[1];

                proxies.push({ ip, port });
            });

            const data = JSON.stringify(proxies);
 
            fs.writeFile('./proxies.json', data, err => {
                if (err) return console.log(`Erro ao carregar proxies: ${err}`);

                console.log('Proxies carregadas');
            }); 
        });
} 

//loadProxies();
//setInterval(loadProxies, 1000 * 60 * 60 * 24); // 1 dia

// carregando comandos
fs.readdir('./commands', (err, files) => {
    if (err) return console.log(`Erro ao carregar os comandos: ${err}`);

    files.forEach(file => {
        if (!file.endsWith('.js')) return;

        try {
            console.log(`Carregando comando ${file}...`)

            const command = require(`./commands/${file}`);

            client.commands.set(command.name, command);
        } catch (err) {
            console.log(`Erro ao carregar comando ${file}: ${err}`);
        }
    })
});

// carregando eventos
fs.readdir('./events', (err, files) => {
    if (err) return console.log(`Erro ao carregar os eventos: ${err}`);

    files.forEach(file => {
        if (!file.endsWith('.js')) return;

        const eventName = file.replace('.js', '');

        try {
            console.log(`Carregando evento ${eventName}...`)

            client.on(eventName, message => { require(`./events/${file}`)(client, message) });
        } catch (err) {
            console.log(`Erro ao carregar evento ${eventName}: ${err}`);
        }
    });
});


client.login(process.env.token);