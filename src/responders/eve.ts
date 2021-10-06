import { Message, MessageEmbed } from 'discord.js'
import * as log from '../lib/console'
import Axios from 'axios'

const STATUS = `.status`;
const TIME = `.time`;

const commands: string[] = [STATUS, TIME];

declare module 'axios' {
  export interface AxiosRequestConfig {
    start_time: number,
    duration: number
  }
}

export const matcher = `!eve`;
export const handle = (m: Message): void => {
  log.debug(`message from ${m.author.username}. sending an eve related response`);

  switch (m.content.replace(matcher, ``)) {
    case STATUS: {
      Axios.get(`https://esi.evetech.net/latest/status/?datasource=tranquility`)
        .then(r => {

          const mEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Eve Online Status')
            .setURL('https://eve-offline.net/')
            .addFields(
                { name: 'TQ Players', value: `${r.data.players}`, inline: true},
                { name: 'Server Version', value: `${r.data.server_version}`, inline: true},
                { name: 'Server Start Time', value: `${r.data.start_time}`},
                );
            m.channel.send( { content: `${m.author}`, embeds: [mEmbed] });
        })
        .catch(e => {
          log.error(`failed to call /status endpoint with error: ${e}`);
        })
      break;
    }
    case TIME: {
      Axios.interceptors.request.use(x => {
        x.start_time = new Date().getTime();
        return x;
      });
      Axios.interceptors.response.use(x => {
        x.config.duration = new Date().getTime() - x.config.start_time;
        return x;
      })

      Axios.get(`https://esi.evetech.net/ping`)
        .then(r => {

          const mEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Eve Online Time')
            .setURL('http://time.nakamura-labs.com/')
            .addFields(
                { name: '\u200B', value: `${r.headers.date}`},
                );
            m.channel.send( { content: `${m.author}`, embeds: [mEmbed] });

        })
        .catch(e => {

          let headers = ``;
          for (const key in e.response.headers) {
            if (Object.prototype.hasOwnProperty.call(e.response.headers, key)) {
              const element = e.response.headers[key];
              headers = headers + `\`${key}\`: \`${element}\`\n`
            }
          }

          const mEmbed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Failed to call /ping to server')
            .addFields(
                { name: 'Response code:', value: `${e.response.status}` , inline: true},
                { name: 'Response Text:', value: `${e.response.statusText}`, inline: true},
                { name: 'Response data:', value: `${JSON.stringify(e.response.data)}`},
                { name: 'Response Headers:', value: `${headers}`},
                );
            m.channel.send( { content: `${m.author}`, embeds: [mEmbed] });

        })
      break;
	}
    default: {
      const valid = commands.map(e => `\`${matcher}${e}\``).join(`, `);
      m.channel.send(`${m.author}, available \`${matcher}\` commands are: ${valid}`);
    }
  }
};
