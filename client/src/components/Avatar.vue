<template>
  <div class="avatar" v-bind:class="'avatar-' + index + ' ' + isActive()">
    <figure class="avatar-img" />
  </div>
</template>

<script lang="ts">
  export default {
    props: {
      index: {
        type: Number,
        required: true,
        default: 1
      },
      currentSelectIndex: {
        type: Number,
        required: false,
        default: 1
      }
    },
    methods: {
      isActive: function() {
        return this.currentSelectIndex === this.index ? 'active' : '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar {
    position: relative;
    overflow: hidden;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #d3e9f2;

    .avatar-img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 44px;
      height: 57px;
      transform: translate3d(-50%, -50%, 0);
      background-image: url('/avatar.jpg');
    }

    &.avatar-1 {
      .avatar-img {
        background-position: -36px -37px;
      }
    }

    &.avatar-2 {
      .avatar-img {
        background-position: -92px -37px;
      }
    }
    
    &.avatar-3 {
      .avatar-img {
        background-position: -148px -37px;
      }
    }

    &.avatar-4 {
      .avatar-img {
        background-position: -204px -37px;
      }
    }

    &.avatar-5 {
      .avatar-img {
        background-position: -262px -37px;
      }
    }

    &.avatar-6 {
      .avatar-img {
        background-position: -320px -37px;
      }
    }

    &.avatar-7 {
      .avatar-img {
        background-position: -36px -94px;
      }
    }

    &.avatar-8 {
      .avatar-img {
        background-position: -92px -94px;
      }
    }
    
    &.avatar-9 {
      .avatar-img {
        background-position: -148px -94px;
      }
    }

    &.avatar-10 {
      .avatar-img {
        background-position: -206px -94px;
      }
    }

    &.avatar-11 {
      .avatar-img {
        background-position: -262px -94px;
      }
    }

    &.avatar-12 {
      .avatar-img {
        background-position: -319px -94px;
      }
    }

    &.avatar-13 {
      .avatar-img {
        background-position: -36px -150px;
      }
    }

    &.avatar-14 {
      .avatar-img {
        background-position: -92px -150px;
      }
    }
    
    &.avatar-15 {
      .avatar-img {
        background-position: -148px -150px;
      }
    }

    &.avatar-16 {
      .avatar-img {
        background-position: -204px -150px;
      }
    }

    &.avatar-17 {
      .avatar-img {
        background-position: -263px -150px;
      }
    }

    &.avatar-18 {
      .avatar-img {
        background-position: -319px -150px;
      }
    }

    &.avatar-19 {
      .avatar-img {
        background-position: -36px -206px;
      }
    }

    &.avatar-20 {
      .avatar-img {
        background-position: -92px -206px;
      }
    }
    
    &.avatar-21 {
      .avatar-img {
        background-position: -148px -206px;
      }
    }

    &.avatar-22 {
      .avatar-img {
        background-position: -204px -206px;
      }
    }

    &.avatar-23 {
      .avatar-img {
        background-position: -262px -206px;
      }
    }

    &.avatar-24 {
      .avatar-img {
        background-position: -319px -206px;
      }
    }
  }
</style>