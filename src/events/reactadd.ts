import {
    Message,
    MessageEmbed,
    MessageReaction,
    TextChannel,
    User,
} from "discord.js";
import { CommandoClient } from "discord.js-commando";
import IReactionRole from "../IReactionRole";

export default async (
    client: CommandoClient,
    reaction: MessageReaction,
    user: User
) => {
    if (user.id == client.user.id) {
        return;
    }
    let reactionRoles: Array<IReactionRole> = client.provider.get(
        reaction.message.guild,
        "reaction_roles",
        []
    );

    reactionRoles.forEach((reactionRole) => {
        if (reactionRole.messageId == reaction.message.id) {
            if (reactionRole.emojiId == reaction.emoji.id) {
                reaction.users.remove(user);
                let role = reaction.message.guild.roles.cache.get(
                    reactionRole.roleId
                );

                if (role != undefined) {
                    if (
                        reaction.message.guild
                            .member(user)
                            .roles.cache.has(reactionRole.roleId)
                    ) {
                        console.log("has the role");
                        reaction.message.guild.member(user).roles.remove(role);
                    } else {
                        reaction.message.guild
                            .member(user)
                            .roles.add(
                                reaction.message.guild.roles.cache.get(
                                    reactionRole.roleId
                                )
                            );
                    }
                }
                return;
            }
        }
    });
};
