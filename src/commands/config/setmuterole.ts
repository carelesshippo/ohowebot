import { Role } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";

module.exports = class SetMuteRoleCommand extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "setmuterole",
            group: "config",
            aliases: [],
            memberName: "setmuterole",
            description: "sets the muted role",
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
                "prefix setmuterole @Role",
                "prefix setmuterole 834909825829044224",
            ],
            userPermissions: ["ADMINISTRATOR"],
        });
    }

    async run(msg: CommandoMessage, args) {
        let role: Role = args["role"];

        let setRoleid = await this.client.provider.set(msg.guild, "muted_role_id", role.id);
        return msg.channel.send("The muted role has been set to " + setRoleid);
    }
};
