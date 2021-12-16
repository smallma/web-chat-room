// import { getCurrentInstance } from 'vue'

import { mapMutations } from 'vuex';
// interface user {
//   nickname: string;
// }
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

export const mixinWebsocket = {
  data(){
    return{
      ws: {}
    }
  },

  // data: () => ({
  //   ws: {}
  // }),

  methods:{
    ...mapMutations({
      setWsRes: "ws/setWsRes",
    }),

    initWebsocket(){
      let wsURL:string = process.env.VUE_APP_WS_URL || 'ws://localhost:8001';
      const wsContainer = new WebSocket(wsURL);
      wsContainer.onopen = this.websocketonopen;
      wsContainer.onerror = this.websocketonerror;
      wsContainer.onmessage = this.websocketonmessage;
      wsContainer.onclose = this.websocketclose;

      // console.log(this.ws, wsContainer);
      this.ws = wsContainer;
      // Vue.prototype.$ws = ws;
      // const app = getCurrentInstance()
      // app.appContext.config.globalProperties.$ws = ws
    },
    websocketonopen(){
      console.log('ws connecting');
    },
    websocketonerror(e:any){
      console.error('ws connect failed, error: ', e);
    },
    websocketonmessage(receiveMsg:any){
      // console.log('receiveMsg:' , receiveMsg.data)
      const msg:receiveMsgData = JSON.parse(receiveMsg.data);
      this.setWsRes(msg);
      // console.log('msg: ', msg);
    },
    websocketsend(msg:string){
      // console.log('send data: ', msg);

      this.wsContainer.send(msg);
      // Vue.prototype.$ws.send(msg);
      // const app = getCurrentInstance()
      // app.appContext.config.globalProperties.$ws.send(msg);
    },
    websocketclose(){
      console.log('ws close connection')
    }
  }
}