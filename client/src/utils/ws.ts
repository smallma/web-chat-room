import { ref, computed } from "vue";

interface user {
  nickname: string;
}
interface receiveMsgData {
  type: number;
  msgid: number;
  uuid: string;
  date: string;
  msg: string;
  users: Array<user>;
  selectAvatarId: number;
  nickname: string;
}
interface receiveMsg {
  data: string;
  [propName: string]: any;
}

const wsURL:string = process.env.VUE_APP_WS_URL || 'ws://localhost:8001';
let ws:WebSocket;
let testValue:string;

function websocketsend(msg:string):void {
  ws.send(msg);
}

function websockemessage(receiveMsg:receiveMsg, cb:(msg:receiveMsgData) => void):void {
  const msg:receiveMsgData = JSON.parse(receiveMsg.data);
  if (typeof cb === 'function') {
    cb(msg);
  }
}

function initWebsocket(cb:(msg:receiveMsgData)=>void):void {
  ws = new WebSocket(wsURL);
  
  ws.onopen = function(event: Event):void {
    console.log('ws connecting: ', event);
  };
  
  ws.onerror = function(event:Event):void {
    console.error('ws connect failed, error');
  };
  
  ws.onmessage = function(receiveMsg:receiveMsg):void {
    websockemessage(receiveMsg, cb);
  };
  
  ws.onclose = function(event: Event):void {
    console.log('ws close connection');
  };
}
export default {
  initWebsocket,
  websockemessage,
  websocketsend
}