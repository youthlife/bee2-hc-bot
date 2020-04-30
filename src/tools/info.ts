import { IWhisper, IEmote } from "../interfaces/datahandle";
import { creds } from "../config/creds";

export namespace InfoValidation {
    export function ValEmoteNickTrip(data: IWhisper): boolean {
        return data.trip !== creds.trip;
    }
    export function ValWhisperNickTrip(data: IEmote): boolean {
        return data.nick !== creds.nick && data.trip !== creds.trip;
    }
}