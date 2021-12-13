import { createApp } from 'vue'
// import App from './App.vue'
import store from "@store";
import App from "./App.vue";


declare interface chatroomData {
  msg: string;
};

declare interface receiveMsgData {
  type: number;
  msgid: number;
  uuid: string;
  date: string;
  msg: string;
  users: Array<string>;
  selectAvatarId: number;
  nickname: string;
}

declare interface sendingMsg {
  type: number;
  msg: string;
  nickname: string;
  selectAvatarId: number;
  uuid: string;
}

declare interface state {
  wsRes: Array<receiveMsgData>;
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
app.use(store);
app.mount("#app");
