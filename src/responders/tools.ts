import { Message, MessageEmbed } from 'discord.js'
import * as log from '../lib/console'

const mapper = process.env.MAPPER;
const zkill = process.env.ZADDR;

const MAPPER = `.mapper`;
const ZKILL = `.zkill`;

export const matcher = `!tools`;
export const handle = (m: Message): void => {
  log.debug(`message from ${m.author.username}. sending an seat related response`);

  const mEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Eve Online Tools')
      .addFields(
          { name: `\u200B`, value: `[Wormhole Mapper](${mapper})\n[Alliance ZkillBoard](${zkill})` },
          );
  m.channel.send( { content: `${m.author}`, embeds: [mEmbed] });

};