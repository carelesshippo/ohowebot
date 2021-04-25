import { CategoryChannel, Role } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";

module.exports = class SetTicketCategory extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "setticketcategory",
            group: "config",
            aliases: ["setticketc"],
            memberName: "setticketcategory",
            description: "sets the channel category that tickets are created in",
            args: [
                {
                    key: "category",
                    label: "category",
                    prompt: "What is the category",
                    type: "category-channel",
                },
            ],
            guildOnly: true,
            guarded: true,
            examples: [
                "prefix setticketcategory #Tickets",
                "prefix setticketcategory 833864721941528666",
            ],
            userPermissions: ["ADMINISTRATOR"],
        });
    }

    async run(msg: CommandoMessage, args) {
        let category: CategoryChannel = args["category"];

        let set_ticket_category_id = await this.client.provider.set(msg.guild, "ticket_category_id", category.id);
        return msg.channel.send("The ticket category has been set to " + category.name);
    }
};
