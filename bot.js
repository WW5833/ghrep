const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});
bot.on("ready", async ()=> {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("Under Development");
});

let time = 5*60*1000;
let stime = 0;
let dr;
var b = true;
setInterval(DCD, 1000);
function DCD() {
    var d = new Date();
    if(stime != 0) {
        console.log((time-d.getTime() - stime)/1000);
        if(d.getTime() - stime >= time/5*4 && b) {
            dr.channel.send("Bot wyłączy się za 1 minute.");
            b = false;
        }
        if(d.getTime() - stime >= time) {
            dr.channel.send("Bot wyłączony.");
            console.log("Wyłączanie.");
            throw new Error("Bot wyłączony.");
        }
    }
}

bot.on("message", async message => {
if(message.author.bot) return;
if(message.channel.type === "dm") return;

let prefix = botconfig.prefix;
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
cmd = cmd.substring(prefix.length,messageArray[0].length).toLowerCase();
let args = messageArray.slice(1);

/*if(cmd != "") {
message.channel.send(cmd +"||"+ prefix.length);
}*/
if(message.content == "brp") {
message.channel.send("brphelp");
}

switch(cmd) {

    case "roll": {
        message.delete();
        return message.channel.send("@"+message.user.username+ " wylosowałeś "+ (Math.floor(Math.random() * 6) + 1));
    }

    case "help": {
        let helpemb = new Discord.RichEmbed()
        .setDescription("Help")
        .setColor("#FF0000")
        .setFooter("Pomoc")
        .addField("brpInfo","Pokazuje info bota.")
        .addField("brproll","Losuje liczbę od 1 do 6")
        .addField("brpcheck","Sprawdza gracza")
        .addField("brpkick","Wyrzuca gracza.")
        .addField("brpban","Banuje gracza")
        .addField("brp","None")
        .addField("brp","None");
        message.delete();
        message.channel.send(helpemb);
        return;
    }

    case "info": {
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot stworzony przez @Gamer#5833 specjalnie na serwer Breach RP.")
        .setColor("#FF0000")
        .setThumbnail(bicon)
        .addField("Imię Bota:", bot.user.username)
        .addField("Wersja:", "1.1.3")
        .setFooter("Bot jest ciągle rozwijany. Bot jest robiony ForFun!!")


        return message.channel.send(botembed);  
    }  

    case "check": {
        if(message.member.hasPermission("ADMINISTRATOR")) {
            if(args.length != 0) {
                let cuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
                let uinfo = new Discord.RichEmbed()
                .setTitle(cuser.user.username)
                .setDescription(cuser.user.tag)
                .setThumbnail(cuser.user.defaultAvatarURL)
                .addField("Banowalny:", cuser.bannable)
                .addField("Kickowalny:", cuser.kickable)
                .addField("Nick:",cuser.displayName)
                .addField("Dołączył:",cuser.joinedAt)
                .addField("Na discord od:",cuser.user.createdAt)
                .addField("ID:", cuser.user.id)
                .addField("Ostatnia wiadomość", cuser.user.lastMessage)
                .addField("Jest botem:", cuser.user.bot);
                message.delete();
                message.channel.send(uinfo);
            } else {
                let emb1 = new Discord.RichEmbed()
                .setTitle("Jak używać brpcheck.")
                .setDescription("brpcheck [user] (np.brpcheck @Gamer#5833)");
                message.channel.send(emb1);
            }
        } else {
            console.log("No permision");
        }
        return;
    }

    case "off": {
        if(message.member.hasPermission("ADMINISTRATOR") || message.author.username == "Gamer#5833") {
            var d = new Date();
            stime = d.getTime();
            message.delete();
            message.channel.send("Bot wyłączy się za 5min!");
            console.log("Bot zostanie wyłączony za 5 min.");
            dr = message;
            return;
        } else {
            message.channel.send("Chciało by się.");
        }
    }

    case "offforce": {
        if(message.author.tag == "Gamer#5833") {
            message.delete();
            message.channel.send("Zmuszanie bota do pójścia spać.");
            throw new Error("Forced to disable bot.");
        } else {
            console.log(message.author.tag);
        }
        return;
    }
    
    case "c": {
        if(message.member.hasPermission("MANAGE_MESSAGES "))
        message.delete();
        message.channel.bulkDelete(args[0])
    }

    case "Kick": {
        let kuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(message.member.permissions.hasPermission(KICK_MEMBERS)) {
            if(kuser.kickable) {
                kuser.kick(args[1]);
            } else {
                message.channel.send(kuser.nickname+" be gone!");
            }
        } else {
            message.channel.send(kuser.nickname+" nie dla psa kickowanie!");
        }
        
        return;
    }

    case "Ban": {
        let buser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(message.member.permissions.hasPermission(BAN_MEMBERS)) {
            if(buser.bannable) {
                buser.ban(args[1]);
            } else {
                message.channel.send(buser.nickname+" be gone forever!");
            }
        } else {
            message.channel.send(message.author.nickname+" nie dla psa banowanie!");
        }
        
        return;
    }

    case "setkez": {
        fs.readFile('BRP/Setup.txt', 'utf8', function(err, contents) {
            let cont = contents;
        });
        let contA = cont.split(";");
        contA[0] = args[0];
        cont = "";
        for(let i = 0; i < args.length; i++) {
            cont += contA[i]+";"
        }
        fs.writeFile('BRP/Setup.txt', cont, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
        return;
    }

    case "914d1": {
        if(message.member.roles.has(message.guild.roles.find("name", "Karta Upoważnienie 1"))) {
            fs.readFile('BRP/914C.txt', 'utf8', function(err, contents) {
                let cont = contents+1;
            });
            fs.writeFile('BRP/914C.txt', cont, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }
        return;
    }

    case "914d2": {
        if(message.member.roles.has(message.guild.roles.find("name", "Karta Upoważnienie 2"))) {
            fs.readFile('BRP/914C.txt', 'utf8', function(err, contents) {
                let cont = contents+1;
            });
            fs.writeFile('BRP/914C.txt', cont, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }
        return;
    }

    case "914d3": {
        if(message.member.roles.has(message.guild.roles.find("name", "Karta Upoważnienie 3"))) {
            fs.readFile('BRP/914C.txt', 'utf8', function(err, contents) {
                let cont = contents+1;
            });
            fs.writeFile('BRP/914C.txt', cont, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }
        return;
    }

    case "914d4": {
        if(message.member.roles.has(message.guild.roles.find("name", "Karta Upoważnienie 4"))) {
            fs.readFile('BRP/914C.txt', 'utf8', function(err, contents) {
                let cont = contents+1;
            });
            fs.writeFile('BRP/914C.txt', cont, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }
        return;
    }

    case "914d5": {
        if(message.member.roles.has("Karta Upoważnienie 5")) {
            fs.readFile('BRP/914C.txt', 'utf8', function(err, contents) {
                let cont = contents+1;
            });
            fs.writeFile('BRP/914C.txt', cont, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        } else {
            message.channel.send("Brak Karty");
        }
        return;
    }
}
});

bot.login(botconfig.token);
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});
bot.on("ready", async ()=> {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("Under Development");
});

let time = 5*60*1000;
let stime = 0;
let dr;
var b = true;
setInterval(DCD, 1000);
function DCD() {
    var d = new Date();
    if(stime != 0) {
        console.log((time-d.getTime() - stime)/1000);
        if(d.getTime() - stime >= time/5*4 && b) {
            dr.channel.send("Bot wyłączy się za 1 minute.");
            b = false;
        }
        if(d.getTime() - stime >= time) {
            dr.channel.send("Bot wyłączony.");
            console.log("Wyłączanie.");
            throw new Error("Bot wyłączony.");
        }
    }
}

bot.on("message", async message => {
if(message.author.bot) return;
if(message.channel.type === "dm") return;

let prefix = botconfig.prefix;
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
cmd = cmd.substring(prefix.length,messageArray[0].length).toLowerCase();
let args = messageArray.slice(1);

/*if(cmd != "") {
message.channel.send(cmd +"||"+ prefix.length);
}*/
if(message.content == "brp") {
message.channel.send("brphelp");
}

switch(cmd) {

    case "roll": {
        message.delete();
        return message.channel.send("@"+message.user.username+ " wylosowałeś "+ (Math.floor(Math.random() * 6) + 1));
    }

    case "help": {
        let helpemb = new Discord.RichEmbed()
        .setDescription("Help")
        .setColor("#FF0000")
        .setFooter("Pomoc")
        .addField("brpInfo","Pokazuje info bota.")
        .addField("brproll","Losuje liczbę od 1 do 6")
        .addField("brpcheck","Sprawdza gracza")
        .addField("brpkick","Wyrzuca gracza.")
        .addField("brpban","Banuje gracza")
        .addField("brp","None")
        .addField("brp","None");
        message.delete();
        message.channel.send(helpemb);
        return;
    }

    case "info": {
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot stworzony przez @Gamer#5833 specjalnie na serwer Breach RP.")
        .setColor("#FF0000")
        .setThumbnail(bicon)
        .addField("Imię Bota:", bot.user.username)
        .addField("Wersja:", "1.1.3")
        .setFooter("Bot jest ciągle rozwijany. Bot jest robiony ForFun!!")


        return message.channel.send(botembed);  
    }  

    case "check": {
        if(message.member.hasPermission("ADMINISTRATOR")) {
            if(args.length != 0) {
                let cuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
                let uinfo = new Discord.RichEmbed()
                .setTitle(cuser.user.username)
                .setDescription(cuser.user.tag)
                .setThumbnail(cuser.user.defaultAvatarURL)
                .addField("Banowalny:", cuser.bannable)
                .addField("Kickowalny:", cuser.kickable)
                .addField("Nick:",cuser.displayName)
                .addField("Dołączył:",cuser.joinedAt)
                .addField("Na discord od:",cuser.user.createdAt)
                .addField("ID:", cuser.user.id)
                .addField("Ostatnia wiadomość", cuser.user.lastMessage)
                .addField("Jest botem:", cuser.user.bot);
                message.delete();
                message.channel.send(uinfo);
            } else {
                let emb1 = new Discord.RichEmbed()
                .setTitle("Jak używać brpcheck.")
                .setDescription("brpcheck [user] (np.brpcheck @Gamer#5833)");
                message.channel.send(emb1);
            }
        } else {
            console.log("No permision");
        }
        return;
    }

    case "off": {
        if(message.member.hasPermission("ADMINISTRATOR") || message.author.username == "Gamer#5833") {
            var d = new Date();
            stime = d.getTime();
            message.delete();
            message.channel.send("Bot wyłączy się za 5min!");
            console.log("Bot zostanie wyłączony za 5 min.");
            dr = message;
            return;
        } else {
            message.channel.send("Chciało by się.");
        }
    }

    case "offforce": {
        if(message.author.tag == "Gamer#5833") {
            message.delete();
            message.channel.send("Zmuszanie bota do pójścia spać.");
            throw new Error("Forced to disable bot.");
        } else {
            console.log(message.author.tag);
        }
        return;
    }
    
    case "c": {
        if(message.member.hasPermission("MANAGE_MESSAGES "))
        message.delete();
        message.channel.bulkDelete(args[0])
    }

    case "Kick": {
        let kuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(message.member.permissions.hasPermission(KICK_MEMBERS)) {
            if(kuser.kickable) {
                kuser.kick(args[1]);
            } else {
                message.channel.send(kuser.nickname+" be gone!");
            }
        } else {
            message.channel.send(kuser.nickname+" nie dla psa kickowanie!");
        }
        
        return;
    }

    case "Ban": {
        let buser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(message.member.permissions.hasPermission(BAN_MEMBERS)) {
            if(buser.bannable) {
                buser.ban(args[1]);
            } else {
                message.channel.send(buser.nickname+" be gone forever!");
            }
        } else {
            message.channel.send(message.author.nickname+" nie dla psa banowanie!");
        }
        
        return;
    }

    case "setkez": {
        fs.readFile('BRP/Setup.txt', 'utf8', function(err, contents) {
            let cont = contents;
        });
        let contA = cont.split(";");
        contA[0] = args[0];
        cont = "";
        for(let i = 0; i < args.length; i++) {
            cont += contA[i]+";"
        }
        fs.writeFile('BRP/Setup.txt', cont, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
        return;
    }

    case "914d1": {
        if(message.member.roles.has(message.guild.roles.find("name", "Karta Upoważnienie 1"))) {
            fs.readFile('BRP/914C.txt', 'utf8', function(err, contents) {
                let cont = contents+1;
            });
            fs.writeFile('BRP/914C.txt', cont, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }
        return;
    }

    case "914d2": {
        if(message.member.roles.has(message.guild.roles.find("name", "Karta Upoważnienie 2"))) {
            fs.readFile('BRP/914C.txt', 'utf8', function(err, contents) {
                let cont = contents+1;
            });
            fs.writeFile('BRP/914C.txt', cont, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }
        return;
    }

    case "914d3": {
        if(message.member.roles.has(message.guild.roles.find("name", "Karta Upoważnienie 3"))) {
            fs.readFile('BRP/914C.txt', 'utf8', function(err, contents) {
                let cont = contents+1;
            });
            fs.writeFile('BRP/914C.txt', cont, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }
        return;
    }

    case "914d4": {
        if(message.member.roles.has(message.guild.roles.find("name", "Karta Upoważnienie 4"))) {
            fs.readFile('BRP/914C.txt', 'utf8', function(err, contents) {
                let cont = contents+1;
            });
            fs.writeFile('BRP/914C.txt', cont, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }
        return;
    }

    case "914d5": {
        if(message.member.roles.has("Karta Upoważnienie 5")) {
            fs.readFile('BRP/914C.txt', 'utf8', function(err, contents) {
                let cont = contents+1;
            });
            fs.writeFile('BRP/914C.txt', cont, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        } else {
            message.channel.send("Brak Karty");
        }
        return;
    }
}
});

bot.login(botconfig.token);
