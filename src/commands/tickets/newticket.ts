import { MessageEmbed, Role } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";
import ITicket from "../../ITicket";

module.exports = class NewTicketRole extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "new",
            group: "ticket",
            aliases: ["newticket", "newsupport", "support"],
            memberName: "newticket",
            description: "creates a new ticket",
            args: [
                {
                    key: "subject",
                    label: "subject",
                    prompt: "What is the subject? (Max 10 characters)",
                    type: "string",
                    validate: (str: string) => {
                        return str.length <= 10;
                    },
                    default: "No subject provided",
                },
            ],
            guildOnly: true,
            examples: ["prefix new", "prefix new this is a subject"],
            userPermissions: ["SEND_MESSAGES"],
        });
    }

    async run(msg: CommandoMessage, args) {
        let subject: string = args["subject"];

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

        let parent = msg.guild.channels.cache.get(category);

        let newChannel = await msg.guild.channels.create("Ticket", {
            reason: "New ticket created",
            parent: parent,
            permissionOverwrites: [
                { id: msg.member.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                { id: msg.guild.roles.everyone.id, deny: ["VIEW_CHANNEL"] },
                { id: ping, allow: ["VIEW_CHANNEL"] },
            ],
        });

        let newTicket: ITicket = {
            channelId: newChannel.id,
            creatorId: msg.member.id,
            originalMessageId: msg.id,
            subject: subject,
            id: tickets.length,
            resolved: false
        };

        tickets.push(newTicket);
        this.client.provider.set(msg.guild, "tickets", tickets);

        newChannel.send(
            new MessageEmbed().setTitle(
                `Ticket #${newTicket.id}: ${newTicket.subject}`
            )
        );
        newChannel.send(`<@&${ping}>`);
        newChannel.send(`<@${msg.member.id}>`);

        return msg.channel.send("Created in <#" + newChannel.id + ">");
    }
};
