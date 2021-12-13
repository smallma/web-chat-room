<template>
  <div>
    <figure class="bg" />
    <!-- <img class="framework-logo" alt="Vue logo" src="./assets/logo.png" /> -->
    <transition>
      <StartPopup 
        v-if="step === 0"
        @joinChatRoom="updateLoginInfo"
      />
    </transition>
    
    <transition>
      <Chatroom 
        v-show="step === 1"
        :chatInfo="chatInfo" :userInfo="userInfo"
        :websocketsend="websocketsend"
      />
    </transition>
  </div>
</template>

<script lang="ts">
  // import Socket from "./utils/socket";
  import { computed } from "vue";
  import { mapMutations, mapState } from "vuex";
  import { mixinWebsocket } from './utils/ws';

  import StartPopup from '@comps/StartPopup.vue'
  import Chatroom from '@comps/Chatroom.vue'

  export default {
    mixins: [mixinWebsocket],
   
    components: {
      StartPopup,
      Chatroom
    },
    data() {
      return {
        chatInfo: [],
        userInfo: {},
        injectWsRes: [],
        injectUser: {},
        injectStep: 0,
      }
    },
    created() {
      this.initWebsocket()
      // const wsUrl = process.env.VUE_APP_WS_URL;
      // const socket = new WebSocket(wsUrl);
      // const that = this;
      // socket.onmessage = function(msg) {
      //   console.log(msg);
      //   that.handleGetMessage(msg.data);
      // };
      // Socket.$on("message", this.handleGetMessage);

      // console.log('@@@@@$store: ', this.ws);
    },
    destroy(){
      this.websocketclose();
    },
    beforeDestroy() {
      // Socket.$off("message", this.handleGetMessage);
    },
    mounted() {
     
    },
    methods: {
      ...mapMutations({
        nextStep: "step/nextStep",
        setUser: "user/setUser",
      }),

      // ...mapMutations({
      //   setWsRes: "ws/setWsRes",
      // }),
      // handleGetMessage(msg) {
      //   this.setWsRes(JSON.parse(msg));
      // },
      updateLoginInfo: function(loginInfo: loginInfo) {
        console.log('updateLoginInfo: ', loginInfo);
        this.userInfo = loginInfo;

        const broadcastMsg = {
          type: 1,
          nickname: loginInfo.nickname,
          selectAvatarId: loginInfo.selectAvatarId,
          uuid: loginInfo.uuid
        };

        this.websocketsend(JSON.stringify(broadcastMsg));
        this.setUser(loginInfo);
        this.nextStep();
      }
    },
    computed: {
      ...mapState('step', ['step']),
      ...mapState('ws', ['wsRes']),
      ...mapState('user', ['user']),
    },
    watch: {
      step: function (newValue: number, oldValue: number) {
        // console.log('newValue, oldValue: ', newValue, oldValue);
      },
      wsRes: {
        handler: function(newValue:state, oldValue:state) {
          // console.log('!!!!!!! wsRes - newValue, oldValue: ', newValue, oldValue, this.wsRes);
          this.injectWsRes = [...this.wsRes];
        },
        deep: true,
        immediate: true
      },
      user: {
        handler: function(newValue:any, oldValue:any) {
          // this.injectUser = {
          //   uuid: this.user.uuid,
          //   nickname: this.user.nickname,
          //   selectAvatarId: this.user.selectAvatarId,
          // };

          this.injectUser = newValue;
          console.log('!!!!!!! User - newValue, oldValue: ', newValue, oldValue, this.injectUser);
        },
        deep: true,
        immediate: true
      }
    },
    provide() {
      return {
        step: computed(()=> this.step),
        injectWsRes: computed(()=> this.injectWsRes),
        injectUser: computed(()=> this.injectUser),
      }
    }
    // provide: function() {
    //   return {
        

    //     step: this.step,
    //     ws: this.wsRes,
    //     user: this.user
    //   }
    // }
  }

</script>


<style lang="scss">
.framework-logo {
  position: absolute;
  left: 13px;
  width: 170px;
  height: 170px;
}

#app {
  position: relative;
  min-height: 100%;
  overflow: hidden;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vw;
    background: url(https://images.unsplash.com/photo-1451186859696-371d9477be93?crop=entropy&fit=crop&fm=jpg&h=975&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1925) no-repeat 0 0;
    transform: scale(1.2);
    filter: blur(80px);
  }
}

html,
body {
  position: relative;
  margin: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}

figure {
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
}

.v-leave {
  opacity: 1;
}

.v-leave-active {
  transition: opacity 0.5s;
}

.v-leave-to {
  opacity: 0;
}

.v-enter {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 0.5s;
}

.v-enter-to {
  opacity: 1;
}
</style>
