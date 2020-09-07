<template>
  <div class="photoupload">
    <van-popup v-model="show" class="mypop">
      <div class="box">
        <div @click="openfile">从相册中选择</div>
        <div style="display:none">
          <input type="file" @change="changeImg" ref="myfile" />
        </div>
        <div>拍照</div>
        <div @click="show = false">取消</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { apiUpdataImg } from '@/api/user.js'
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    // 打开图片选择器
    openfile () {
      // 得到上传框
      this.$refs.myfile.click()
    },
    // 改变图片时触发
    changeImg () {
      // 得到选中的图片
      var img = this.$refs.myfile.files[0]
      // 方式一:
      var path = URL.createObjectURL(img)
      ImagePreview({
        images: [path],
        onClose: this.imgClose
      })
      // 方式二:
      // 1.0 创建fileReader对象
      // var reader = new FileReader()
      // // 2.0开始转换
      // reader.readAsDataURL(img)
      // // 3.0添加转换完成的事件
      // reader.addEventListener('load', () => {
      //   var path = reader.result
      //   ImagePreview([path])
      // })
    },
    imgClose () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否将图片设置为头像'
        })
        .then(async () => {
          // 得到选中的照片
          var img = this.$refs.myfile.files[0]
          // 将图片提交到服务器
          const res = await apiUpdataImg(img)
          // 接受返回的图片
          var imgPath = res.data.data.photo
          // 将图片传入给父组件
          this.$emit('passimg', imgPath)
          // 关闭面板
          this.show = false
        })
        .catch(() => {
          console.log('取消')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.photoupload {
  .mypop {
    width: 90%;
    border-radius: 5px;
    .box {
      text-align: center;
      line-height: 50px;
    }
  }
}
</style>
