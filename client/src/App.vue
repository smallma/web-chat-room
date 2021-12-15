<template>
  <div>
    <figure class="bg" />
    <!-- <img class="framework-logo" alt="Vue logo" src="./assets/logo.png" /> -->
    <transition>
      <StartPopup 
        v-if="injectStep === 0"
        @joinChatRoom="updateLoginInfo"
      />
    </transition>
    
    <transition>
      <Chatroom 
        v-show="injectStep === 1"
        :websocketsend="websocketsend"
      />
    </transition>
  </div>
</template>

<script lang="ts">
  // import Socket from "./utils/socket";
  import { computed } from "vue";
  import { mapState } from "vuex";
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
    },
    destroy(){
      this.websocketclose();
    },
    methods: {
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
        this.injectUser = loginInfo;
        this.injectStep = 1;
      }
    },
    computed: {
      ...mapState('ws', ['wsRes']),
    },
    watch: {
      wsRes: {
        handler: function(newValue:state, oldValue:state) {
          this.injectWsRes = [...this.wsRes];
        },
        deep: true,
        immediate: true
      },
    },
    provide() {
      return {
        injectStep: computed(()=> this.injectStep),
        injectWsRes: computed(()=> this.injectWsRes),
        injectUser: computed(()=> this.injectUser),
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
