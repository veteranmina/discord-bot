import { Message, MessageEmbed } from 'discord.js'
import * as log from '../lib/console'

const seataddr = process.env.APP_URL;

const CALENDAR = `.calendar`;
const DOCTRINE = `.doctrine`;
const FITTING = `.fitting`;
const SEAT = `.seat`;
const SRP = `.srp`;

const calendar = `${seataddr}` + `/calendar/operation`;
const doctrine = `${seataddr}` + `/fitting/doctrine`;
const fitting = `${seataddr}` + `/fitting`;
const srp = `${seataddr}` + `/srp`

export const master = `!seat`;
export const handle = (m: Message): void => {
  log.debug(`message from ${m.author.username}. sending an seat related response`);

  if (seataddr === undefined) {
    m.channel.send(`${m.author}, The SeAT address is currently not set`);
  }
  else {
    const mEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('SeAT Related Links')
        .addFields(
            { name: Seat Address, value: [Link](`${seataddr}`)},
            { name: Seat Calendar, value: [Link](`${calendar}`)},
            { name: Seat Doctrine, value: [Link](`${doctrine}`)},
            { name: Seat Fitting, value: [Link](`${fitting}`)},
            { name: Seat SRP, value: [Link](`${srp}`)}
            );
    m.channel.send( { content: `${m.author}`, embeds: [mEmbed] });
  }
    break;
};