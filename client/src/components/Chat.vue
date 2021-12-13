<template>
  <div 
    class="chat"
    v-bind:class="{mine:user.uuid == chat.uuid, 'is-join':chat.type == 1}"
  >
    <div class="chat-avatar">
        <Avatar 
          :key="chat.msgid"
          :data-id="chat.msgid"
          :index="chat.selectAvatarId"
        />
    </div>
    <div class="chat-content">
      <div class="content-msg"> {{ chat.msg }} </div>
      <div class="content-date"> {{ chat.date }} </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Avatar from './Avatar.vue'
  import { mapState } from "vuex";

  export default {
    components: {
      Avatar
    },
    props: {
      chat: {
        type: Object,
        required: true
      },
      user: {
        type: Object,
        required: true
      }
    },
    methods: {
      
    },
    computed: {
      // ...mapState('user', ['user']),
    },
    mounted() {
      // console.log('uuid: ', this.user.uuid);
    },
  }
</script>

<style lang="scss" scoped>

.chat {
  display: block;
  position: relative;
  min-height: 60px;
  margin-bottom: 30px;

  .chat-avatar {
    position: absolute;
    top: 0;
    left: 0;
  }

  .chat-content {
    position: relative;
    margin-left: 74px;

    .content-msg {
      display: inline-block;
      position: relative;
      margin: 8px 0 2px;
      padding: 6px 10px 7px;
      color: #fff;
      font-size: 17px;
      border-radius: 10px 10px 10px 0;
      background: rgba(0, 0, 0, 0.3);
      line-height: 1.4;
      text-shadow: 0 1px 1px rgb(0 0 0 / 20%);
    }

    .content-date {
      display: block;
      position: relative;
      color: #afafaf;
      font-size: 12px;
    }
  }

  &.mine {
    text-align: right;

    .chat-avatar {
      right: 0;
      left: unset;
    }

    .chat-content {
      position: relative;
      margin-right: 74px;
      margin-left: unset;

      .content-msg {
        border-radius: 10px 10px 0;
      }

      .content-date {
      }
    }
  }

  &.is-join {
    text-align: center;

    .chat-avatar {
      display: none;
      left: unset;
    }

    .chat-content {
      position: relative;
      margin-right: unset;
      margin-left: unset;

      .content-msg {
        border-radius: 10px;
      }

      .content-date {
      }
    }
  }
}

</style>