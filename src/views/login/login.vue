<template>
  <div class="login">
    <!-- 头部标题 -->
    <van-nav-bar class="mynav" title="登录" />
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          :rules="rules.mobile"
          v-model="user.mobile"
          placeholder="请输入手机号"
        >
          <template #left-icon>
            <i class="iconfont icon-iphone"></i>
          </template>
        </van-field>
        <van-field
          :rules="rules.code"
          v-model="user.code"
          placeholder="请输入验证码"
        >
          <template #button>
            <van-button
              type="default"
              round
              color="#ededed"
              size="small"
              class="codebtn"
              >发送验证码</van-button
            >
          </template>
          <template #left-icon>
            <i class="iconfont icon-LOCKCLOSED"></i>
          </template>
        </van-field>
      </van-cell-group>
      <div class="btn">
        <van-button type="info" size="large">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import instance from '../../utils/request.js'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '请输入正确的手机号码',
            trigger: 'onBlur'
          },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的手机号码'
          }
        ],
        code: [
          { required: true, message: '请填入正确的验证码', trigger: 'onBlur' },
          {
            pattern: /^\d{6}$/,
            message: '请填入正确的验证码',
            trigger: 'onBlur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      instance({
        url: '/app/v1_0/authorizations',
        method: 'post',
        data: {
          mobile: this.user.mobile,
          code: this.user.code
        }
      }).then(res => {
        console.log(res.data.data.token)
        this.$router.push('/index')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .mynav {
    background-color: rgb(13, 153, 235);
    /deep/.van-nav-bar__title {
      // 深度选择器
      color: #fff;
    }
  }
  .codebtn {
    /deep/.van-button__text {
      color: #999;
    }
  }
  .btn {
    margin: 20px;
  }
}
</style>
