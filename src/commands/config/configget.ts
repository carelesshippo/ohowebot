import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";

module.exports = class ConfigGetCommand extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "configget",
            group: "config",
            aliases: [],
            memberName: "configget",
            description: "view the guild config for key",
            args: [
                {
                    key: "key",
                    label: "key",
                    prompt: "What is the key",
                    type: "string",
                },
            ],
            guildOnly: true,
            guarded: true,
            examples: ["prefix configget muted_role_id"],
            userPermissions: ["ADMINISTRATOR"],
        });
    }

    async run(msg: CommandoMessage, args) {
        let key: string = args["key"];

        let value = this.client.provider.get(msg.guild, key, null);
        if (value) {
            return msg.channel.send("The value for `" + key + "` is " + value);
        } else {
            return msg.channel.send("There is no set value for `" + key + "`")
        }
    }
};
