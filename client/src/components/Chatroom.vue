<template>
  <div class="chatroom">
    <div class="chatroom-chats">
      <div class="chats-container">
        <Chat 
          v-for="chat in transWsRes"
          :chat="chat"
          :key="chat.msgid"
          :user="transUser"
        />
      </div>
    </div>
    <div class="chatroom-send">
      <div class="send-text" v-on:keyup.enter="clickSend">
        <input 
          type= "text"
          v-model.trim="msg"
          placeholder="Say Hello!"
          ref="inputText"
          data-test="msg"
        >
      </div>

      <div class="send-btn" @click="clickSend" data-test="button">
        <span class="btn-text">Send</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { inject } from "vue";
  import Chat from './Chat.vue'
  // import { mapState } from "vuex";
  // import { mixinWebsocket } from '@utils/ws';

  // declare interface chatroomData {
  //   msg: string;
  // };

  // interface receiveMsgData {
  //   type: number;
  //   msgid: number;
  //   uuid: string;
  //   date: string;
  //   msg: string;
  //   users: Array<string>;
  //   selectAvatarId: number;
  //   nickname: string;
  // }

  // interface sendingMsg {
  //   type: number;
  //   msg: string;
  //   nickname: string;
  //   selectAvatarId: number;
  //   uuid: string;
  // }

  // interface state {
  //   wsRes: Array<receiveMsgData>;
  // }

  export default {
    // mixins: [mixinWebsocket],
    inject: ['injectWsRes', 'injectUser'],
    components: {
      Chat
    },
    props: {
      websocketsend: {
        type: Function,
        required: true
      }
    },
    data(): chatroomData {
      return {
        msg: '',
        transWsRes: [],
        transUser: {},
      }
    },
    mounted() {
      console.log('$wsRes: ', this.injectWsRes);
    },
    // computed: {
    //   ...mapState('ws', ['wsRes']),
    //   ...mapState('user', ['user']),
    // },
    watch: {
      // wsRes: {
      //   handler: function(newValue:state, oldValue:state) {
      //     console.log('!!!!!!! wsRes - newValue, oldValue: ', newValue, oldValue);

      //     this.$nextTick(function () {
      //       const container = this.$el.querySelector(".chats-container");
      //       container.scrollTop = container.scrollHeight;
      //       this.$refs.inputText.focus();
      //     });
      //   },
      //   deep: true,
      //   immediate: true
      // }
      injectWsRes: {
        handler: function (new_value, old_value) {
          // console.log('new client: ', new_value);

          this.transWsRes = JSON.parse(JSON.stringify(new_value.value));
          // console.log('new injectWsRes transWsRes: ', this.transWsRes);
          this.$nextTick(function () {
            const container = this.$el.querySelector(".chats-container");
            container.scrollTop = container.scrollHeight;
            this.$refs.inputText.focus();
          });
        },
        deep: true
      },
      injectUser: {
        handler: function (new_value, old_value) {
          this.transUser = JSON.parse(JSON.stringify(this.injectUser.value));
          // console.log('new injectUser this.injectUser: ', this.injectUser);
          // console.log('new injectUser this.transUser: ', _transUser.nickname);
          // console.log('new injectUser new_value: ', new_value);

          // this.transUser = {
          //   uuid: _transUser.uuid,
          //   selectAvatarId: _transUser.selectAvatarId,
          //   nickname: _transUser.nickname,
          // }

          console.log('this.transUser: ', this.transUser);
        },
        deep: true
      },

      // ws: {
      //   handler: function(newValue:any, oldValue:any) {
      //     console.log('!!!!!!! chatroom wsRes - newValue, oldValue: ', newValue, oldValue);
      //     console.log('!!!!!!! chatroom wsRes - target: ', this.ws);

      //     this.$nextTick(function () {
      //       const container = this.$el.querySelector(".chats-container");
      //       container.scrollTop = container.scrollHeight;
      //       this.$refs.inputText.focus();
      //     });
      //   },
      //   deep: true,
      //   immediate: true
      // }
      
    },
    methods: {
      clickSend: function(event: any){
        if (!this.msg) { return; }

        const sendingMsg:sendingMsg = {
          type: 2,
          msg: this.msg,
          nickname: this.transUser.nickname,
          selectAvatarId: this.transUser.selectAvatarId,
          uuid: this.transUser.uuid
        };

        this.websocketsend(JSON.stringify(sendingMsg));
        this.msg = ''; 
      }
    }
  }
</script>

<style lang="scss" scoped>
.chatroom {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  justify-content: space-between;
  width: 60vw;
  height: 70vh;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.5);
  transform: translate3d(-50%, -50%, 0);
  flex-direction: column;
  box-shadow: 0 5px 30px rgb(0 0 0 / 20%);

  .chatroom-chats,
  .chatroom-send {
    position: relative;
    box-sizing: border-box;
    width: 100%;
  }

  .chatroom-chats {
    flex: 1 1 auto;

    .chats-container {
      display: block;
      position: absolute;
      overflow-x: hidden;
      overflow-y: scroll;
      top: 0;
      left: 0;
      padding: 10px;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }
  }

  .chatroom-send {
    padding: 10px;
    border-radius: 0 0 20px 20px;
    background: rgba(0, 0, 0, 0.3);
    flex: 0 1 50px;

    .send-text {
      display: inline-block;
      position: relative;
      vertical-align: middle;
      width: calc(100% - 83px);

      input {
        margin: 0;
        padding-right: 20px;
        padding-left: 10px;
        height: 17px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 16px;
        outline: none !important;
        border: none;
        background: none;
      }
    }

    .send-btn {
      display: inline-block;
      position: relative;
      padding: 6px 10px;
      width: 50px;
      color: #fff;
      font-size: 13px;
      text-align: center;
      border-radius: 10px;
      background: #248a52;
      vertical-align: middle;
      line-height: 1;
    }
  }
}
</style>