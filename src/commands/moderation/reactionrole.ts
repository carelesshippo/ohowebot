import { GuildEmoji, GuildMember, Message, Role } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";
import IReactionRole from "../../IReactionRole";

module.exports = class BanCommand extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "reactionrole",
            aliases: ["rr"],
            group: "moderation",
            memberName: "reactionrole",
            description: "creates a reaction role",
            args: [
                {
                    key: "role",
                    label: "role",
                    prompt: "What is the role?",
                    type: "role",
                },
                {
                    key: "emoji",
                    label: "emoji",
                    prompt: "What is the emoji",
                    type: "custom-emoji",
                },
                {
                    key: "message",
                    label: "message",
                    prompt: "What is the message",
                    type: "string",
                },
            ],
            guildOnly: true,
            examples: ["prefix reactionrole @Role Message"],
            userPermissions: ["MANAGE_MESSAGES"],
        });
    }

    async run(msg: CommandoMessage, args) {
        let role: Role = args["role"];
        let emoji: GuildEmoji = args["emoji"];
        let message: string = args["message"];
        

        let reactionRoles: Array<IReactionRole> = this.client.provider.get(
            msg.guild,
            "reaction_roles",
            null
        );
        if (reactionRoles == null) {
            reactionRoles = await this.client.provider.set(msg.guild, "reaction_roles", []);
        }
        
        let sentMessage = await msg.channel.send(message);
        sentMessage.react(emoji);

        let newReactionRole: IReactionRole = {
            emojiId: emoji.id,
            roleId: role.id,
            messageId: sentMessage.id
        }
        reactionRoles.push(newReactionRole);

        this.client.provider.set(msg.guild, "reaction_roles", reactionRoles);

        return msg.channel.send("Delete this message and the sent command. Or don't. Its your choice")
    }
};
