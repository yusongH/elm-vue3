<template>
  <div v-show="store.state.loading.isShowLoading" class="loading">
    <van-loading type="spinner" />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
