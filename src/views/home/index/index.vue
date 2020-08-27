<template>
  <div class="layout">
    <!-- 头部标题 -->
    <van-nav-bar :fixed="true" title="首页" z-index="99" />
    <!-- 频道区域 -->
    <van-tabs sticky :offset-top="46" v-model="active">
      <van-tab
        v-for="(item, index) in channelList"
        :title="item.name"
        :key="index"
      >
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <!-- 频道下的文章区域 -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="(subitem, subindex) in item.articleList"
              :key="subindex"
              :title="subitem.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { apiGetChannelsList } from '../../../api/channel.js'
import { getLocal } from '../../../utils/mylocal.js'
import { apiGetArticle } from '../../../api/article.js'
export default {
  data () {
    return {
      // loading: false,
      // finished: false,
      // isLoading: false,
      // list: [],
      channelList: [], // 数据频道
      active: 0 // 当前选中频道的下标
    }
  },
  methods: {
    async onLoad () {
      // v-model:loading=>是否处于正在上拉加载更多的操作
      //  将来onload执行后会自动将loading改为true
      //  如果loading为true,onload不会继续执行
      // finished:finished=>list数据源中的数据是否完全加载完毕,如果finished为true,那么list的数据源已经加载完毕,onload也不会再执行
      // 事件:
      //   load:当list组件在上拉加载更多时,会执行的事件
      //   被上拉触底时执行
      //   每次执行自动将loading改为true

      // 上拉触底时触发
      // console.log('onLoad')
      const currentChannel = this.channelList[this.active]
      const id = currentChannel.id
      const res = await apiGetArticle(id)
      // console.log(res)
      // 保存文章数据
      currentChannel.articleList = [
        ...currentChannel.articleList,
        ...res.data.data.results
      ]
      // 将list的加载数据状态设置为false
      currentChannel.loading = false
      // 判断数据是否加载完毕
      if (res.data.data.results.length === 0) {
        // 说明数据已经加载完毕
        currentChannel.finished = true
        currentChannel.isLoading = false
        currentChannel.loading = true
      }
    },
    async onRefresh () {
      // 得到当前所有数据
      const currentChannel = this.channelList[this.active]
      // 清除当前频道下的所有数据
      currentChannel.articleList = []
      currentChannel.loading = false
      currentChannel.finished = false
      currentChannel.isLoading = false
      this.onLoad()
    },
    // 定义一个方法:下拉频道得到数据
    async getChannelsList () {
      // 得到token
      const token = getLocal('token')
      // 判断用户是否的登录
      if (token && token.token) {
        const res = await apiGetChannelsList()
        // console.log(res)
        this.channelList = res.data.data.channels
      } else {
        const mychannels = getLocal('channels')
        // 如果还未登录,判断localStorage 中是否存在频道数据
        if (mychannels) {
          this.channelList = mychannels
        } else {
          // 如果不存在,从服务器得到默认的数据频道
          const res = await apiGetChannelsList()
          // console.log(res)
          this.channelList = res.data.data.channels
        }
      }
      this.addOtherProp()
    },
    addOtherProp () {
      this.channelList.forEach(item => {
        // 添加额外属性
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'isLoading', false)
        this.$set(item, 'articleList', [])
      })
      // console.log(this.channelList)
    }
  },
  created () {
    this.getChannelsList()
  }
}
</script>
<style lang="less" scoped>
.layout {
  margin-bottom: 50px;
  margin-top: 46px;
  .van-tabs__wrap--scrollable .van-tabs__nav--complete {
    margin-top: 59px;
  }
  .van-nav-bar {
    background: linear-gradient(to right, rgb(179, 55, 211), rgb(5, 211, 230));
    /deep/.van-nav-bar__title {
      color: #fff;
    }
  }
}
</style>
