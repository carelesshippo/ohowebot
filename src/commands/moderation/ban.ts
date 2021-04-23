import { GuildMember } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";

module.exports = class BanCommand extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "ban",
            aliases: ["banish"],
            group: "moderation",
            memberName: "ban",
            description: "bans a user",
            args: [
                {
                    key: "user",
                    label: "user",
                    prompt: "Who would you like to ban?",
                    type: "member"
                },
                {
                    key: "reason",
                    label: "reason",
                    prompt: "What is the reason for this?",
                    type: "string",
                    default: '~none'
                }
            ],
            guildOnly: true,
            examples: ["prefix ban @Careless", "prefix ban 408450843726053379 to cool for skool"],
            userPermissions: ["BAN_MEMBERS"],
            clientPermissions: ["BAN_MEMBERS"]
        });
    }

    async run(msg: CommandoMessage, args) {
        let toBan: GuildMember = args["user"];
        let reason = args["reason"];
        if (reason == '~none') {
            reason = this.client.provider.get(
                msg.guild,
                "default_ban_reason",
                "Banned by oBot"
            );
        }

        if (toBan.bannable) {
            toBan.ban({
                reason: reason,
            });
            return msg.channel.send("Banned for '" + reason + "'!");
        } else {
            return msg.channel.send(`Failed to ban <@${toBan.id}>`);
        }
    }
};
