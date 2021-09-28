import { Client, Intents, Message } from "discord.js"
import { Handler } from "./say";
import * as log from './lib/console'

const token = process.env.TOKEN;
const app_url = process.env.APP_URL;
const mapper = process.env.MAPPER;
const zaddr = process.env.ZADDR;

if (token === ``) {
  log.error(`no discord token found in env. set \`TOKEN\` bye!`);
  process.exit();
}

if (app_url === ``) {
  log.error(`no seat address found in env. set \`APP_URL\``);
}

if (mapper === ``) {
  log.error(`no mapper address found in env. set \`MAPPER\``);
}

if (zaddr === ``) {
  log.error(`no zkillboard address found in env. set \`ZADDR\``);
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
