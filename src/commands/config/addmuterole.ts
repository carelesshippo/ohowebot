import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";

module.exports = class AddMuteRoleCommand extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "addmuterole",
            group: "config",
            aliases: ["createmuterole"],
            memberName: "addmuterole",
            description: "creates a muted role",
            args: [
                {
                    key: "name",
                    label: "name",
                    prompt: "Who would you like it to be called?",
                    type: "string",
                    default: "muted",
                },
            ],
            guildOnly: true,
            examples: [
                "prefix addmuterole",
                "prefix addmuterole funnymutedname",
            ],
            userPermissions: ["ADMINISTRATOR"],
            clientPermissions: ["MANAGE_ROLES"]
        });
    }

    async run(msg: CommandoMessage, args) {
        let role = await msg.guild.roles.create({
            data: {
                name: args["name"],
                mentionable: false,
                permissions: ["CONNECT", "VIEW_CHANNEL"],
            },
        });

        this.client.provider.set(msg.guild, "muted_role_id", role.id);
        return msg.channel.send("Created!");
    }
};
