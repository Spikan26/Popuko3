const Discord = require("discord.js"); //Bibliothèque Javascript de Discord

const fs = require("fs");

const PREFIX = "::";	//Ce qu'il y a au début de la commande, exemple ici : "-:ping"
const PREFIXCOMMAND = "//";
const PREFIX_SOUND = "mak.";

var bot = new Discord.Client(); // C'est pour dire que le bot est comme un utilisateur au serveur (normalement c'est ça, je sais plus, mais c'est obligatoire en gros, cherche pas xD)

var file = "";
var helpmsg = "";

fs.readdir("MP3", function(err, folder) {
 
	for (var i=0; i<folder.length; i++) {
		const wextend = folder[i];		//wextend = with extend (exemple.wav)
		file = wextend.split(".");	//file = [exemple, wav]
		helpmsg += file[0];
		helpmsg += "	";
	}
});


bot.on("ready", function () {
    console.log("Ready")
	bot.user.setActivity(":: + message");
	bot.user.setStatus("online");
})


bot.on("message", async message => {
	
	if (message.author.equals(bot.user)) return;
	
	if (message.content.startsWith(PREFIXCOMMAND)){
		
		var args = message.content.substring(PREFIXCOMMAND.length).split(" ");	
		
		const emojiList = bot.emojis.map(e=>e.toString()).join("#");
		var ListEmoji = emojiList.split("#");			
		var pageTot = Math.floor(ListEmoji.length / 25);
		
		switch (args[0].toLowerCase()) {		//async commands with // prefix	
			
			case "gitout":
				/*if(message.author.id != 178483636671086592 || message.author.id != 242355725852999683){
						message.channel.send("You can't do that !");
						return
					} else {*/
						// Make sure the bot user has permissions to make channels and move members in the guild:
						if (!message.guild.me.hasPermission(['MANAGE_CHANNELS', 'MOVE_MEMBERS'])) return message.reply('Missing the required `Manage Channels` and `Move Members` permissions.');
						 
						// Get the mentioned user/bot and check if they're in a voice channel:
						const member = message.mentions.members.first();
						if (!member) return message.reply('You need to @mention a user/bot to kick from the voice channel.');
						if (!member.voiceChannel) return message.reply('That user/bot isn\'t in a voice channel.');
						 
						// Now we make a temporary voice channel, move the user/bot into the channel, and delete it:
						const guild = message.guild;
						const temp_channel = await message.guild.createChannel(member.id, 'voice', [
						  { id: guild.id,
							deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'], },
						  { id: member.id,
							deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'] }
						]);
						await member.setVoiceChannel(temp_channel);
						 
						await temp_channel.delete();
						message.react('🚪');
						break
						
			case "halp":
				message.channel.send("I wanna be a react menu")
				.then(function (message) {
					message.react('🚪');
					lastmenuid = message.id;
				});
				break
			
			case "list":
				msgembed = "";
				currentpage = 1;
				limit = Math.ceil(ListEmoji.length / 50)
				var authormenu = message.author.id;
				var authornick = message.author.username
				var i = (currentpage - 1) * 50;
				for(var j=0;j<5; j++){
					for(var i;i<(j*10)+10; i++){
						if(ListEmoji[i] != undefined){
							msgembed += ListEmoji[i];
						} else {
							msgembed += "";
						}
					}
					msgembed += "\n";
				}
				message.delete();
				message.channel.send({"embed": {
					"title": "Page "+currentpage+"/"+limit+"			" + authornick,
					"description": "\n" + msgembed,
					"color": 10608183
				}}).then(function (message) {
						message.react('⏪');
						message.react('⏩');
					message.react('❌')
					.then(() => {
						const filter = (reaction, user) => reaction.emoji.name === '⏪' || reaction.emoji.name === '❌' || reaction.emoji.name === '⏩' && user.id === authormenu;
						const collector = message.createReactionCollector(filter);
						collector.on('collect', function(r){
							if(r.count > 1){	
								if (r.emoji.name == '❌'){
									message.delete();
								} else if(r.emoji.name == '⏪') {
									if(currentpage > 1){
										currentpage--;
										msgembed = "";
										var i = (currentpage - 1) * 50;
										for(var j=0;j<5; j++){
											for(var i;i<((currentpage -1) *50)+(j*10)+10; i++){
												if(ListEmoji[i] != undefined){
													msgembed += ListEmoji[i];
												} else {
													msgembed += "";
												}
											}
											msgembed += "\n";
										}
										const newEmbed = new Discord.RichEmbed({
											title: "Page "+currentpage+"/"+limit+"			" + authornick,
											description: "\n" + msgembed,
											"color": 10608183
										});
										
										message.edit(newEmbed)
										message.reactions.get('⏪').remove(authormenu);
									} else {
										message.reactions.get('⏪').remove(authormenu);
									}
								} else if(r.emoji.name == '⏩') {
									if(currentpage < limit){
										currentpage++;
										msgembed = "";
										var i = (currentpage - 1) * 50;
										for(var j=0;j<5; j++){
											for(var i;i<((currentpage -1) *50)+(j*10)+10; i++){
												if(ListEmoji[i] != undefined){
													msgembed += ListEmoji[i];
												} else {
													msgembed += "";
												}
											}
											msgembed += "\n";
										}
										const newEmbed = new Discord.RichEmbed({
											title: "Page "+currentpage+"/"+limit+"			" + authornick,
											description: "\n" + msgembed,
											"color": 10608183
										});
										
										message.edit(newEmbed)
										message.reactions.get('⏩').remove(authormenu);
									} else {
										message.reactions.get('⏩').remove(authormenu);
									}
								}
							}
						})
					})
					
				});
				break
				
		}
	
	
	}
});

bot.on("message", function (message) {
    
    if (message.author.equals(bot.user)) return;
	
	if (message.content.startsWith(PREFIXCOMMAND)){
		var args = message.content.substring(PREFIXCOMMAND.length).split(" ");
		
		const emojiList = bot.emojis.map(e=>e.toString()).join("#");
		var ListEmoji = emojiList.split("#");			
		var pageTot = Math.floor(ListEmoji.length / 25);
		
		switch (args[0].toLowerCase()) {		//commands with // prefix	
			case "help":
				if (!args[1])
				{
					message.channel.send("List of commands : `//random`, `//list`, `//large`, `//gitout`");
					message.channel.send("Normal Usage : `::[name of the emoji]`	(example : `::citron`)")
					return;
				}
				else if (args[1] == "random" || args[1] == "//random")
				{
					message.channel.send("`//random`, post a random emoji")
				}
				else if (args[1] == "list" || args[1] == "//list")
				{
					message.channel.send("`//list [n° of the page]`, Show a list of the emoji")
				}
				else if (args[1] == "large" || args[1] == "//large")
				{
					message.channel.send("`//large [name of the emoji]`, Show a largest version of the emoji")
				}
				break
			case "random":
				randemo = Math.floor((Math.random() * ListEmoji.length));
				message.delete();
				message.reply(ListEmoji[randemo]);
				break
				
			case "servlist":
				if (message.author.id != 178483636671086592){
					message.channel.send("Wrong User");
				} else {
					var guild = bot.guilds;
					console.log(guild);
				}

				
			case "large":
			
				if (!args[1]) {
					message.channel.send("No emoji specified");
					return;
				}
				else
				{
						var namemoji = args[1].split(":");
						if (namemoji[1] == null){
							var large = bot.emojis.find("name", namemoji[0]);
						} else {
							var large = bot.emojis.find("name", namemoji[1]);
						}
					
					if (large != null)
					{
						message.delete();
						if (large.animated == true){
							message.reply("https://cdn.discordapp.com/emojis/" + large.id + ".gif");
						} else {
							message.reply("https://cdn.discordapp.com/emojis/" + large.id + ".png");
						}
					}
					else
					{
						message.channel.send("Emoji not found");
					}
				}
				break
				
				
			/*case "up":
				if(message.author.id != 178483636671086592){
					message.channel.send("You can't do that !");
					return
				} else {
					message.attachments.forEach(a => {
						console.log(a.url);
						download(a.url).pipe(fs.createWriteStream('MP3/'+ a.filename));
					});
				}
				break*/
		}
	}
	
	
	/*
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(PREFIX_SOUND)){
		
		var args = message.content.substring(PREFIX_SOUND.length).split(" ");

		if (args[0] == "help"){
			message.channel.send(helpmsg);
		}
		else if (message.guild.voiceConnection){
			return;
		}
		else {
			split = helpmsg.split("	");
			search = split.find(function(str) {
									return str == args[0];
								});
			if (search != undefined){
				if (message.member.voiceChannel) {
					message.member.voiceChannel.join()
					.then(connection => { // Connection is an instance of VoiceConnection
						message.delete();
						const dispatcher = connection.playFile('MP3/'+args[0]+'.wav');
						dispatcher.on('end', () => message.member.voiceChannel.leave());
					})
				.catch(console.log);
				} else {
					message.reply('You need to join a voice channel first!');
				}
			}
		}
	}
	*/
	

    //Si ne commence pas par le PREFIX, ignore
    if (!message.content.startsWith(PREFIX)) return;

    //sépare les mots de la phrase (ne compte pas le PREFIX)
    var args = message.content.substring(PREFIX.length).split(" ");
	
	var messageBuild = ""
	for(var i=0;i<args.length; i++){
		var emoji = bot.emojis.find("name", args[i]);
		if (emoji != null){
			messageBuild = messageBuild + " " + `${emoji}`;;
		} else {
			messageBuild = messageBuild + " " + args[i];
		}
	}
	if (messageBuild != null) {
		message.delete();
		message.channel.send({"embed": {
					"author": {
						"name": message.author.username,
						"icon_url": message.author.avatarURL
					},
					"description": messageBuild,
					"color": 7135480
				}})
	}
});

//connecte le bon bot.
bot.login(process.env.BOT_TOKEN);
