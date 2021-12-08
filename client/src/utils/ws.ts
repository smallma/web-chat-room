import { mapMutations } from 'vuex';

export const mixinWebsocket = {
  data(){
    return{
      ws: null,
    }
  },
  methods:{
    ...mapMutations({
      setWsRes: "ws/setWsRes",
    }),

    initWebsocket(){
      let wsURL = process.env.VUE_APP_WS_URL;
      this.ws = new WebSocket(wsURL);
      this.ws.onopen = this.websocketonopen;
      this.ws.error = this.websocketonerror;
      this.ws.onmessage = this.websocketonmessage;
      this.ws.onclose = this.websocketclose;
    },
    websocketonopen(){
      console.log('ws connecting');
    },
    websocketonerror(e:any){
      console.error('ws connect failed, error: ', e);
    },
    websocketonmessage(receiveMsg:string){
      console.log('receiveMsg:' , receiveMsg.data)
      const msg = JSON.parse(receiveMsg.data);
      this.setWsRes(msg);
      console.log('msg: ', msg);
    },
    websocketsend(msg:string){
      console.log('send data: ', msg);

      this.ws.send(msg);
    },
    websocketclose(){
      console.log('ws close connection')
    }
  }
}