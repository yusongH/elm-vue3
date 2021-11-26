<template>
  <van-nav-bar left-text="ele.me"></van-nav-bar>
  <div class="home-main">
    <!-- 地点选择 -->
    <div class="city-select">
      <van-cell-group>
        <van-cell
          title-class="font-size-12"
          value-class="font-size-12"
          class="cur-location"
          title="当前定位城市："
          value="定位不准时，在城市列表中选择"
        />
        <van-cell title-class="blue-color" :title="guessCity.name" is-link />
      </van-cell-group>
    </div>

    <!-- 热门城市 -->
    <div class="city-list hot-city">
      <div class="city-list-title">热门城市</div>
      <div class="city-list-cont">
        <ul>
          <li v-for="item in hotCityList.list" :key="item.id">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 城市列表 -->
    <div
      v-for="(value, key, index) in groupCityList"
      :key="key"
      class="city-list"
    >
      <div class="city-list-title">
        <span>{{ key }}</span>
        <span v-if="index === 0">（按字母排序）</span>
      </div>
      <div class="city-list-cont">
        <ul>
          <li v-for="subItem in value" :key="subItem.id">{{ subItem.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { getCityGuess, getHotCity, getGroupCity } from 'api'

export default defineComponent({
  name: 'Home',
  setup() {
    // 默认城市 start
    const guessCity = reactive({
      name: '',
      id: ''
    })
    /**
     * 请求获取默认城市
     */
    const requestCityGuess = async () => {
      const res = await getCityGuess()
      guessCity.name = res.name
      guessCity.id = res.id
    }
    // 调用请求
    requestCityGuess()
    // 默认城市 end

    // 获取热门城市 start
    const hotCityList = reactive({
      list: []
    })
    const requestHotCity = async () => {
      const res = await getHotCity()
      hotCityList.list = res.map(item => {
        return {
          name: item.name,
          id: item.id
        }
      })
      console.log(hotCityList)
    }
    // 调用请求
    requestHotCity()
    // 获取热门城市 end

    // 城市列表 start
    const groupCityList = ref({})
    const requestGroupCity = async () => {
      const res = await getGroupCity()
      groupCityList.value = res
    }
    // 请求
    requestGroupCity()
    // 城市列表 end

    return {
      guessCity,
      hotCityList,
      groupCityList
    }
  }
})
</script>

<style lang="less" scoped>
.home-main {
  .city-select {
    margin-bottom: 10px;
    :deep(.font-size-12) {
      span {
        font-size: @font-size-12;
      }
    }
    :deep(.blue-color) {
      color: var(--van-primary-color);
    }
  }

  .city-list {
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    background-color: @theme-bgc;
    margin-bottom: 10px;
    &.hot-city {
      li {
        color: @theme-color;
      }
    }
    .city-list-title {
      height: 36px;
      line-height: 36px;
      padding: 0 6px;
      border-bottom: 1px solid #e4e4e4;
      color: #666;
    }

    .city-list-cont {
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          padding: 0 4px;
          width: calc(25% - 9px);
          text-align: center;
          border-bottom: 1px solid #e4e4e4;
          border-right: 1px solid #e4e4e4;
          height: 36px;
          line-height: 36px;
          .te();
        }
      }
    }
  }
}
</style>
