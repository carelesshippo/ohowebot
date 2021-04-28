import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";

module.exports = class ResetConfigCommand extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "resetconfig",
            group: "config",
            aliases: [],
            memberName: "resetconfig",
            description: "resets the guild's config (irreversable)",
            args: [
                {
                    key: "really",
                    label: "really",
                    prompt: "Are you sure? (True false)",
                    type: "boolean",
                },
            ],
            guildOnly: true,
            guarded: true,
            examples: ["prefix resetconfig true"],
            userPermissions: ["ADMINISTRATOR"],
        });
    }

    async run(msg: CommandoMessage, args) {
        if (args["really"]) {
            this.client.provider.clear(msg.guild);
            return msg.channel.send(
                "Reset all settings. Hope that wasn't a mistake lol"
            );
        } else {
            return msg.channel.send("Cancelled!");
        }
    }
};
