import { Message, MessageReaction, User } from "discord.js";
import { Client, CommandoClient, SQLiteProvider } from "discord.js-commando";
let { token, prefix, supportServerInvite, richPresence } = require("../config.json");
import path from "path";
import { Sequelize } from "sequelize";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import messagedeletelogger from "./events/messagedeletelogger";
import reactadd from "./events/reactadd";
import reactremove from "./events/reactremove";
import { init as reactionroleinit } from "./models/ReactionRole";
import { init as ticketinit } from "./models/Ticket";

function registerModels() {
    ticketinit(sequelize);
    reactionroleinit(sequelize);
}

let sequelize: Sequelize = null;
let bot: CommandoClient = new CommandoClient({
    owner: ["408450843726053379"],
    commandPrefix: prefix,
    commandEditableDuration: 10,
    nonCommandEditable: true,
    invite: supportServerInvite,
});
bot.registry
    .registerGroups([
        ["moderation", "Moderation"],
        ["ticket", "Tickets"],
        ["config", "Config"],
        ["other", "Other"],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, "commands"))
    .registerTypesIn(path.join(__dirname, "types"));

open({ filename: "database.sqlite3", driver: sqlite3.Database }).then((db) => {
    bot.setProvider(new SQLiteProvider(db)).catch(console.error);
    sequelize = new Sequelize({
        storage: path.join(__dirname, "..", "database.sqlite3"),
        dialect: "sqlite",
    });
    registerModels();
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity({
        type: "WATCHING",
        name: richPresence,
    })
});

bot.on("messageDelete", (message: Message) => {
    messagedeletelogger(bot, message);
});

bot.on("messageReactionAdd", (reaction: MessageReaction, user: User) => {
    reactadd(bot, reaction, user);
});

bot.on("messageReactionRemove", (reaction: MessageReaction, user: User) => {
    reactremove(bot, reaction, user);
});

bot.login(token).catch(console.log);
