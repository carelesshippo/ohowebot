import { timeEnd } from "console";
import { MessageEmbed, Role } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";
import ITicket from "../../ITicket";
import Ticket from "../../models/Ticket";

module.exports = class NewTicketRole extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "close",
            group: "ticket",
            aliases: ["closeticket"],
            memberName: "closeticket",
            description: "close's ticket",
            guildOnly: true,
            examples: ["prefix close"],
        });
    }

    async run(msg: CommandoMessage, args) {
        let category = this.client.provider.get(
            msg.guild,
            "ticket_category_id",
            null
        );

        let ping = this.client.provider.get(msg.guild, "ticket_ping_id", null);

        if (category == null || ping == null) {
            if (msg.member.hasPermission("ADMINISTRATOR")) {
                msg.channel.send(
                    "You appear to have permissions! To enable tickets make sure that the ticket category and ticket ping are set."
                );
            }
            return msg.channel.send("Tickets are not enabled on this server.");
        }

        let actualTicket = await Ticket.findOne({
            where: {
                channelid: msg.channel.id,
            },
        });
        if (actualTicket == null) {
            return msg.channel.send("This is not a ticket channel");
        }

        actualTicket.resolved = true;
        actualTicket.save();

        msg.channel.delete("Ticket resolved");
        return null;
    }
};
