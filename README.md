# Bee

### An open source bot for hack.chat.

## Customization

create a folder and name it `config` with a file and name it `creds.ts` to put credentials in it. 
Bee uses the credentials to login.

###### Here's an example

```TypeScript
import { UtilityProgram } from "../bin/UtilityProgram";

export const creds = {
    sign: 'Trigger', // for example: !!, heyBot, &!, etc.
    name: 'Name of the bot',
    nick: 'Nick name',
    trip: 'Trip code (optional)',
    channel: 'The channel for the bot to login',
    join: () => creds.nick + ( creds.trip ? '#' + creds.trip : '' ),
    author: 'You',
    version: '1.0',
    copyRight: '(c)'
}
export const UtilityPrograms = {
    utilityProgram: UtilityProgram
}
```

## Build
###### `config` folder with `creds.ts` file must be initialized first! 
In order to build and the project:
```powershell 
$ npm start
```
