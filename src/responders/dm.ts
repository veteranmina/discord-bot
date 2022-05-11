import { Message, MessageEmbed } from 'discord.js'
import * as log from '../lib/console'

const seataddr = process.env.APP_URL;
const discordchan = process.env.DISCORDCHAN;
const dmchanlck = process.env.DMLCKCHANNEL;

export const matcher = `!Notice me senpai`;
export const handle = (m: Message): void => {
  log.debug(`message from ${m.author.username}. sending an bot related response`);

  if (seataddr === undefined) {
    m.channel.send(`${m.author}, The SeAT address is currently not set`);
    return;
  }
  if (discordchan !== undefined && m.channel.id === discordchan) {
    m.channel.send(`${m.author}, I noticed you and slid into your dm's`);
    m.author.send(`Here is the link you requested from Senpai ${seataddr}`);
  }
  else if (discordchan !== undefined && m.channel.id !== discordchan && dmchanlck !== undefined) {
    m.channel.send(`${m.author}, Haven't I noticed you once before?`);
    m.channel.send(`I guess here is the link, again... ${seataddr}`);
  }
  else if (discordchan === undefined) {
    m.channel.send(`${m.author}, I noticed you and slid into your dm's`);
    m.author.send(`Here is the link you requested from Senpai: ${seataddr}`);
  }
};
