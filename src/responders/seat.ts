import { Message, MessageEmbed } from 'discord.js'
import * as log from '../lib/console'

const seataddr = process.env.APP_URL;
const eveimage = process.env.EVE_IMG;
const imagetyp = process.env.EVE_IMG_TYPE;

const CALENDAR = `.calendar`;
const DOCTRINE = `.doctrine`;
const FITTING = `.fitting`;
const SEAT = `.seat`;
const SRP = `.srp`;

const calendar = `${seataddr}` + `/calendar/operation`;
const doctrine = `${seataddr}` + `/fitting/doctrine`;
const fitting = `${seataddr}` + `/fitting`;
const srp = `${seataddr}` + `/srp`

if (eveimage === undefined && imagetyp === undefined) {
    eveimage === `1000001`;
    imagetyp === `corporations`;
}
if (imagetyp === undefined) {
    imagetyp === `corporations`;
}
if (eveimage === undefined) {
    eveimage === `1000001`;
}

const botthumbnail = `https://images.evetech.net/${imagetyp}/${eveimage}/logo?size=128`

export const matcher = `!seat`;
export const handle = (m: Message): void => {
  log.debug(`message from ${m.author.username}. sending an seat related response`);

  if (seataddr === undefined) {
    m.channel.send(`${m.author}, The SeAT address is currently not set`);
  }
  else {
    const mEmbed = new MessageEmbed()
        .setColor(`#0099ff`)
        .setTitle(`SeAT Related Links`)
        .setThumbnail(`${botthumbnail}`)
        .addFields(
            { name: `\u200B`, value: `[SeAT Login](${seataddr})\n[Operations Calendar](${calendar})\n[Fleet Doctrines](${doctrine})\n[Ship Fittings](${fitting})\n[Ship SRP](${srp})`},
            );
    m.channel.send( { content: `${m.author}`, embeds: [mEmbed] });
  }
};