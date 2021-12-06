<script setup lang="ts">
  import Chat from './Chat.vue'
</script>

<template>
  <div class="chatroom">
    <Chat 
      v-for="chat in chatInfo"
      :chat="chat"
      :key="history.id"
    />
  </div>
</template>

<script lang="ts">
  export default {
    props: {
      chatInfo: {
        type: Object,
        required: true
      },
      userInfo: {
        type: Object,
        required: true
      }
    },
    methods: {
      
    }
  }
</script>

<style lang="scss" scoped>
.chatroom {
  position: absolute;
}
</style>