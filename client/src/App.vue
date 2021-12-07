<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
  import StartPopup from './components/StartPopup.vue'
  import Chatroom from './components/Chatroom.vue'

</script>

<script lang="ts">
  // import Socket from "./utils/socket";
  import { mapMutations } from "vuex";

  export default {
    data() {
      return {
        chatInfo: [],
        userInfo: {}
      }
    },
    created() {
      const wsUrl = process.env.VUE_APP_WS_URL;
      const socket = new WebSocket(wsUrl);
      const that = this;
      socket.onmessage = function(msg) {
        console.log(msg);
        that.handleGetMessage(msg.data);
      };
      // Socket.$on("message", this.handleGetMessage);
    },
    beforeDestroy() {
      // Socket.$off("message", this.handleGetMessage);
    },
    methods: {
      ...mapMutations({
        setWsRes: "ws/setWsRes",
      }),
      handleGetMessage(msg) {
        this.setWsRes(JSON.parse(msg));
      },
      updateLoginInfo: function(info: any) {
        console.log('updateLoginInfo', info);
        this.userInfo = info;
        return;
      }
    }
  }

</script>

<template>
  <div>
    <img class="framework-logo" alt="Vue logo" src="./assets/logo.png" />
    <StartPopup 
      @joinChatRoom="updateLoginInfo"
    />

    <Chatroom :chatInfo="chatInfo" :userInfo="userInfo"/>
  </div>
</template>


<style>
.framework-logo {
  position: absolute;
  left: 13px;
  width: 170px;
  height: 170px;
}

#app {
  position: relative;
  min-height: 100%;
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
</style>
