<template>
  <div>
    <figure class="bg" />
    <transition>
      <StartPopup 
        v-if="injectStep === 0"
        @joinChatRoom="updateLoginInfo"
      />
    </transition>
    
    <transition>
      <Chatroom 
        v-show="injectStep === 1"
      />
    </transition>
  </div>
</template>

<script lang="ts">
  import { computed } from "vue";
  import mixinWebsocket from './utils/ws';

  import StartPopup from './components/StartPopup.vue'
  import Chatroom from './components/Chatroom.vue'

  export default {
    components: {
      StartPopup,
      Chatroom
    },
    data() {
      return {
        wsRes: [],
        chatInfo: [],
        userInfo: {},
        injectWsRes: [],
        injectUser: {},
        injectStep: 0,
      }
    },
    created() {
      mixinWebsocket.initWebsocket((msg:receiveMsgData) => {
        this.setWsRes(msg)
      })
    },
    methods: {
      sendMsg: function(broadcastMsg:preSendMsg) {
        mixinWebsocket.websocketsend(JSON.stringify(broadcastMsg));
      },
      updateLoginInfo: function(loginInfo: loginInfo) {
        this.userInfo = loginInfo;

        const broadcastMsg = {
          type: 1,
          nickname: loginInfo.nickname,
          selectAvatarId: loginInfo.selectAvatarId,
          uuid: loginInfo.uuid
        };

        this.injectUser = loginInfo;
        this.injectStep = 1;
        this.sendMsg(broadcastMsg);
      },
      setWsRes: function(receiveMsgData:receiveMsgData) {
        this.injectWsRes.push(receiveMsgData);
      }
    },
    provide() {
      return {
        injectStep: computed(()=> this.injectStep),
        injectWsRes: computed(()=> this.injectWsRes),
        injectUser: computed(()=> this.injectUser),
        mixinWebsocket: mixinWebsocket,
      }
    }
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
