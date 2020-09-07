<template>
  <div class="detail">
    <van-nav-bar
      left-arrow
      :fixed="true"
      title="文章详情"
      z-index="99"
      @click-left="$router.go(-1)"
    />
    <!-- 文章标题 -->
    <h2>{{ detail.title }}</h2>
    <!-- 用户信息 -->
    <van-cell-group>
      <van-cell>
        <template #title>
          <div class="anthor">
            <div class="img">
              <img :src="detail.aut_photo" alt="" />
            </div>
            <div class="details">
              <div class="anthor_name">
                {{ detail.aut_name }}
              </div>
              <div class="date_text">{{ detail.pubdate | fromtime }}</div>
            </div>
            <div class="follow">
              <van-button
                type="info"
                @click="follow"
                v-if="detail.is_followed === false"
                >+关注</van-button
              >
              <van-button type="info" @click="unFollow" v-else
                >取消关注</van-button
              >
            </div>
          </div>
        </template>
      </van-cell>
      <!-- 文章详情 -->
      <van-cell>
        <template #title>
          <div v-html="detail.content"></div>
        </template>
      </van-cell>
      <!-- 点赞区域 -->
      <van-cell>
        <template>
          <div class="likebtn">
            <div class="zan">
              <van-button
                v-if="detail.attitude === 1"
                round
                plain
                icon="like"
                type="danger"
                color="linear-gradient(to right, #ff6034, #ee0a24)"
                @click="dislike"
                >点赞</van-button
              >
              <van-button v-else round plain icon="like" @click="like"
                >点赞</van-button
              >
            </div>
            <div class="like">
              <van-button
                v-if="detail.attitude === 0"
                round
                plain
                icon="delete"
                type="danger"
                color="linear-gradient(to right, #ff6034, #ee0a24)"
                >不喜欢</van-button
              >
              <van-button v-else round plain icon="delete">不喜欢</van-button>
            </div>
          </div>
        </template>
      </van-cell>
      <!-- 发送评论区域 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我是有底线的"
        @load="onload"
      >
        <van-cell>
          <template>
            <comment
              :isReply="false"
              :item="item"
              v-for="(item, index) in commentList"
              :key="index"
            ></comment>
          </template>
        </van-cell>
      </van-list>
      <van-cell>
        <template>
          <write commid="" :isReply="false" @addcomment="addcomment"></write>
        </template>
      </van-cell>
      <reply ref="reply" />
    </van-cell-group>
  </div>
</template>

<script>
import comment from './comment/comment.vue'
import write from './comment/write.vue'
import reply from './comment/reply'
import { apiGetDetail, apiLike, apiDisLike } from '@/api/article.js'
import { apiFollow, apiUnFollow } from '@/api/user.js'
import { apiGetComment } from '@/api/comment.js'
export default {
  components: {
    comment,
    write,
    reply
  },
  data () {
    return {
      artid: this.$route.params.artid,
      detail: {},
      // list 加载状态
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      commentList: [],
      endid: 0
    }
  },
  methods: {
    // list的加载事件
    async onload () {
      const res = await apiGetComment({
        artid: this.artid,
        offset: this.offset,
        limit: this.limit
      })
      this.commentList = [...this.commentList, ...res.data.data.results]
      this.offset = res.data.data.last_id
      this.endid = res.data.data.end_id
      this.loading = false
      // 判断状态
      if (this.offset === this.endid) {
        this.finished = true
      }
    },
    async getDetail () {
      const res = await apiGetDetail(this.artid)
      // console.log(res)
      this.detail = res.data.data
    },
    // 关注作者
    async follow () {
      if (!this.$login()) {
        return
      }
      // 获取id
      var autid = this.detail.aut_id
      await apiFollow(autid)
      this.$toast.success('关注成功')
      this.detail.is_followed = true
    },
    // 取消关注
    async unFollow () {
      if (!this.$login()) {
        return
      }
      this.detail.is_followed = false
      var autid = this.detail.aut_id
      await apiUnFollow(autid)
    },
    // 点赞
    async like () {
      await apiLike(this.artid)
      this.detail.attitude = 1
    },
    // 取消点赞
    async dislike () {
      await apiDisLike(this.artid)
      this.detail.attitude = -1
    },
    // 添加评论数据
    addcomment (newObj) {
      // 将数据添加到commentList
      this.commentList.unshift(newObj)
    }
  },
  created () {
    // 发送请求到服务器,根据id得到文章此详情
    this.getDetail()
  }
}
</script>

<style lang="less" scoped>
.detail {
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
  h2 {
    text-align: center;
    padding: 30px;
    font-weight: normal;
  }
  .anthor {
    display: flex;
    .img {
      width: 50px;
      height: 50px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
      }
    }
    .details {
      flex: 1;
    }
  }
  .likebtn {
    display: flex;
    .like,
    .zan {
      flex: 50%;
      text-align: center;
    }
  }
  .write {
    position: flex;
    bottom: 0;
    left: 0;
  }
}
</style>
