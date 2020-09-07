<template>
  <div class="channel">
    <van-popup v-model="show" position="bottom" :style="{ height: '80%' }">
      <van-cell title="我的频道">
        <template #default>
          <van-button
            class="mybtn"
            plain
            round
            type="danger"
            size="mini"
            @click="isEdit = true"
            v-if="isEdit === false"
          >
            编辑</van-button
          >
          <van-button
            class="mybtn"
            plain
            round
            type="danger"
            size="mini"
            v-if="isEdit === true"
            @click="isEdit = false"
          >
            完成</van-button
          >
        </template>
      </van-cell>
      <van-grid>
        <van-grid-item
          class="crossf"
          v-for="(item, index) in channelList"
          :key="index"
          @click="changeChannel(index)"
        >
          <template #text>
            <span class="crossw" :class="{ activecss: index === active }">{{
              item.name
            }}</span>
            <van-icon
              @click.stop="delChannel(index)"
              class="crosss"
              name="clear"
              v-show="isEdit && index != 0"
            />
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 推荐频道 -->
      <van-cell title="推荐频道" />
      <van-grid>
        <van-grid-item
          class="crossf"
          v-for="(item, index) in tuijianChannel"
          :key="index"
          @click="addChannel(item)"
        >
          <template #text>
            <span class="crossw">{{ item.name }}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { getLocal, saveLocal } from '@/utils/mylocal.js'
import { apiGetAllChannel, apiUpdataChannel } from '@/api/channel.js'
export default {
  props: ['channelList', 'active'],
  data () {
    return {
      show: false,
      isEdit: false,
      allChannel: []
    }
  },
  computed: {
    // 定义一个频道推荐数据
    tuijianChannel () {
      // 得到我的频道所有的的数据id的集合
      const ids = this.channelList.map(item => {
        return item.id
      })
      // 得到所有的频道中id不在ids中的存在的元素
      const newArr = this.allChannel.filter(item => {
        return !ids.includes(item.id)
      })
      // 返回
      return newArr
    }
  },
  methods: {
    // 修改选中的频道的样式
    changeChannel (index) {
      this.$parent.active = index
    },
    async addChannel (item) {
      // 给item添加额外属性
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      this.$set(item, 'isLoading', false)
      this.$set(item, 'articleList', [])
      // 计算属性特点: 可以缓存,不会重复计算
      this.channelList.push(item)
      this.saveChannel()
    },
    async getAllChannel () {
      try {
        const res = await apiGetAllChannel()
        this.allChannel = res.data.data.channels
      } catch {
        this.$toast('请求错误')
      }
    },
    // 保存修改后的频道
    async saveChannel () {
      // 保存频道数据
      // 获取登录信息
      const token = getLocal('token')
      // 如果登录:
      if (token && token.token) {
        // 将修改后的频道数据提交到服务器
        const myChannel = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await apiUpdataChannel(myChannel)
      } else {
        // 如果未登录:
        // 将修改后的频道数据保存到localStorage中
        saveLocal('channels', this.channelList)
      }
    },
    // 删除频道
    delChannel (index) {
      // 根据下标删除
      this.channelList.splice(index, 1)
      this.saveChannel()
    }
  },
  created () {
    this.getAllChannel()
  }
}
</script>

<style lang="less" scoped>
.channel {
  .mybtn {
    padding: 4px 15px;
  }
  .crossf {
    position: relative;
    .crosss {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 12px;
      color: #999;
    }
    .crossw {
      font-size: 12px;
      color: #999;
    }
    .activecss {
      color: red;
    }
  }
}
</style>
