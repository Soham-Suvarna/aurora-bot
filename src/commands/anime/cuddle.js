/** 
 * @author ZYROUGE
 * @license GPL-3.0
*/

const { Command, Utils } = global.Aurora;
const axios = require("axios");

class _Command extends Command {
    constructor (client) {
        super(client, {
            name: "cuddle",
            description: "Cuddle your loved ones!",
            usage: "<user|name>",
            guildOnly: false,
            aliases: [],
            permission: {
                bot: ["embedLinks"],
                user: []
            },
            enabled: true
        });
    }

    async run(message, args, { GuildDB, prefix, language, translator, responder, rawArgs }) {
        try {
            const eEmbed = this.client.embeds.error(null, {
                description: translator.translate("COULDNT_FETCH_IMAGE")
            });
            const { data } = await axios.get(`https://nekos.life/api/v2/img/cuddle`).catch(e => {
                return responder.send({ embed: eEmbed });
            });
            if(!data || !data.url) return responder.send({ embed: eEmbed });
            let embed = this.client.embeds.embed();
            embed.description = translator.translate("CUDDLE_MSG", message.author.mention, (args.join(" ") || "Air"));
            embed.image = {
                url: data.url
            };
            embed.color = Utils.colors.pink;
            responder.send({ embed });
        } catch(e) {
            responder.send({
                embed: this.client.embeds.error(message.author, {
                    description: translator.translate("SOMETHING_WRONG", e)
                })
            });
        }
    }
}

module.exports = _Command;