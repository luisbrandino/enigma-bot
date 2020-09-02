const execute = async (message, client, args) => {
    const creditMessage = 
`
Bot desenvolvido por:
Mafios#1972 (https://github.com/MateusAquino)
brandino#1300 (https://github.com/luisbrandino)
`;

    return message.channel.send(creditMessage);
}

module.exports = {
    name: 'creditos',
    execute
}