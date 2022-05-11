import { Message, MessageEmbed } from 'discord.js'
import * as log from '../lib/console'

const seataddr = process.env.APP_URL;

const calendar = `${seataddr}` + `/calendar/operation`;
const doctrine = `${seataddr}` + `/fitting/doctrine`;
const fitting = `${seataddr}` + `/fitting`;
const srp = `${seataddr}` + `/srp`

export const matcher = `!seat`;
export const handle = (m: Message): void => {
  log.debug(`message from ${m.author.username}. sending an seat related response`);

  if (seataddr === undefined) {
    m.channel.send(`${m.author}, The SeAT address is currently not set`);
    return;
  }
  const mEmbed = new MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`SeAT Related Links`)
      .addFields(
          { name: `\u200B`, value: `[SeAT Login](${seataddr})\n[Operations Calendar](${calendar})\n[Fleet Doctrines](${doctrine})\n[Ship Fittings](${fitting})\n[Ship SRP](${srp})`},
          );
  m.channel.send( { content: `${m.author}`, embeds: [mEmbed] });
};