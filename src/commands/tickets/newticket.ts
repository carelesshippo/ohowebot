import { Role } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";

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
                    prompt: "What is the subject",
                    type: "string",
                    default: "No subject provided"
                },
            ],
            guildOnly: true,
            examples: [
                "prefix new",
                "prefix new this is a subject",
            ],
            userPermissions: ["SEND_MESSAGES"],
        });
    }

    async run(msg: CommandoMessage, args) {
        let subject: string = args["subject"];

        return null;
    }
};
