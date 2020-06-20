export interface IChat {
    nick: string,
    text: string,
    trip: string,
    time: number
}
export interface IWhisper {
    from: string,
    trip: string,
    text: string
    utype: string,
    time: number
}
export interface IEmote {
    nick: string,
    text: string,
    trip: string,
    time: number
}
export interface IJoin {
    // // nick: string,
    // // trip: string,
    // // hash: string,
    // // time: number

    cmd: string,
    nick: string,
    trip: string,
    hash: string,
    utype: string,
    level: string,
    userid: string,
    channel: string,
    time: number
}
export interface ILeave {
    nick: string,
    time: number
}