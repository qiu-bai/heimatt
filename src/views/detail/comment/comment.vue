<template>
  <van-cell>
    <div class="comment">
      <div class="img">
        <img :src="item.aut_photo" alt="" />
      </div>
      <div class="content">
        <div class="anthname">{{ item.aut_name }}</div>
        <div class="text">{{ item.content }}</div>
        <div class="btns">
          <span class="time">{{ item.pubdate | fromtime }}</span>
          <span @click="openreply" v-if="isReply === false" class="reply"
            >回复 {{ item.reply_count }}</span
          >
        </div>
      </div>
      <div class="like"><van-icon name="like" /> {{ item.like_count }}</div>
    </div>
  </van-cell>
</template>

<script>
import bus from '@/utils/bus.js'
export default {
  props: ['item', 'isReply'],
  data () {
    return {}
  },
  methods: {
    // 打开回复
    openreply () {
      console.log('111')
      this.$parent.$parent.$refs.reply.show = true
      // 将item交给bus
      bus.$emit('passitem', this.item)
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  display: flex;
  .img {
    height: 50px;
    width: 50px;
    margin-right: 10px;
    img {
      height: 50px;
      width: 50px;
      border-radius: 25px;
    }
  }
  .content {
    flex: 1;
    .anthname {
      color: #0094ff;
    }
    .text {
      padding: 10px 15px;
    }
    .btns {
      .time {
        margin-right: 10px;
      }
      .reply {
        background-color: #ccc;
        padding: 4px 8px;
        border-radius: 15px;
      }
    }
  }
}
</style>
