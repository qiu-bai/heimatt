<template>
  <div class="reply">
    <van-popup v-model="show" position="bottom" :style="{ height: '70%' }">
      <!-- 当前评论 -->
      <van-cell :isReply="true" title="当前评论"></van-cell>
      <comment :item="currentItem" />
      <!-- 评论回复 -->
      <van-cell :isReply="true" title="评论的回复"></van-cell>
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onload"
        finished-text="我是有底线的"
      >
        <comment :item="item" v-for="(item, index) in replyList" :key="index" />
      </van-list>
      <write
        @addcomment="addcomment"
        :commid="currentItem.com_id"
        :isReply="true"
      />
    </van-popup>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import comment from './comment'
import write from './write'
import { apiGetCommentReply } from '@/api/comment.js'
export default {
  data () {
    return {
      show: false,
      currentItem: {},
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      enid: 0,
      replyList: []
    }
  },
  methods: {
    addcomment (newObj) {
      this.replyList.unshift(newObj)
    },
    async onload () {
      const res = await apiGetCommentReply({
        commid: this.currentItem.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      // 保存数据
      this.replyList = [...this.replyList, ...res.data.data.results]
      this.offset = res.data.data.last_id
      this.enid = res.data.data.end_id
      this.loading = false
      if (this.enid === this.offset) {
        this.finished = true
      }
    }
  },
  components: {
    comment,
    write
  },
  created () {
    bus.$on('passitem', item => {
      this.loading = false
      this.finished = false
      this.offset = null
      this.enid = 0
      this.replyList = []
      this.currentItem = item
    })
  }
}
</script>

<style></style>
