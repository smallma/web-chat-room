import { ref, computed } from "vue";

interface receiveMsgData {
  type: number;
  msgid: number;
  uuid: string;
  date: string;
  msg: string;
  users: Array<string>;
  selectAvatarId: number;
  nickname: string;
}


const wsURL:string = process.env.VUE_APP_WS_URL || 'ws://localhost:8001';
let ws:any;

function websocketonopen():void {
  console.log('ws connecting');
}

function websocketonerror(e:any):void {
  console.error('ws connect failed, error: ', e);
}

// function websocketonmessage(receiveMsg:any):void {
//   const msg:receiveMsgData = JSON.parse(receiveMsg.data);
//   this.setWsRes(msg);
// }

function websocketsend(msg:string):void {
  ws.send(msg);
}

function websocketclose():void {
  console.log('ws close connection')
}

function initWebsocket(cb:any):void {
  ws = new WebSocket(wsURL);
  ws.onopen = websocketonopen;
  ws.onerror = websocketonerror;
  ws.onmessage = function (receiveMsg:any) {
    const msg:receiveMsgData = JSON.parse(receiveMsg.data);
    if (typeof cb === 'function') {
      cb(msg);
    }
  };
  ws.onclose = websocketclose;
}
export default {
  initWebsocket,
  websocketsend,
  websocketclose,
}