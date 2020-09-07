<template>
  <div class="my">
    <!-- 用户信息区域 -->
    <div class="top">
      <div class="anth">
        <img :src="userInfo.photo" @click="$router.push('/info')" alt="" />
        <span  @click="$router.push('/info')">{{ userInfo.name }}</span>
        <span class="code">申请认证</span>
      </div>
      <div class="read">
      <van-icon name="todo-list-o" class="icons" />
       <div class="read1">
          <div>今日阅读</div>
        <div>0分钟</div>
       </div>
      </div>
      <div class="detail">
        <div class="item">
          <div>{{ userInfo.art_count }}</div>
          <div>动态</div>
        </div>
        <div class="item">
          <div>{{ userInfo.follow_count }}</div>
          <div>关注</div>
        </div>
        <div class="item">
          <div>{{ userInfo.fans_count }}</div>
          <div>粉丝</div>
        </div>
      </div>
    </div>
    <!-- 收藏区域 -->
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
      <van-grid-item icon="orders-o" text="作品" />
    </van-grid>
    <!-- 消息区域 -->
    <div class="bottom">
      <van-cell title="消息通知" is-link />
      <van-cell title="实名认证" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell title="系统设置" is-link />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getLocal } from '../../../utils/mylocal.js'
export default {
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  methods: {
    ...mapActions(['setUserInfo'])
  },
  created () {
    // 打开页面时调用,判断用户是否登录(是否存token)
    const loginInfo = getLocal('token')
    if (!loginInfo || !loginInfo.token) {
      // 提示未登录
      this.$toast('你还未登录')
      this.$router.push('/login')
      return
    }
    this.setUserInfo()
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scope>
.my {
  .top {
    color: #fff;
    height: 200px;
    background: linear-gradient(to right, rgb(179, 55, 211), rgb(5, 211, 230));
    padding: 20px;
    position: relative;
    .anth {
       font-size: 20px;
      img {
        height: 66px;
        width: 66px;
        border-radius: 66px;
        transform: translateY(50%);
      }
      .code {
        position: absolute;
        left: 95px;
        top:95px;
        color: blue;
        width: 60px;
        height: 16px;
        background: #ffffff;
        border-radius: 16px;
        font-size: 12px;
      }
    }
    .read {
      position: absolute;
      height: 44px;
      width: 99px;
      text-align: center;
      margin-top: 40px;
      padding-top: 10px;
      right: 0;
      top: 20px;
      font-size: 12px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50px 0 0 50px;
      .icons{
        position: absolute;
        right: 65px;
        top:15px;
        font-size: 24px;
      }
      .read1{
        margin-left: 30px;
      }
    }
    .detail {
      display: flex;
      .item {
        flex: 1;
        margin-top: 100px;
        text-align: center;
      }
    }
  }
}
</style>
