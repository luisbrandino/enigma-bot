const Discord = require("discord.js");
const axios = require('axios');
const fs = require('fs');

require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

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