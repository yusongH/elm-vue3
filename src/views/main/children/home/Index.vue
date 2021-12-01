<template>
  <!-- 头部 -->
  <van-nav-bar :title="headTitle">
    <template #left>
      <van-icon
        @click="router.push({ path: `/search/${geohash}` })"
        name="search"
        size="18"
      />
    </template>
    <template #right>
      <div
        v-if="store.state.user.userInfo"
        @click="router.push({ name: 'my' })"
      >
        <van-icon size="18" name="user-o" />
      </div>
      <div v-else @click="router.push({ name: 'login' })">
        <span>登录</span>
        <span>|</span>
        <span>注册</span>
      </div>
    </template>
  </van-nav-bar>

  <!-- 分类 -->
  <div class="classify">
    <van-swipe class="swipe-cont" indicator-color="@theme-color">
      <van-swipe-item v-for="(item, index) in foodTypes" :key="index">
        <van-grid :border="false">
          <!-- 跳转todo -->
          <van-grid-item
            v-for="subItem in item"
            :key="subItem.id"
            @click="router.push({ name: 'food' })"
          >
            <van-image
              width="1.12rem"
              height="1.12rem"
              :src="`${imgBaseUrl}${subItem.image_url}`"
            />
            <span class="desc">{{ subItem.title }}</span>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
    </van-swipe>
  </div>

  <!-- 附近商家 -->
  <div class="nearby-merchants">
    <div class="title">
      <van-icon name="shop-o" size="0.4rem" />
      <span class="text">附近商家</span>
    </div>
    <shop-list
      :geohash="geohash"
      :latitude="latitude"
      :longitude="longitude"
    ></shop-list>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { getCityGuess, getAddress, getFoodTypes } from 'api'
import ShopList from '@/components/ShopList.vue'
import { SAVE_GEOHASH, SAVE_ADDRESS } from '@/store/mutation-types.js'

const store = useStore()
const router = useRouter()
const route = useRoute()

// 头部 start
const headTitle = ref('')
// 头部 end

// 页面初始化逻辑 start
const geohash = ref('')
const latitude = ref('') // 经度
const longitude = ref('') // 纬度

/**
 * 请求首页默认地址
 */
const requestDefaultCity = async () => {
  const res = await getCityGuess()
  geohash.value = res.latitude + ',' + res.longitude
  latitude.value = res.latitude + ''
  longitude.value = res.longitude + ''
}

/**
 * 请求地址信息
 */
const requestAddress = () => {
  return new Promise(resolve => {
    getAddress(geohash.value).then(res => {
      headTitle.value = res.name
      resolve(res)
    })
  })
}

/**
 * 初始化地址信息
 */
const initCityInfo = async () => {
  // 判断是否有geohash，如果没有就请求接口获取
  if (route.query.geohash) {
    geohash.value = route.query.geohash
    latitude.value = geohash.value.split(',')[0]
    longitude.value = geohash.value.split(',')[1]
  } else {
    // 请求获取
    await requestDefaultCity()
  }

  // 保存geohash到vuex
  store.commit(`home/${SAVE_GEOHASH}`, geohash.value)

  // 请求地址信息
  const address = await requestAddress()

  // 保存地址信息
  store.commit(`home/${SAVE_ADDRESS}`, address)
}

// 初始化地址信息
initCityInfo()

// 页面初始化逻辑 end

// 导航食品分类 start
// 分类列表
const foodTypes = ref([])
// 图片域名地址
const imgBaseUrl = ref('https://fuss10.elemecdn.com')
/**
 * 请求食品分类
 */
const questFoodTypes = async () => {
  const foodTypesList = []
  const res = await getFoodTypes()
  const newArr = [...res] // 新数组
  // 处理成二维数组
  for (let i = 0, j = 0; i < res.length; i += 8, j++) {
    foodTypesList[j] = newArr.splice(0, 8)
  }

  foodTypes.value = foodTypesList
}

/**
 * 获取食品分类，并处理
 */
const handleFoodTypes = () => {
  questFoodTypes()
}

// 获取食品分类
handleFoodTypes()

// 导航食品分类 end
</script>

<style lang="less" scoped>
.classify {
  margin-bottom: 10px;
  .swipe-cont {
    background-color: #fff;
    .van-swipe-item {
      height: 200px;
      text-align: center;
      .desc {
        .sc(@font-size-12, #666);
      }
    }
  }
}

.nearby-merchants {
  background-color: #fff;
  .title {
    .sc(@font-size-12, #999);
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    .text {
      margin-left: 6px;
    }
  }
}
</style>
