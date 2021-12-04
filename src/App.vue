<template>
  <loading></loading>
  <router-view></router-view>
  <icon-svg></icon-svg>
</template>

<script>
import { defineComponent } from 'vue'
import Loading from '@/components/common/Loading.vue'
import IconSvg from '@/components/common/Svg.vue'

export default defineComponent({
  name: 'App',
  components: {
    Loading,
    IconSvg
  }
})
</script>

<style lang="less">
@import 'assets/styles/app.less';
</style>
