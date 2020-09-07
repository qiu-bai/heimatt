<template>
  <div class="results">
    <van-nav-bar
      left-arrow
      :fixed="true"
      title="搜索结果"
      z-index="99"
      @click-left="onClickLeft"
    />
    <!-- 文章区域 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell @click='$router.push(/detail/+item.art_id)' class="details" v-for="(item, index) in artList" :key="index">
        <template #title>
          <!-- 文章标题 -->
          <h3>{{ item.title }}</h3>
          <!-- 文章图片 -->
          <van-grid
            v-if="item.cover.type !== 0"
            :border="false"
            :column-num="3"
          >
            <van-grid-item
              v-for="(imgitem, imgindex) in item.cover.images"
              :key="imgindex"
            >
              <van-image lazy-load :src="imgitem" />
            </van-grid-item>
          </van-grid>
          <!-- 文章的其他信息 -->
          <div class="other">
            <div class="left">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }}条评论</span>
              <span>{{ item.pubdate | fromtime }}</span>
            </div>
          </div>
          <van-grid direction="horizontal" :column-num="3">
            <van-grid-item
              icon="comment-o"
              @click="comments"
              :text="item.comm_count.toString()"
            />
            <van-grid-item icon="like-o" @click="zan" text="点赞" />
            <van-grid-item icon="exchange" @click="share" text="分享" />
          </van-grid>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { apiSearch } from '@/api/search.js'
import { getLocal } from '@/utils/mylocal.js'
// import { apiartDetails } from '@/api/details.js'
// 导入懒加载
import Vue from 'vue'
import { Lazyload } from 'vant'
Vue.use(Lazyload)
export default {
  data () {
    return {
      loading: false,
      finished: false,
      // 获取的关键字
      key: this.$route.params.key,
      page: 1,
      perpage: 10,
      artList: []
    }
  },
  methods: {
    // 分享
    share () {
      if (!this.$login()) {
        // 未登录
        return
      }
      console.log('分享成功')
    },
    // 点赞
    zan () {
      if (!this.$login()) {
        // 未登录
        return
      }
      console.log('已赞')
    },
    // 评论
    comments () {
      // 登录的判断
      // 得到登录的token
      var token = getLocal('token')
      if (!token || !token.token) {
        this.$toast.fail('没登录,无权限!')
        // 跳转登录界面
        this.$router.push('/login')
        // 结束
        return
      }
      console.log('评论完成')
    },
    // 返回
    onClickLeft () {
      // this.$router.back()
      this.$router.go(-1)
    },
    async onLoad () {
      const res = await apiSearch({
        page: this.page,
        perpage: this.perpage,
        q: this.key
      })
      // console.log(res)
      this.artList = [...this.artList, ...res.data.data.results]
      this.loading = false
      this.page++
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
    }
    // 文章详情
    // async artdetails (articleid) {
    //   const res = await apiartDetails(articleid)
    //   console.log(res)
    // }
  }
}
</script>

<style lang="less" scoped>
.results {
  margin-bottom: 50px;
  margin-top: 46px;
  .van-nav-bar {
    background: linear-gradient(to right, rgb(179, 55, 211), rgb(5, 211, 230));
    /deep/.van-nav-bar__title {
      color: #fff;
    }
  }
  /deep/.van-icon-arrow-left::before {
    font-size: 24px;
    color: rgb(252, 9, 82);
  }
  .other {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    .left {
      span {
        margin-right: 12px;
      }
    }
  }
}
</style>
