// const WebSocket = require('ws');
import { WebSocketServer, OPEN } from 'ws';
const moment = require("moment");

type userType = { nickname: string };
let Users:userType[] = [];

function getDate():string {
  return moment().format('HH:mm')
}

function handleServerOpen(event: any): void {
  console.log('connected');
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

function handleType1Msg(jsonMsg: any):any {
  const getTime = new Date().getTime();
  Users.push({
    nickname: jsonMsg.nickname,
  });

  const broadcastMsg = {
    type: 1,
    msgid: getTime,
    date: getDate(),
    msg: jsonMsg.nickname + ' join chat room',
    users: Users,
    nickname: jsonMsg.nickname
  };
  
  return broadcastMsg;
}

function handleType2Msg(jsonMsg: any):any {
  const getTime = new Date().getTime();

  const broadcastMsg = {
    type: 2,
    msgid: getTime,
    date: getDate(),
    msg: jsonMsg.msg,
    users: Users,
    nickname: jsonMsg.nickname
  };

  return broadcastMsg;
}

function handlReceiveMsg(server: any, jsonMsg: any):void {
  const getTime = new Date().getTime();
  const msgType:number = jsonMsg.type;
  let broadcastMsg:any = {};
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

  console.log('broadcastMsg: ', broadcastMsg);

  handleBroadcastMsg(server, JSON.stringify(broadcastMsg));
}

function createWs(port: number):any {
  return new WebSocketServer({ port: port });
}

function main(): void {
  const port = 8001;
  const wss = createWs(port);
  wss.on('open', handleServerOpen);
  wss.on('close', handleServerClose);
  wss.on('connection', function connection(ws:any) {
    ws.on('message', function message(data:any) {
      const jsonMsg = JSON.parse(data);
      console.log(jsonMsg);

      handlReceiveMsg(wss, jsonMsg);
    });
  });
}

main();