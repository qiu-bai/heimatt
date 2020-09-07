<template>
  <div class="info">
    <!-- 头部 -->
    <van-nav-bar
      left-arrow
      :fixed="true"
      title="个人信息"
      z-index="99"
      right-text="保存"
      @click-right="save"
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell @click="openupload" title="头像" is-link>
        <template #default>
          <img :src="user.photo" alt="" />
        </template>
      </van-cell>
      <van-cell
        @click="nameshow = true"
        title="昵称"
        :value="user.name"
        is-link
      />
      <van-cell
        @click="introshow = true"
        title="介绍"
        :value="user.intro"
        is-link
      />
    </van-cell-group>
    <van-cell-group>
      <van-cell
        @click="gendershow = true"
        title="性别"
        :value="user.gender === 1 ? '女' : '男'"
        is-link
      />
      <van-cell
        @click="birthdayshow = true"
        title="生日"
        :value="user.birthday"
        is-link
      />
    </van-cell-group>
    <!-- 用户名字的修改 -->
    <van-popup v-model="nameshow" position="bottom" :style="{ height: '8%' }">
      <van-field v-model="user.name" required />
    </van-popup>
    <!-- 用户介绍的修改 -->
    <van-popup v-model="introshow" position="bottom" :style="{ height: '8%' }">
      <van-field v-model="user.intro" required />
    </van-popup>
    <!-- 用户性别的修改 -->
    <van-action-sheet
      v-model="gendershow"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
      close-on-click-action
    />
    <!-- 用户生日的修改 -->
    <van-popup
      v-model="birthdayshow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @change="onchange"
        @confirm="birthdayshow = false"
        @cancel="birthdayshow = false"
      />
    </van-popup>
    <photoupload ref="photoupload" @passimg="passimg" />
  </div>
</template>

<script>
import photoupload from './photoupload/photoupload'
import { apiGetUser, apiGetProfile, apiGetUserProfile } from '@/api/user.js'
export default {
  components: {
    photoupload
  },
  data () {
    return {
      user: {},
      nameshow: false,
      introshow: false,
      gendershow: false,
      birthdayshow: false,
      actions: [
        { name: '男', index: 0 },
        { name: '女', index: 1 }
      ],
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2020, 9, 5),
      currentDate: new Date()
    }
  },
  created () {
    // 打开界面获取用户信息
    this.getUser()
    this.getProfile()
  },
  methods: {
    // 选择性别
    onSelect (action) {
      this.user.gender = action.index
    },
    // 保存图片
    passimg (img) {
      this.user.photo = img
    },
    // 打开照片上传
    openupload () {
      this.$refs.photoupload.show = true
    },
    formatter (type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      }
      return val
    },
    onchange (value) {
      var nowTime = value.$vnode.parent.data.props.value
        .toISOString()
        .slice(0, 10)
      this.$set(this.user, 'birthday', nowTime)
    },
    // 保存按钮
    async save () {
      await apiGetUserProfile(this.user)
      this.$toast.success('信息修改成功!')
    },
    // 获取用户信息
    async getUser () {
      const res = await apiGetUser()
      this.$set(this.user, 'photo', res.data.data.photo)
      this.$set(this.user, 'name', res.data.data.name)
      this.$set(this.user, 'intro', res.data.data.intro)
    },
    // 获取用户信息
    async getProfile () {
      const res = await apiGetProfile()
      this.$set(this.user, 'gender', res.data.data.gender)
      this.$set(this.user, 'birthday', res.data.data.birthday)
    }
  }
}
</script>

<style lang="less" scoped>
.info {
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
  img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
  }
}
</style>
