import { timeEnd } from "console";
import { MessageEmbed, Role } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";
import ITicket from "../../ITicket";

module.exports = class NewTicketRole extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "close",
            group: "ticket",
            aliases: ["closeticket"],
            memberName: "closeticket",
            description: "close's ticket",
            guildOnly: true,
            examples: ["prefix close"]
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
        let tickets: Array<ITicket> = this.client.provider.get(
            msg.guild,
            "tickets",
            null
        );
        if (tickets == null) {
            tickets = await this.client.provider.set(msg.guild, "tickets", []);
        }

        let actualTicket: ITicket = null;
        tickets.forEach(ticket => {
            if (ticket.channelId == msg.channel.id) {
                actualTicket = ticket;
                return;
            }
        });

        if (actualTicket == null) {
            return msg.channel.send("This is not a ticket channel");
        }

        actualTicket.resolved = true;

        tickets[actualTicket.id] = actualTicket;
        this.client.provider.set(msg.guild, "tickets", tickets);

        msg.channel.delete("Ticket resolved");
        return null;
    }
};
