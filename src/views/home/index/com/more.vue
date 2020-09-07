<template>
  <van-popup v-model="show" class="more">
    <van-cell-group v-if="isReport === false">
      <van-cell @click="dislike" icon="fire" title="不感兴趣"></van-cell>
      <van-cell
        @click="isReport = true"
        icon="fire"
        title="反馈垃圾信息"
        is-link
      ></van-cell>
      <van-cell @click="blackAuthor" icon="fire" title="拉黑作者"></van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport = false" />
      <van-cell
        v-for="(item, index) in typeList"
        :key="index"
        :title="item.name"
        @click="reportArticle(item.type)"
      />
    </van-cell-group>
    {{ artid }}
  </van-popup>
</template>

<script>
import { apiDislike, apiReportArticle, apiBlackAuthor } from '@/api/article.js'
import { getLocal } from '@/utils/mylocal.js'
export default {
  props: ['artid', 'autid'],
  data () {
    return {
      show: false,
      typeList: [
        { type: 0, name: '其他问题' },
        { type: 1, name: '标题夸张' },
        { type: 2, name: '低俗色情' },
        { type: 3, name: '错别字多' },
        { type: 4, name: '旧闻重复' },
        { type: 5, name: '广告软文' },
        { type: 6, name: '内容不实' },
        { type: 7, name: '涉嫌违法犯罪' },
        { type: 8, name: '侵权' }
      ],
      isReport: false
    }
  },
  methods: {
    // 拉黑作者
    async blackAuthor () {
      // 判断是否登录
      // 得到token
      const token = getLocal('token')
      // 判断用户是否登录
      if (token && token.token) {
        await apiBlackAuthor(this.autid)
        this.$toast.success('拉黑成功,请刷新页面!')
      } else {
        this.$toast('对不起,您还没登录')
      }
      // 关闭更多面板
      this.show = false
    },
    // 举报文章
    async reportArticle (type) {
      // 得到token
      const token = getLocal('token')
      // 判断用户是否登录
      if (token && token.token) {
        await apiReportArticle({
          artid: this.artid,
          type: type
        })
        this.$toast.success('举报成功')
      } else {
        this.$toast('对不起,您还没登录')
      }
      // 关闭更多面板
      this.show = false
      // 将面板切换到不喜欢界面
      this.isReport = false
    },
    async dislike () {
      // 将artid 对应的文章数据在主页中删除
      this.$emit('delarticle', this.artid)
      // 将artid对应的文章数据提交到服务器,标识为不喜欢
      await apiDislike(this.artid)
      // 关闭面板
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.more {
  width: 90%;
  border-radius: 10px;
}
</style>
