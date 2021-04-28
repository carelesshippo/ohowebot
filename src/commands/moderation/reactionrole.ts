import { Emoji, GuildEmoji, GuildMember, Message, Role } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";
import ReactionRole from "../../models/ReactionRole";

module.exports = class ReactionRoleCommannd extends Command {
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
                    type: "message",
                },
            ],
            guildOnly: true,
            examples: ["prefix reactionrole @Role messagelinkorid"],
            userPermissions: ["MANAGE_MESSAGES"],
        });
    }

    async run(msg: CommandoMessage, args) {
        let role: Role = args["role"];
        let emoji = args["emoji"];
        let message: Message = args["message"];

        console.log(emoji)

        ReactionRole.create({
            emojiid: emoji.id,
            roleid: role.id,
            messageid: message.id,
        });

        message.react(emoji);

        return msg.channel.send(
            "Created reaction role on message " + message.id
        );
    }
};
