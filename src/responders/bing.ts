import { Message } from 'discord.js'
import * as log from '../lib/console'

export const matcher = `!bing`;
export const handle = (m: Message): void => {
    log.debug(`message from ${m.author.username}. sending a bong`);
    m.channel.send(`Bong!`);
};
