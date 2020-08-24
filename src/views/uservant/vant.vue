<template>
  <div>
    <h3>使用vant</h3>
    <h3>按钮</h3>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <h3>使用单元格</h3>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="不会" value="怎么办" label="凉拌" />
    </van-cell-group>
    <h3>使用icon图标</h3>
    <van-icon name="chat-o" />
    <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
    <h3>使用单元格加图标:插槽</h3>
    <van-cell-group>
      <van-cell title="不会" value="怎么办">
        <template #title>
          <van-icon name="fire-o" />
          不会
          <van-icon name="fire-o" />
        </template>
         <template #default>
        <van-icon name="fire" />
        怎么办
        <van-icon name="fire" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
