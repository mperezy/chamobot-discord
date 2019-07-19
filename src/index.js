const { Client } = require('discord.js');
const client = new Client();
const token = "<your_token_here>";

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const answers1 = ['Me oyen?', 'Me escuchan?', 'Me sienten...', 'Yo sí te escucho, no sé que digan los demás aquí.', 'Soy un bot, sólo digo.'];
const answers2 = ['Claro pues huevón.', 'Caaalla huevón.', 'Sí, soy un bot.', 'Eres gil y morirás gil.'];
const answers3 = ['Qué pasó, humano?', 'Qué pasó, causa!!?', 'Gud vois!!'];
const answers4 = ['Gud vois', 'Ashusual', 'Apli', 'Ripit plis', 'Previus dias', 'Habla con properti', 'Hi frens'];
const answers5 = ['Yo no estoy disponibol.', 'Estoy disponibol.'];

let rocuchoComboValue = '';

const findRocuchoCombo = (msg) => {
    rocuchoComboValue = answers4.find(combo => msg.includes(combo.toLocaleLowerCase()));
    return rocuchoComboValue;
};

client.on('ready', () => {
    client.user.setActivity('A ser un humano, sólo soy un Bot !!');

    client.channels.forEach(channel => {
        if(channel.type === 'text') {
            channel.send("Hola humanos!!\nChamoBot está aquí :metal: :robot: :metal:\nJugarán GTA V o qué? :video_game: :sunglasses:");
        }
    });
});

client.on('message', msg => {
    let someUserMessage = msg.content.toLocaleLowerCase();
    let randomIndex = -1;

    if(msg.author.bot) return; //Just for ignore this bot's messages.

    if(someUserMessage.includes("hola")) {
        msg.channel.send(`Hola ${msg.author.toString()}`);
        return;
    }

    if(someUserMessage.includes('bot funciona')) {
        randomIndex = getRandomInt(0, answers2.length);
        msg.reply(answers2[randomIndex]);
        return;
    }

    if(someUserMessage.includes('oir')) {
        randomIndex = getRandomInt(0, answers1.length);
        msg.channel.send(answers1[randomIndex]);
        return;
    }

    if(someUserMessage.includes('escucha')) {
        randomIndex = getRandomInt(0, answers1.length);
       msg.channel.send(answers1[randomIndex == 1 ? randomIndex + 1 : randomIndex]);
       return;
    }

    if(someUserMessage.includes('oye')) {
        randomIndex = getRandomInt(0, answers1.length);
        msg.channel.send(answers1[randomIndex == 0 ? randomIndex + 1 : randomIndex]);
        return;
    }

    if(someUserMessage.includes(client.user.toString()) || someUserMessage.includes('bot')) {
        randomIndex = getRandomInt(0, answers3.length);
        let random = getRandomInt(0, 1);

        if(random > 0) {
            msg.channel.send(answers3[randomIndex]);
        }
        else {
            msg.channel.send(`${msg.author.toString()}, eres tú?`);
        }
        return;
    }

    if(someUserMessage.includes('disponibol')) {
        randomIndex = getRandomInt(0, answers5.length);
        msg.channel.send(answers5[randomIndex]);
        return;
    }

    if(findRocuchoCombo(someUserMessage) != undefined) {
        let temp = [... answers4];
        temp.splice(temp.indexOf(rocuchoComboValue), 1);
        randomIndex = getRandomInt(0, temp.length - 1);
        msg.channel.send(`${temp[randomIndex]}.`);
        return;
    } else {
        msg.channel.send('Khe?');
        return;
    }
});

client.login(token);