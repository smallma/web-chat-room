import { mapMutations } from 'vuex';

export const mixinWebsocket = {
  data(){
    return{
    }
  },
  methods:{
    initWebsocket(){
      
    },
    websocketonopen(){
    },
    websocketonerror(e:any){
    },
    websocketonmessage(receiveMsg:any){
      
    },
    websocketsend(msg:string){
    },
    websocketclose(){
    }
  }
}