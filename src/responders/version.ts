import { Message, MessageEmbed } from 'discord.js'
import * as log from '../lib/console'
import axios from 'axios'

const versionoff = process.env.VERSIONOFF;

let seatdocker = getVersion(`https://api.github.com/repos/eveseat/seat-docker/releases/latest`)
let api = getVersion(`https://api.github.com/repos/eveseat/api/releases/latest`)
let seat_console = getVersion(`https://api.github.com/repos/eveseat/console/releases/latest`)
let eveapi = getVersion(`https://api.github.com/repos/eveseat/eveapi/releases/latest`)
let notifications = getVersion(`https://api.github.com/repos/eveseat/notifications/releases/latest`)
let services = getVersion(`https://api.github.com/repos/eveseat/services/releases/latest`)
let web = getVersion(`https://api.github.com/repos/eveseat/web/releases/latest`)

export const matcher = `!version`
export const handle = (m: Message): void => {
	log.debug(`message from ${m.author.username}. sending a seat related response`);

    if (versionoff !== undefined) {
      return;
    }

	Promise.all([seatdocker, api, seat_console, eveapi, notifications, services, web])
		.then(function(values)
		{
			const mEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('SeAT Package Versions')
			.addFields(
		        {
		            name:`SeAT Docker`,
		            value: `[${values[0].name}](${values[0].html_url})\nReleased - ${values[0].published_at.substring(0,10)}`
		        },
		        {
		            name:`API`,
		            value: `[${values[1].name}](${values[1].html_url})\nReleased - ${values[1].published_at.substring(0,10)}`
		        },
		        {
		            name:`Console (Depreciated)`,
		            value: `[${values[2].name}](${values[2].html_url})\nReleased - ${values[2].published_at.substring(0,10)}`
		        },
		        {
		            name:`Eve API`,
		            value: `[${values[3].name}](${values[3].html_url})\nReleased - ${values[3].published_at.substring(0,10)}`
		        },
		        {
		            name:`Notifications`,
		            value: `[${values[4].name}](${values[4].html_url})\nReleased - ${values[4].published_at.substring(0,10)}`
		        },
		        {
		            name:`Services`,
		            value: `[${values[5].name}](${values[5].html_url})\nReleased - ${values[5].published_at.substring(0,10)}`
		        },
		        {
		            name:`Web`,
		            value: `[${values[6].name}](${values[6].html_url})\nReleased - ${values[6].published_at.substring(0,10)}`
		        }
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
            return (r.data)
        })
        .catch(error => {
            log.debug('Encountered error in !versions response')
        })
}