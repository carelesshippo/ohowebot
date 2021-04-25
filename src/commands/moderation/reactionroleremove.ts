import { GuildEmoji, GuildMember, Message, Role } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";
import IReactionRole from "../../IReactionRole";

module.exports = class BanCommand extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "reactionroleremove",
            aliases: ["rrr"],
            group: "moderation",
            memberName: "reactionroleremove",
            description: "removes a reaction role from the database",
            args: [
                {
                    key: "message",
                    label: "message",
                    prompt: "What is the message of the role?",
                    type: "message",
                }
            ],
            guildOnly: true,
            examples: ["prefix reactionroleremove message"],
            userPermissions: ["MANAGE_MESSAGES"],
        });
    }

    async run(msg: CommandoMessage, args) {
        let message: Message = args["message"];

        let reactionRoles: Array<IReactionRole> = this.client.provider.get(
            msg.guild,
            "reaction_roles",
            null
        );
        if (reactionRoles == null) {
            reactionRoles = await this.client.provider.set(msg.guild, "reaction_roles", []);
        }
        let isRemoved = false;
        for (let i = reactionRoles.length - 1; i >= 0; i--) {
            const reactionRole = reactionRoles[i];
            if (reactionRole.messageId == message.id) {
                reactionRoles.splice(i, 1);
                isRemoved = true;
                break;
            }
        }

        this.client.provider.set(msg.guild, "reaction_roles", reactionRoles);

        return msg.channel.send(isRemoved ? "Removed" : "Could not find the specified reaction role message!")
    }
};
