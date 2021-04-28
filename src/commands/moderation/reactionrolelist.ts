import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";
import ReactionRole from "../../models/ReactionRole";

module.exports = class ReactionRoleListCommannd extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "reactionrolelist",
            aliases: ["rrl"],
            group: "moderation",
            memberName: "reactionrolelist",
            description: "lists all the reaction roles",
            args: [
            ],
            guildOnly: true,
            examples: ["prefix reactionrolelist"],
            userPermissions: ["MANAGE_MESSAGES"],
        });
    }

    async run(msg: CommandoMessage, args) {
        let all = await ReactionRole.findAll()
        if (all.length <= 0) {
            return msg.channel.send("There are no reaction roles in this server")
        }
        let message = "```"
        all.forEach(reactionRole => {
            message += `\nId: ${reactionRole.id}, Message: ${reactionRole.messageid}, Emoji: ${reactionRole.emojiid}, Role: ${reactionRole.roleid}`
        })
        message += "\n```"

        return msg.channel.send(message);
    }
};
