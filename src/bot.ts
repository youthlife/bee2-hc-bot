import WebSocket = require('ws');
import { creds } from './config/creds'
import { ChatValidation } from './tools/chat';
import { InfoValidation } from './tools/info'
import IncomingDataHandler from './controllers/IncomingDataHandler';

const ws: WebSocket = new WebSocket('wss://hack.chat/chat-ws');
const dh = new IncomingDataHandler(ws);

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
		if (dh.iJoin) {
			dh.iJoin = false;
			dh.InitializeLogin();
		}
		switch (data.cmd) {
			case 'chat':
				// dh.tSent++;
				if (ChatValidation.ValTripNick(data))
					dh.HandleChat(data);
				break;
			case 'info':
				if (data.type === 'emote') {
					if (InfoValidation.ValEmoteNickTrip(data)) {
						dh.HandleEmote(data)
					}
				}
				else if (data.type === 'whisper') {
					if (InfoValidation.ValWhisperNickTrip(data))
						dh.HandleWhisper(data)
				}
				// System
				else { console.log(`System info: ${data.text}`) }
				break;
			case 'warn':
				console.log(`warn: ${data.text}`);
				dh.HandleWarn(data);
			case 'onlineRemove':
				break;
			case 'onlineAdd':
				break;

		}
	}
	catch (_) { console.log(_); }
}
