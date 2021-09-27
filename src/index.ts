import { Client, Intents, Message } from "discord.js"
import { Handler } from "./say";
import * as log from './lib/console'

const token = process.env.TOKEN;
const seataddr = process.env.seataddr;

if (token === ``) {
  log.error(`no discord token found in env. set \`TOKEN\` bye!`);
  process.exit();
}

if (seataddr === ``) {
  log.error(`no seat address found in env. set \`SEATADDR\``);
}

const client: Client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
});
const handler: Handler = new Handler();

client.on(`ready`, () => {
  log.info(`ready & authenticated as ${client.user?.tag}`);
});

client.on(`message`, (msg: Message) => {
  handler.respond(msg);
});

client.login(token);
