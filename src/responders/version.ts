import { Message, MessageEmbed } from 'discord.js'
import * as log from '../lib/console'
import axios from 'axios'

let seatdocker = getVersion(`https://img.shields.io/docker/v/eveseat/seat.json`)
let api = getVersion(`https://img.shields.io/github/v/release/eveseat/api.json`)
var seat_console = getVersion(`https://img.shields.io/github/v/release/eveseat/console.json`)
var eveapi = getVersion(`https://img.shields.io/github/v/release/eveseat/eveapi.json`)
var notifications = getVersion(`https://img.shields.io/github/v/release/eveseat/notifications.json`)
var services = getVersion(`https://img.shields.io/github/v/release/eveseat/services.json`)
var web = getVersion(`https://img.shields.io/github/v/release/eveseat/web.json`)

Promise.all([seatdocker, api, seat_console, eveapi, notifications, services, web])
    .then(function(values) {

        export const matcher = `!version`
        export const handle = (m: Message): void => {
            log.debug(`message from ${m.author.username}. sending a seat related response`);

            const mEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Current SeAT Package Versions')
                .addFields(
                    { name: 'Seat Docker Image', value: `${values[1]}`},     //seatdocker
                    { name: 'API', value: `${values[2]}`},                   //api
                    { name: 'Console', value: `Depreciated: ${values[3]}`},  //seat_console
                    { name: 'EveAPI', value: `${values[4]}`},                //eveapi
                    { name: 'Notifications', value: `${values[5]}`},         //notifications
                    { name: 'Services', value: `${values[6]}`},              //services
                    { name: 'Web', value: `${values[7]}`}                    //web
                    );
            m.channel.send( { content: `${m.author}`, embeds: [mEmbed] });
        }
    .catch(error => {
     m.channel.send(`${m.author}, error encountered, unable to determine versions at this time`);
    })
    break
})




function getVersion(version: string) {
return axios.get(version)
  .then(r => {
    return (r.data.value)
  })
  .catch(error => {
    console.log('error', version)
  })
}