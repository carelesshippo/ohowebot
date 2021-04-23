import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";

module.exports = class InfoCommand extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: 'info',
            aliases: ['i'],
            group: 'other',
            memberName: 'info',
            description: 'shows you information about me.'
        });
    }

    async run(msg: CommandoMessage, args) {
        return msg.channel.send(`I am oBot. You are <@${msg.member.id}>`)
    }
}
