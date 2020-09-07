<template>
  <div class="write">
    <van-search
      v-model="value"
      show-action
      placeholder="写评论"
      @search="onSearch"
      left-icon="false"
      size="small"
      background="#ccc"
    >
      <template #action>
        <van-button @click="onSearch(value)" type="primary">发送</van-button>
      </template>
    </van-search>
  </div>
</template>

<script>
import { apiAddComment, apiAddCommentReply } from '@/api/comment.js'
export default {
  props: ['isReply', 'commid'],
  data () {
    return {
      value: ''
    }
  },
  methods: {
    async onSearch (value) {
      var res
      if (this.isReply === false) {
        console.log('添加文章的评论')
        res = await apiAddComment({
          artid: this.$route.params.artid,
          content: value
        })
      } else {
        console.log('添加评论的回复')
        res = await apiAddCommentReply({
          commid: this.commid,
          content: value,
          artid: this.$route.params.artid
        })
      }

      const newObj = res.data.data.new_obj
      // 接受返回的数据渲染到write的父组件detail组件中
      this.$emit('addcomment', newObj)
      // 清除输入框
      this.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.write {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
