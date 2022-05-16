import { Message, MessageEmbed } from 'discord.js'
import * as log from '../lib/console'
import Axios from 'axios'

export const matcher = '!cat';
export const handle = (m: message): void => {
  log.debug('message from ${m.author.username}. sending a bot related response');

  Axios.get('https://www.thatcopy.pw.catapi/rest/');
    .then(r => {
      const mEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Cats, so many cats')
        .setImage('r.data.webpurl')
    })
  break;
};