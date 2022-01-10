import { Message, MessageEmbed } from 'discord.js'
import * as log from '../lib/console'
import axios from 'axios'

const seatdocker = getVersion(`https://img.shields.io/docker/v/eveseat/seat.json`)
const api = getVersion(`https://img.shields.io/github/v/release/eveseat/api.json`)
const seat_console = getVersion(`https://img.shields.io/github/v/release/eveseat/console.json`)
const eveapi = getVersion(`https://img.shields.io/github/v/release/eveseat/eveapi.json`)
const notifications = getVersion(`https://img.shields.io/github/v/release/eveseat/notifications.json`)
const services = getVersion(`https://img.shields.io/github/v/release/eveseat/services.json`)
const web = getVersion(`https://img.shields.io/github/v/release/eveseat/web.json`)


export const matcher = `!version`
export const handle = (m: Message): void => {
	log.debug(`message from ${m.author.username}. sending a seat related response`);
	Promise.all([seatdocker, api, seat_console, eveapi, notifications, services, web])
		.then(function(values)
		{
			const mEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Current SeAT Package Versions')
			.addFields(
				{ name: 'Seat Docker Image', value: `[${values[0]}](https://hub.docker.com/r/eveseat/seat)`, inline: true},              //seatdocker
				{ name: 'API', value: `[${values[1]}](https://github.com/eveseat/api/releases/latest)`, inline: true},                   //api
				{ name: 'Console (Depreciated)', value: `[${values[2]}](https://github.com/eveseat/api/releases/latest)`, inline: true}, //seat_console
				{ name: 'EveAPI', value: `[${values[3]}](https://github.com/eveseat/api/releases/latest)`, inline: true},                //eveapi
				{ name: 'Notifications', value: `[${values[4]}](https://github.com/eveseat/api/releases/latest)`, inline: true},         //notifications
				{ name: 'Services', value: `[${values[5]}](https://github.com/eveseat/api/releases/latest)`, inline: true},              //services
				{ name: 'Web', value: `[${values[6]}](https://github.com/eveseat/api/releases/latest)`, inline: true}                    //web
                );
		m.channel.send( { content: `${m.author}`, embeds: [mEmbed] });
		})
		.catch(error => {
            m.channel.send(`${m.author}, unable to determine current versions at this time`);
        })
};

function getVersion(version: string) {
return axios.get(version)
  .then(r => {
    return (r.data.value)
  })
  .catch(error => {
    log.debug('Encountered error in !versions response')
  })
}