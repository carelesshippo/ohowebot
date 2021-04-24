import { Message } from "discord.js";
import { Client, CommandoClient, SQLiteProvider } from "discord.js-commando";
let { token, prefix, supportServerInvite } = require("../config.json");
import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import messagedeletelogger from "./events/messagedeletelogger";

let database = null;
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
    database = db;
    bot.setProvider(new SQLiteProvider(database)).catch(console.error);
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
});

bot.on("messageDelete", (message: Message) => {
    messagedeletelogger(bot, message);
})

bot.login(token).catch(console.log);

export { database };
