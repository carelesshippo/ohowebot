import { CategoryChannel, Role, TextChannel } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";

module.exports = class SetTicketCategory extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "setdeletelogchannel",
            group: "config",
            aliases: ["setdeletelog"],
            memberName: "setdeletelogchannel",
            description: "sets the channel that deleted messages are logged in",
            args: [
                {
                    key: "channel",
                    label: "channel",
                    prompt: "What is the channel",
                    type: "text-channel",
                },
            ],
            guildOnly: true,
            guarded: true,
            examples: [
                "prefix setdeletelogchannel #deletedmessages",
                "prefix setdeletelogchannel 833864721941528666",
            ],
            userPermissions: ["ADMINISTRATOR"],
        });
    }

    async run(msg: CommandoMessage, args) {
        let channel: TextChannel = args["channel"];

        let set_id = await this.client.provider.set(msg.guild, "deleted_message_log_channel_id", channel.id);
        return msg.channel.send("The ticket category has been set to <#" + set_id + ">");
    }
};
