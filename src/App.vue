<template>
  <loading></loading>
  <router-view></router-view>
</template>

<script>
import { defineComponent } from 'vue'
import Loading from '@/components/common/Loading.vue'

export default defineComponent({
  name: 'App',
  components: {
    Loading
  }
})
</script>

<style lang="less">
@import 'assets/styles/app.less';
</style>
