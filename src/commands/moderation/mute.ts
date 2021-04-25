import { GuildMember, Role } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";

module.exports = class MuteCommand extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "mute",
            aliases: ["silence"],
            group: "moderation",
            memberName: "mute",
            description: "mutes a user. Running it on a muted user will unmute them",
            args: [
                {
                    key: "user",
                    label: "user",
                    prompt: "Who would you like to ban?",
                    type: "member",
                    infinite: false,
                },
            ],
            guildOnly: true,
            examples: ["prefix mute @Careless", "prefix mute 408450843726053379"],
            userPermissions: ["BAN_MEMBERS"],
            clientPermissions: ["MANAGE_ROLES"]
        });
    }

    async run(msg: CommandoMessage, args) {
        let toMute: GuildMember = args["user"];

        if (
            this.client.provider.get(msg.guild, "muted_role_id", null) == null
        ) {
            return msg.channel.send(
                "This guild does not have a set muted role! Run 'prefix addmuterole' to add one or set one with the config"
            );
        }

        if (await msg.guild.roles.fetch(this.client.provider.get(msg.guild, "muted_role_id", '')) == null) {
            return msg.channel.send("The guild muted role is not a valid id. Set a valid on in the config or run 'prefix addmuterole' to create one for you")
        }

        let roleId = this.client.provider.get(msg.guild, "muted_role_id", null);

        if (
            toMute.roles.cache.get(roleId) != undefined
        ) {
            toMute.roles.remove(
                msg.guild.roles.cache.get(
                    roleId
                )
            );
            return msg.channel.send(`Unmuted <@${toMute.id}>`);
        } else {
            toMute.roles.add(
                msg.guild.roles.cache.get(
                    roleId
                )
            );
            return msg.channel.send(`Muted <@${toMute.id}>`);
        }
    }
};
