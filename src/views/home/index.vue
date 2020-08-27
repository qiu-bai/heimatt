<template>
  <div>
    <!-- 渲染的容器 -->
    <router-view></router-view>
    <!-- 添加一个tabbar -->
    <van-tabbar route>
  <van-tabbar-item to='/index' icon="home-o">主页</van-tabbar-item>
  <van-tabbar-item to='/search' icon="search">搜索</van-tabbar-item>
  <van-tabbar-item to='/video' icon="tv-o">视频</van-tabbar-item>
  <van-tabbar-item to='/my' icon="user-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less'>

</style>
