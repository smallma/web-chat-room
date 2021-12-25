import * as WebSocket from 'ws';
import { pipe } from 'fp-ts/function';
import { isRight } from 'fp-ts/Either';
import * as J from 'fp-ts/Json';

type userType = { nickname: string };
const Users:userType[] = [];
interface jsonMsg {
  type: number;
  nickname: string;
  msg?: string;
  selectAvatarId: number;
  uuid: string;
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

interface emptyDict {
}

function getDate():string {
  const date = new Date();
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function handleBroadcastMsg(wss: any, msg: string):void {
  wss.clients.forEach((client:any) => {
    client.send(msg);
  });
}

function handleTypeJoinMsg(jsonMsg:jsonMsg):broadcastMsg {
  const getTime = new Date().getTime();
  Users.push({
    nickname: jsonMsg.nickname,
  });

  const broadcastMsg:broadcastMsg = {
    type: 1,
    msgid: getTime,
    uuid: jsonMsg.uuid,
    date: getDate(),
    msg: `${jsonMsg.nickname} join chat room`,
    users: Users,
    selectAvatarId: jsonMsg.selectAvatarId,
    nickname: jsonMsg.nickname,
  };

  return broadcastMsg;
}

function handleTypeChatMsg(jsonMsg:jsonMsg):broadcastMsg {
  const getTime = new Date().getTime();

  const broadcastMsg:broadcastMsg = {
    type: 2,
    msgid: getTime,
    uuid: jsonMsg.uuid,
    date: getDate(),
    msg: jsonMsg.msg,
    users: Users,
    selectAvatarId: jsonMsg.selectAvatarId,
    nickname: jsonMsg.nickname,
  };

  return broadcastMsg;
}

function handlReceiveMsg(jsonMsg: jsonMsg):broadcastMsg {
  const msgType:number = jsonMsg.type;
  let broadcastMsg:broadcastMsg|{} = {};
  switch (msgType) {
    case 1:
      broadcastMsg = handleTypeJoinMsg(jsonMsg);
      break;
    case 2:
      broadcastMsg = handleTypeChatMsg(jsonMsg);
      break;
    default:
      // console.log('out of options');
      break;
  }

  return broadcastMsg;
}

function createWs(port:number):any {
  const wss = new WebSocket.WebSocketServer({ port });
  wss.on('error', (): void => {
    wss.close();
  });

  return wss;
}

function handleWssOpen(wss:WebSocket):WebSocket {
  wss.on('open', (): void => {
    console.log('Server connected');
  });

  return wss;
}

function handleWssClose(wss:WebSocket):WebSocket {
  wss.on('close', (): void => {
    console.log('Server disconnected');
  });

  return wss;
}

function transferToJsonMsg(reveiveData:string):jsonMsg|void {
  if (!isRight(J.parse(reveiveData))) { return; }

  const jsonMsg:jsonMsg = JSON.parse(reveiveData);

  return jsonMsg;
}

function handleWssConnection(wss:WebSocket):void {
  wss.on('connection', (ws: WebSocket): void => {
    ws.on('message', (reveiveData: string) => {
      const jsonMsg = transferToJsonMsg(reveiveData);

      if (jsonMsg) {
        const broadcastMsg: broadcastMsg | emptyDict = handlReceiveMsg(jsonMsg);
        const stringMsg: string = JSON.stringify(broadcastMsg);
        handleBroadcastMsg(wss, stringMsg);
      }
    });
  });
}

function main(): void {
  pipe(
    createWs(8001),
    handleWssOpen,
    handleWssClose,
    handleWssConnection,
  );
}

main();

export {
  getDate,
  handleBroadcastMsg,
  handleTypeJoinMsg,
  handleTypeChatMsg,
  handlReceiveMsg,
  // createWs,
  // handleWssOpen,
  // handleWssClose,
  transferToJsonMsg,
  // handleWssConnection,
};
