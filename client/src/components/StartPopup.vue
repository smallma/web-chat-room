<script setup lang="ts">
    import Avatar from './Avatar.vue'
</script>

<template>
  <div class="start_popup">
    <div class="start-hint">
      <span class="hint-title">Web Chat Room</span>
      <span class="hint-info">Welcome! Please choose a avatar and username.</span>
    </div>

    <div class="start-container">
      <div class="start-nickname">
        <input v-model="nickname" placeholder="Nickname">
      </div>

      <div class="start-avatars">
        <Avatar 
          v-for="avatarIndex in avatarCount"
          :index="avatarIndex"
          :key="avatarIndex"
          @click="clickAvatar"
          :data-id="avatarIndex"
          :currentSelectIndex="selectAvatarId"
        />
      </div>

      <div class="start-join" @click="clickJoin">
        <span>Join</span>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        avatarCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        selectAvatarId: 1,
        uuid: Math.floor(new Date().getTime()) + '-' +  Math.floor(Math.random() * 100000),
        nickname: 'Nickname'
      };
    },
    methods: {
      clickAvatar: function(event: any){
        const selectId = event.target.getAttribute('data-id');
        this.selectAvatarId = parseInt(selectId);
      },
      clickJoin: function(event: any){
        const joinInfo = {
          nickname: this.nickname,
          uuid: this.uuid,
          selectAvatarId: this.selectAvatarId
        };

        console.log('joinInfo: ', joinInfo);
        this.$emit('joinChatRoom', joinInfo);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .start_popup {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70vw;
    background-color: rgba(255, 255, 255, 0.6);
    transform: translate3d(-50%, -50%, 0);

    .start-hint {
      position: absolute;
      z-index: 1000;
      top: 50%;
      padding: 70px 30px;
      width: 300px;
      color: #333;
      font-size: 26px;
      text-align: left;
      border-radius: 6px;
      background: #f7f7f7;
      transform: translateY(-50%);
      box-shadow: 10px 6px 13px #999;

      .hint-title {
        display: block;
        position: relative;
        color: #000;
        font-size: 37px;
      }

      .hint-info {
        display: block;
        position: relative;
        margin-top: 10px;
        color: #999;
        font-size: 16px;
      }
    
    }

    .start-container {
      position: relative;
      left: 300px;
      padding: 30px 0;
      width: 70%;
      text-align: center;
      background: #474a59;

      .start-avatars {
        position: relative;
        cursor: pointer;
        margin-right: auto;
        margin-left: auto;
        padding: 30px;
        max-width: 530px;
        text-align: center;

        :deep .avatar {
          display: inline-block;
          position: relative;
          margin: 10px;
          box-sizing: border-box;
          border: 2px solid transparent;
          transition: all 300ms;
          filter: grayscale(1);

          &.active {
            border: 2px solid #777;
            filter: grayscale(0);
          }

          .avatar-img {
            pointer-events: none;
          }
        }
      }

      .start-nickname {
        input {
          display: block;
          margin: 0 auto 10px;
          padding: 10px 15px;
          width: 250px;
          color: #333;
          font-size: 18px;
          font-weight: 300;
          text-align: center;
          outline: 0;
          border: 1px solid #d6d6d6;
          border-radius: 3px;
          background-color: #dadada;
          appearance: none;
          transition-duration: 0.25s;

          &:hover {
            background-color: #bababa;
          }

          &:focus {
            width: 300px;
            color: #fff;
            background-color: #3d3d3d;
          }
        }
      }

      .start-join {
        display: inline-block;
        position: relative;
        cursor: pointer;
        padding: 7px 60px;
        color: #333;
        font-size: 18px;
        border: 1px solid #7f7f7f;
        border-radius: 55px;
        background-color: #fff;
        transition: all 300ms;

        &:hover {
          color: #fff;
          border-color: #4f4f4f;
          background-color: #2d2d2d;
        }
      }

      
    
    }

    
  }
</style>