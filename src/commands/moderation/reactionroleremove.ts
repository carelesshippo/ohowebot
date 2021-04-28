import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";
import ReactionRole from "../../models/ReactionRole";

module.exports = class ReactionRoleRemove extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: "reactionroleremove",
            aliases: ["rrr"],
            group: "moderation",
            memberName: "reactionroleremove",
            description: "removes a reaction role from the database",
            args: [
                {
                    key: "id",
                    label: "id",
                    prompt: "What is the id of the reaction role (see reationrolelist)?",
                    type: "integer",
                }
            ],
            guildOnly: true,
            examples: ["prefix reactionroleremove id"],
            userPermissions: ["MANAGE_MESSAGES"],
        });
    }

    async run(msg: CommandoMessage, args) {
        let id = args["id"];

        let reactionRole = await ReactionRole.findByPk(id);
        if (reactionRole) {
            reactionRole.destroy();
            return msg.channel.send("Removed reaction role with id " + id);
        }
        return msg.channel.send("Failed to delete reaction role with id " + id);
    }
};
