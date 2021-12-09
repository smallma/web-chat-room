// const WebSocket = require('ws');
import { WebSocketServer, OPEN } from 'ws';
const moment = require("moment");

type userType = { nickname: string };
let Users:userType[] = [];

interface jsonMsg {
  [propName: string]: any;
}

interface user {
  nickname: string;
}
interface broadcastMsg {
  type?: number;
  msgid?: number;
  uuid?: string;
  date?: string;
  msg?: string;
  users?: Array<user>;
  selectAvatarId?: number;
  nickname?: string;
}

function getDate():string {
  return moment().format('HH:mm')
}

function handleServerOpen(event: any): void {
  console.log('connected');
}

function handleServerError(event: any): void {
  console.log('error: ', event.message);
}

function handleServerClose(event: any): void {
  console.log('disconnected');
}

function handleBroadcastMsg(server: any, msg: string):void {
  server.clients.forEach(function each(client: any) {
    // if (client.readyState === OPEN) {
    client.send(msg);
    // }
  });
}

function handleType1Msg(jsonMsg: jsonMsg):any {
  const getTime = new Date().getTime();
  Users.push({
    nickname: jsonMsg.nickname,
  });

  const broadcastMsg:broadcastMsg = {
    type: 1,
    msgid: getTime,
    uuid: jsonMsg.uuid,
    date: getDate(),
    msg: jsonMsg.nickname + ' join chat room',
    users: Users,
    selectAvatarId: jsonMsg.selectAvatarId,
    nickname: jsonMsg.nickname
  };
  
  return broadcastMsg;
}

function handleType2Msg(jsonMsg: jsonMsg):any {
  const getTime = new Date().getTime();

  const broadcastMsg:broadcastMsg = {
    type: 2,
    msgid: getTime,
    uuid: jsonMsg.uuid,
    date: getDate(),
    msg: jsonMsg.msg,
    users: Users,
    selectAvatarId: jsonMsg.selectAvatarId,
    nickname: jsonMsg.nickname
  };

  return broadcastMsg;
}


function handlReceiveMsg(server: any, jsonMsg: jsonMsg):void {
  const getTime:number = new Date().getTime();
  const msgType:number = jsonMsg.type;
  let broadcastMsg:broadcastMsg = {};
  switch(msgType) {
    case 1:
      broadcastMsg = handleType1Msg(jsonMsg);
      break;
    case 2:
      broadcastMsg = handleType2Msg(jsonMsg);
      break;
    default:
      console.log('out of options');
  }

  if (!broadcastMsg) { return; }
  console.log('broadcastMsg: ', broadcastMsg);
  handleBroadcastMsg(server, JSON.stringify(broadcastMsg));
}

function createWs(port: number):any {
  const wss = new WebSocketServer({ port: port });
  wss.on('error', function(event: any) {
    console.log('Server error: ', event.message);
    wss.close();
  });
  return wss;
}

function main(): void {
  const port:number = 8001;
  const wss:any = createWs(port);
  wss.on('open', handleServerOpen);
  wss.on('close', handleServerClose);
  wss.on('connection', function connection(ws:any) {
    ws.on('message', function message(data:any) {
      const jsonMsg:jsonMsg = JSON.parse(data);
      console.log(jsonMsg);
      handlReceiveMsg(wss, jsonMsg);
    });
  });
}

main();