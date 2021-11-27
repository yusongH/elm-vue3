<template>
  <div class="main-box">
    <router-view></router-view>
  </div>
  <van-tabbar route>
    <van-tabbar-item replace to="/home" icon="home-o">外卖</van-tabbar-item>
    <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
    <van-tabbar-item replace to="/order" icon="orders-o">订单</van-tabbar-item>
    <van-tabbar-item replace to="/my" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style lang="less" scoped>
.main-box {
  height: calc(100% - 50px);
}
</style>
