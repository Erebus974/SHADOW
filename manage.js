const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = 'NTkxOTQwMDM4MDA3MzI0Njc0.XRfibA.YpfabJAXWoUrUsqQNGmtYuXaZPU'

var prefix = (".")

bot.on('ready', function() {
    bot.user.setActivity("Management | RDI", { type: "STREAMING", url: "" })
    console.log("Le bot est en ligne.");
});

bot.login(TOKEN)

const logchannel2 = bot.channels.get("571455223181082663"); 
const channellogid = "571455223181082663"

bot.on("messageUpdate", async(oldMessage, newMessage) => {
    // First let's also check that the content has actually changed
    if(oldMessage.content === newMessage.content){
        return;
    }
    if(oldMessage.author.tag === 'RDI - Management#1866' || oldMessage.author.tag === 'Seefox#7180' || oldMessage.author.tag === 'RDI - Système#8657' || oldMessage.author.tag === 'Veldarion | Benjamin Geller#8521'){ 
        return;
    }
    // Log embed
    let logembed = new Discord.RichEmbed()
    .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor("RED")
    .setDescription(":pencil2: Message Edité")
    .addField("Avant", oldMessage.content, true)
    .addField("Après", newMessage.content, true)
    .setTimestamp()
    // Send the embed
    bot.channels.get(channellogid).send(logembed)
})

bot.on("messageDelete", async message => { 
    if(message.author.tag === 'RDI - Management#1866' || message.author.tag === 'Carlos Smith#9704' || message.author.tag === 'RDI - Système#8657' || message.author.tag === 'RDI - Additional#8346' || message.author.tag === 'Veldarion | Benjamin Geller#8521'){ 
        return;
    }
    if(message.channel.name === "📰suggestions"){ 
        return;
    }
    if(message.content.startsWith(prefix)){
        return;
    }
    // Log embed
    let logembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setThumbnail(message.author.avatarURL)
    .setColor("RED")
    .setDescription(":wastebasket: Message Supprimé")
    .addField("Message", message.content, true)
    .addField("Channel", "#" + message.channel.name, true)
    .setTimestamp()
    // Send the embed
    bot.channels.get(channellogid).send(logembed)
})

bot.on("channelCreate", async channel => {
    // Log embed
    let logembed = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription("💬 Channel Créé")
    .addField("Nom du Channel", `${channel}`)
    .setTimestamp()
    // Send the embed
    bot.channels.get(channellogid).send(logembed)
})

bot.on("channelUpdate", async(oldChannel, newChannel) => {
    // First let's also check that the content has actually changed
    if(oldChannel.name === newChannel.name){
        return;
    }
    // Log embed
    let logembed = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(":pencil2: Channel Edité")
    .addField("Avant", oldChannel.name, true)
    .addField("Après", newChannel.name, true)
    .setTimestamp()
    // Send the embed
    bot.channels.get(channellogid).send(logembed)
})

bot.on("channelDelete", async channel => {
    // Log embed
    let logembed = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription("💬 Channel Supprimé")
    .addField("Nom du Channel", `${channel.name}`)
    .setTimestamp()
    // Send the embed
    bot.channels.get(channellogid).send(logembed)
})

bot.on('guildBanRemove',(guild, user) => {
    // Log embed
    let logembed = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription("💬 Utilisateur Dé-Banni")
    .addField("Nom", `${user.username}`)
    .setTimestamp()
    // Send the embed
    bot.channels.get(channellogid).send(logembed)
});

bot.on('guildBanAdd',(guild, user) => {
    // Log embed
    let logembed = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription("💬 Utilisateur Banni")
    .addField("Nom", `${user.username}`)
    .setTimestamp()
    // Send the embed
    bot.channels.get(channellogid).send(logembed)
});

bot.on("guildMemberUpdate", async(oldMember, newMember) => {
    // First let's also check that the content has actually changed
    if(oldMember.displayName === newMember.displayName){
        return;
    }
    // Log embed
    let logembed = new Discord.RichEmbed()
    .setAuthor(oldMember.displayName, oldMember.user.avatarURL)
    .setThumbnail(oldMember.user.avatarURL)
    .setColor("RED")
    .setDescription(":pencil2: Pseudo Edité")
    .addField("Avant", oldMember.nickname, true)
    .addField("Après", newMember.nickname, true)
    .setTimestamp()
    // Send the embed
    bot.channels.get(channellogid).send(logembed)
})

bot.on('message', message => {
    if (message.content === ".reboot"){
        let modRole = message.guild.roles.find("name", "Discord Manager");
        if(!message.member.roles.has(modRole.id)) {
        return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
        }
            bot.destroy()
            bot.login(TOKEN)
            bot.channels.get("567673211169538058").send({embed: {
                title: "🔩 Le BOT a redémarré avec Succès",
                author: {name: 'RDI - Management', icon_url: bot.user.avatarURL},
                color: (0x7289da),
                timestamp: new Date(),
                footer: {text: 'BOT Redémarré par ' + message.author.username, icon_url: message.author.avatarURL},
                }});
            console.log('Reboot effectué')
            message.delete()
    }
})

// DEBUT DU CODE .CLEAR

bot.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count > 99) return message.channel.send("Veuillez indiquer un nombre entre 1 et 99.")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 99.")
        message.channel.bulkDelete(parseInt(count) + 1)
        let logembed = new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(":wastebasket: Message Supprimé")
        .addField("Administrateur", message.member.displayName, true)
        .addField("Channel", message.channel.name, true)
        .addField("Messages Supprimés", count, true)
        .setTimestamp()
    // Send the embed
    bot.channels.get(channellogid).send(logembed)
    };
});

// DEBUT DU CODE SUGGESTIONS

bot.on('message', message => {
    if(message.channel.id === "571447498296786945"){
        let logembed = new Discord.RichEmbed()
        .setColor(0x7289da)
        .setTitle("📍 Suggestions Donnée")
        .setDescription('**Contenu :** ' + message.content)
        .setFooter('Suggestion proposé par ' + message.member.displayName, message.member.user.displayAvatarURL)
        .setTimestamp()
        bot.channels.get("573075824190685185").send(logembed)
            return message.delete()
    }
});

// DEBUT DU CODE CHANNEL-COMMANDES

bot.on('message', message => {
    if(message.channel.id === "571457336456118283") {
        if(!message.content.startsWith(prefix)) {
            if(message.author.tag === 'RDI - Management#1866' || message.author.tag === 'RDI - Système#8657' || message.author.tag === 'RDI - Additional#8346' || message.author.tag === 'Seefox#7180'){ 
                return
            }
            message.delete()
            message.reply('Ce canal est réservé uniquement aux commandes.').then(d_message => { d_message.delete(8000)});
        }
    }
});