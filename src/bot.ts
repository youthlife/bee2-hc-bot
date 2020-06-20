import WebSocket = require('ws');
import { creds } from './config/creds'
import { ChatValidation } from './tools/chat';
import { InfoValidation } from './tools/info'
import IncomingDataHandler from './controllers/IncomingDataHandler';

const server = 'wss://hack.chat/chat-ws';
const ws: WebSocket = new WebSocket(server);
const dh = new IncomingDataHandler(ws);

console.log(`[*] Bot started to run.\n
> nick: ${creds.nick}
> trip: ${creds.trip}
> version: ${creds.version}
> channel: ${creds.channel}
`)


// << Join >>
ws.onopen = () => {
	ws.send(JSON.stringify({
		cmd: 'join',
		channel: creds.channel,
		nick: creds.join()
	}));
}

// << leave >>
ws.onclose = () => { ws.terminate() }

// << cmd >>
ws.onmessage = (data: any) => {
	data = JSON.parse(data.data);
	try {
		if (!dh.joined) 
			dh.InitializeLogin();
		else
			switch (data.cmd) {
				case 'chat':
					if (ChatValidation.ValTripNick(data))
						dh.HandleChat(data);
					break;

				case 'info':
					if (data.type === 'emote') {
						if (InfoValidation.ValEmoteNickTrip(data))
							dh.HandleEmote(data)
					}
					else if (data.type === 'whisper') {
						if (InfoValidation.ValWhisperNickTrip(data))
							dh.HandleWhisper(data);
					}
					else
						console.log(`System info: ${data.text}`)
					break;

				case 'warn':
					console.log(`warn: ${data.text}`);
					dh.HandleWarn(data);
					break;

				case 'onlineRemove': // when someone leaves
					dh.HandleLeave(data);
					break;

				case 'onlineAdd': // when someone joins
					dh.HandleJoin(data);
					break;
			}
	}
	catch (_) { console.log(_); }
}
