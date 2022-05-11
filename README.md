# discord-bot

[![Docker build & Push](https://github.com/veteranmina/discord-bot/actions/workflows/main.yml/badge.svg)](https://github.com/veteranmina/discord-bot/actions/workflows/main.yml)

Bot originally from: https://github.com/eveseat/discord-bot with modifications to reponses

Environment variables available:
```
REQUIRED
TOKEN: Discord BOT Token
APP_URL: Working web address - Based on SeAT - https://github.com/eveseat/seat
MAPPER: Working web address - WormHole Mapper
ZADDER: Working web address - Alliance Zkillboard
```

```
OPTIONAL
MAPPER: Working web address to a Eve Online Mapper
DISCORDCHAN: Discord channel ID for !Notice me senpai command to listen for
    Note: Not populating this will default to answering all requests
DMLCKCHANNEL: Locks !Notice me senpai to specified Discord channel
    Note: Not populating this will allow bot to listen and answer to other granted channels
VERSIONOFF: Turns off !version command
    Note: Not populating this will allow !version command to function
```
```
Available Commands (Qualifier is ! for commands)
!Notice me senpai: sends you a direct message with address link
!eve: Eve related commands
    !eve.status: Provides Eve Online TQ players, version and Start Time
    !eve.time: Provides current Eve Online time and link to common world clocks
!ping: pong!
!seat: Provides address with additional sub-links (plugins are required for these sub-links to work)
!tools: Provides addresses for Selected WormHole Mapper & Alliance ZkillBoard
!version: Provides current versions of SeAT and it's packages