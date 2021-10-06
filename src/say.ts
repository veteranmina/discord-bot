import { Message } from "discord.js"
import { IHandle } from "./lib/interfaces"
import * as log from './lib/console'

import * as ping from './responders/ping'
import * as eve from './responders/eve'
import * as seat from './responders/seat'

export class Handler {

  handlers: IHandle[] = [];

  constructor() {
    this.handlers.push({matcher: ping.matcher, handle: ping.handle}); // bot ping
    this.handlers.push({matcher: eve.matcher, handle: eve.handle}); // eve
    this.handlers.push({matcher: seat.matcher, handle: seat.handle}); // seat
  }

  respond(m: Message): void {
    if (m.author.bot) return;  // ignore the bot itself
    if (!m.content.startsWith(`!`)) return; // ignore non-bot messages

    if (m.content == `!`) {
      const c = this.handlers.map(e => `\`${e.matcher}\``).join(`, `);
      m.channel.send(`${m.author}, available bot commands: ${c}`);
      return
    }

    log.info(`handling message: ${m.content}`);

    this.handlers.every(h => {
      log.debug(`checking message starts with ${h.matcher}`);
      if (!m.content.startsWith(h.matcher)) return true;
      h.handle(m);

      return false;
    });
  }
}
