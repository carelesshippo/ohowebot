import { Message, MessageEmbed, TextChannel } from "discord.js";
import { CommandoClient } from "discord.js-commando";

export default async (client: CommandoClient, message: Message) => {
    let channelId = client.provider.get(message.guild, "deleted_message_log_channel_id", null)
    if (channelId != null) {
        let channel = message.guild.channels.cache.get(channelId);

        if (channel instanceof TextChannel) {
            channel.send(new MessageEmbed().setTitle(`${message.member.user.tag} deleted message`).setDescription(message.content));
        }
    }
}