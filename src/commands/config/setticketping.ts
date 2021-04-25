import { CategoryChannel, Role } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";

module.exports = class SetTicketCategory extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "setticketping",
            group: "config",
            aliases: ["setticketp"],
            memberName: "setticketping",
            description: "sets the role to ping when a ticket is created",
            args: [
                {
                    key: "role",
                    label: "role",
                    prompt: "What is the role",
                    type: "role",
                },
            ],
            guildOnly: true,
            guarded: true,
            examples: [
                "prefix setticketping @Tickets",
                "prefix setticketcategory 833864721941528666",
            ],
            userPermissions: ["ADMINISTRATOR"],
        });
    }

    async run(msg: CommandoMessage, args) {
        let ping: Role = args["role"];

        let ticket_ping_id = await this.client.provider.set(msg.guild, "ticket_ping_id", ping.id);
        return msg.channel.send("The ticket ping has been set to <@&" + ticket_ping_id + ">");
    }
};
