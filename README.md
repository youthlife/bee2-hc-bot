# 🐝 Bee - hack.chat

### An open source cool bot for hack.chat website.

It's the TypeScript version of Bee which was written in pure JavaScript ;
re-written from scratch to be more tidy and easy-to-read.
You can find utility programs (commands) in `src/bin` directory, configurations in `src/config` and
other directories at `src` folder.

a list of other bots and third party softwares of [Hack chat](https://hack.chat/) can be found at
[Third party software List](https://github.com/youthlife/3rd-party-software-list).

## Customization

Change the credential files inside `src/config` folder in order to customize the bot.

##### How to get API keys, trip code and other values for __debug__?
> go to `config/keys.ts`, and then just comment out the whole `keys` object and uncomment the import:
```Javascript
import keys from './debug';

/* const keys = { 
    trip: ..,
    api_key: { .. }
} */
```

## Build

###### files in `config` folder must be initialized!

In order to build and run the project:

```bat
$ npm start
```

alternatively you can first build:

```bat
$ npm run build
```

Then run the bot:
```bat
$ npm run bot
```

## Commands

##### Utility programs (commands) are located at `bin` folder.

##### Commands :

- [ ] art
- [x] astro
- [x] bee
- [x] countryInfo
- [ ] dog
- [x] echo
- [x] feat
- [x] help
- [ ] holiday
- [x] ipinfo
- [ ] music
- [ ] proxy
- [ ] radar
- [ ] say
- [x] system

## Contribution

##### You could add any new commands (utility programs) by creating a new file with
##### `.ts` extension at `src/bin/` directory which can be written either in __pure `JavaScript`__ or __`TypeScript`__.

###### Here's the least requirements for any utility program:

```JavaScript
class MyUtilityProgram { }
```

###### In order to extend your utility program (`Command` is a class, not an interface):

```JavaScript
import Command from '../interfaces/Command';

class MyUtilityProgram extends Command {
	Process() {
		this.output = "Hello world!";
		this.Send(this.output);
	}
}
```

###### using an API (`JavaScript`):

```JavaScript
// import Command from '../interfaces/Command';

class MyUtilityProgram /* extends Command */ {
	Process() {
		// get json from server ...
		// process data ...
		this.Send(this.output) // return output
	}
}
```

###### using an API (`TypeScript`):

```TypeScript
import API from '../API/< My API >'
import Command from '../interfaces/Command';

class MyUtilityProgram /* extends Command */ implements API.IAPI {
	Process(): void {
		// get json from server ...
		// process data ...
		this.Send(this.output) // return output
	}
}
```

## Todo

- [x] LaTeX module
- [ ] implement HandleJoin & HandleLeave at `IncomingDataHandler.ts`
- [ ] implement whisper, emote and warn at `IncomingDataHandler.ts`
- [ ] function for escaping hack chat characters