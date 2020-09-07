<template>
  <div class="search">
    <!-- 头部搜索 -->
    <van-search
      v-model="value"
      background="#3296fa"
      placeholder="请输入搜索关键词"
      @input="onInput"
      @search="onSearch"
      show-action
    >
      <template #action>
        <span class="canclebtn" @click="onCancel">取消</span>
      </template>
    </van-search>
    <van-cell-group v-show="isShow">
      <van-cell title="历史区域">
        <template #right-icon>
          <van-icon name="delete" @click="delAll" />
        </template>
      </van-cell>
      <van-cell
        icon="search"
        :title="item"
        v-for="(item, index) in historyList"
        :key="index"
        @click="onSearch(item)"
      >
        <template #default>
          <van-icon name="cross" @click.stop="delbtn(index)" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-show="!isShow">
      <van-cell title="联想区域" />
      <van-cell
        icon="search"
        v-for="(item, index) in searchList"
        :key="index"
        @click="onSearch(item.oldItem)"
      >
        <template #title>
          <span v-html="item.newItem"></span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiSuggestion } from '@/api/search.js'
import { getLocal, saveLocal, removeLocal } from '@/utils/mylocal.js'
export default {
  data () {
    return {
      value: '',
      isShow: true, // 显示与隐藏
      searchList: [], // 联想数据
      timer: null, // 防抖的定时器
      historyList: getLocal('history') || [] // 历史数据
    }
  },
  methods: {
    // 删除所有数据
    delAll () {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '你确定要删除所有历史数据吗?'
        })
        .then(() => {
          // 把历史数据清除
          this.historyList = []
          // 把本地保存清除
          removeLocal('history')
        })
        .catch(() => {})
    },
    // 删除历史数据
    delbtn (index) {
      // 删除当前项
      this.historyList.splice(index, 1)
      // 重新把数据保存起来
      saveLocal('history', this.historyList)
    },
    // 将来输入的内容之后,点击完成按钮触发
    onSearch (value) {
      this.$router.push(`/results/${value}`)
      // 将搜索到的数据保存到历史数组中
      this.historyList.unshift(value)
      // 数组的去重
      this.historyList = [...new Set(this.historyList)]
      // 将搜索到的数据保存到本地
      saveLocal('history', this.historyList)
    },
    // 获取联想建议:输入框内容变化时触发
    onInput () {
      if (this.value.length !== 0) {
        this.isShow = false
        clearTimeout(this.timer)
        this.timer = setTimeout(async () => {
          const res = await apiSuggestion(this.value)
          console.log(res)
          this.searchList = res.data.data.options.map(item => {
            return {
              oldItem: item,
              newItem: item.replace(
                this.value,
                `<span style="color:red">${this.value}</span>`
              )
            }
          })
        }, 500)
      } else {
        this.isShow = true
        this.searchList = []
      }
    },
    // 取消按钮
    onCancel () {
      this.value = ''
      this.onInput()
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .canclebtn {
    color: #fff;
  }
  /deep/ .van-search__action:active {
    background-color: green;
  }
}
</style>
