import { createApp } from 'vue'
import App from "./App.vue";


declare interface chatroomData {
  msg: string;
};

interface user {
  nickname: string;
}
declare interface receiveMsgData {
  type: number;
  msgid: number;
  uuid: string;
  date: string;
  msg: string;
  users: Array<user>;
  selectAvatarId: number;
  nickname: string;
}
declare interface state {
  wsRes: Array<receiveMsgData>;
}
declare interface sendingMsg {
  type: number;
  msg: string;
  nickname: string;
  selectAvatarId: number;
  uuid: string;
}
interface loginInfo {
  nickname: string;
  uuid: number;
  selectAvatarId: number;
};

declare interface startPopupData {
  avatarCount: Array<number>;
  selectAvatarId: number;
  uuid: string;
  nickname: string;
};


const app = createApp(App);
app.config.unwrapInjectedRef = true;
app.mount("#app");