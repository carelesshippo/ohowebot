import { MessageReaction, Role, User } from "discord.js";
import { CommandoClient } from "discord.js-commando";
import ReactionRole from "../models/ReactionRole";

export default async (
    client: CommandoClient,
    reaction: MessageReaction,
    user: User
) => {
    if (user.id == client.user.id) {
        return;
    }
    let member = reaction.message.guild.member(user);
    let messageid = reaction.message.id;
    let emojiid = reaction.emoji.id;

    let matchingReactionRoles: Array<ReactionRole> = await ReactionRole.findAll(
        {
            where: {
                messageid: messageid,
                emojiid: emojiid,
            },
        }
    );

    if (matchingReactionRoles.length > 0) {
        matchingReactionRoles.forEach(async (reactionRole) => {
            let role: Role = reaction.message.guild.roles.cache.get(
                reactionRole.roleid
            );

            if (role != undefined) {
                if (!member.roles.cache.has(reactionRole.roleid)) {
                    try {
                        await member.roles.add(
                            role,
                            "Reaction role for message " + messageid
                        );
                    } catch (error) {
                        let dmChannel = await member.createDM();
                        dmChannel.send(
                            "Failed to add the role `" +
                                role.name +
                                "` in the `" +
                                role.guild.name +
                                "` server. This could be due to you being the owner or having other permissions."
                        );
                    }
                }
            }
        });
    }
};
