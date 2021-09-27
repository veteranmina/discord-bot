import { Message } from 'discord.js'
import * as log from '../lib/console'
import Axios from 'axios'

const STATUS = `.status`;
const TIME = `.time`;
const ADDRESS = `.address`;
const CALENDAR = `.calendar`;
const commands: string[] = [STATUS, TIME, ADDRESS, CALENDAR];

const seataddr = process.env.app_url;
const calendar = ${seataddr} + `/calendar/operation`;

declare module 'axios' {
  export interface AxiosRequestConfig {
    start_time: number,
    duration: number
  }
}

export const matcher = `.eve`;
export const handle = (m: Message): void => {
  log.debug(`message from ${m.author.username}. sending an eve related response`);

  switch (m.content.replace(matcher, ``)) {
    case STATUS: {
      Axios.get(`https://esi.evetech.net/latest/status/?datasource=tranquility`)
        .then(r => {
          m.channel.send(`${m.author}, TQ has \`${r.data.players}\` players, ` +
            `is running on server version ` + `\`${r.data.server_version}\` ` +
            `and started on \`${r.data.start_time}\``);
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

          let headers = ``;
		  headers = r.headers.date

          const msg = `EveTime UTC: ${headers}`;

          m.channel.send(`${m.author}, ${msg}`);
        })
        .catch(e => {

          let headers = ``;
          for (const key in e.response.headers) {
            if (Object.prototype.hasOwnProperty.call(e.response.headers, key)) {
              const element = e.response.headers[key];
              headers = headers + `\`${key}\`: \`${element}\`\n`
            }
          }

          const msg = `Response code: \`${e.response.status} (${e.response.statusText})\`\n` +
            `Response data: \`${JSON.stringify(e.response.data)}\`\n` +
            `Response headers: ${headers}`;

          m.channel.send(`${m.author}, failed to call /ping endpoint with error: ${e}\n\n${msg}`);
        })
      break;
	}
	case ADDRESS: {
		if (seataddr === ``) {
			m.channel.send(`${m.author}, The SeAT address is currently not set`);
		}
		else {
		m.channel.send(`${m.author}, The SeAT address is ${seataddr}`);
		}
		break;
	}
	case CALENDAR: {
		if (seataddr === ``) {
			m.channel.send(`${m.author}, The SeAT address is currently not set`);
		}
		else {
		m.channel.send(`${m.author}, SeAT Calendar \`${seataddr}\`/calendar/operation`);
		}
		break
    }


    default: {
      const valid = commands.map(e => `\`${matcher}${e}\``).join(`, `);
      m.channel.send(`${m.author}, available \`${matcher}\` commands are: ${valid}`);
    }
  }
};
