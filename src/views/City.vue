<template>
  <!-- 头部 -->
  <van-nav-bar
    :title="cityName"
    left-arrow
    right-text="切换城市"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  ></van-nav-bar>
  <!-- 主体 -->
  <div class="city-main">
    <!-- 查询 -->
    <van-form class="search-form" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="searchKeyword"
          name="city"
          placeholder="请输入学校、商务楼、地址"
          :rules="[{ required: true, message: '请输入学校、商务楼、地址' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <!-- 搜索历史 -->
    <div class="city-search-history">
      <div v-show="!isShowResultList" class="history-city-title">搜索历史</div>
      <div class="history-cont">
        <div class="history-city-list">
          <ul>
            <li
              v-for="item in showCityList"
              :key="item.geohash"
              @click="onClickCity(item)"
            >
              <div class="city-list-title">{{ item.name }}</div>
              <div class="city-list-desc">{{ item.address }}</div>
            </li>
          </ul>
        </div>
        <div
          v-show="!isShowResultList && searchHistoryList.length > 0"
          class="clear-btn"
          @click="clearAll"
        >
          <van-icon name="delete-o" />
          <span>清空所有</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentCity, getSearchPlace } from 'api'
import { setStorage, getStorage, removeStorage } from 'utils/common'

const route = useRoute()
const router = useRouter()

// 头部 start
// 当前城市id
const cityId = ref('')
// 当前城市名称
const cityName = ref('')

/**
 * 点击返回箭头按钮
 */
const onClickLeft = () => {
  router.go(-1)
}

/**
 * 点击右边切换城市
 */
const onClickRight = () => {
  // 跳转
  router.push({
    name: 'cityList'
  })
}

/**
 * 根据id获取当前城市
 */
const getCurCity = async () => {
  const res = await getCurrentCity(cityId.value)
  cityName.value = res.name
}

// 获取当前城市id
cityId.value = route.params.id
// 根据id获取当前城市
getCurCity()

// 头部 end

// 查询地址 start
// 搜索关键字
const searchKeyword = ref('')
// 搜索的列表
const searchCityList = ref([])
// 是否显示搜索结果列表
const isShowResultList = ref(false)
// 搜索历史列表
const searchHistoryList = ref([])

// 显示的城市列表
const showCityList = computed(() => {
  if (isShowResultList.value) {
    return searchCityList.value
  }
  return searchHistoryList.value
})

/**
 * 提交查询地址
 */
const onSubmit = async () => {
  const res = await getSearchPlace(cityId.value, searchKeyword.value)
  // 搜索结果
  searchCityList.value = res

  // 显示搜索列表
  isShowResultList.value = true
}

/**
 * 初始化数据，获取缓存的搜索历史
 */
const initData = () => {
  const searchHistory = getStorage('searchHistory')

  if (searchHistory) {
    searchHistoryList.value = JSON.parse(searchHistory)
  }
}

/**
 * 点击搜索列表城市
 * @param {string} city 城市地址
 */
const onClickCity = city => {
  // 缓存
  // 缓存中没有才添加
  if (searchHistoryList.value.every(item => item.geohash !== city.geohash)) {
    // 保存搜索历史
    searchHistoryList.value.push(city)
    setStorage('searchHistory', JSON.stringify(searchHistoryList.value))
  }

  // 跳转首页
  router.push({
    name: 'home',
    query: {
      geohash: city.geohash
    }
  })
}

/**
 * 清空历史记录
 */
const clearAll = () => {
  searchHistoryList.value = []
  removeStorage('searchHistory')
  initData()
}

// 获取缓存的搜索历史
initData()

// 查询地址 end
</script>

<style lang="less" scoped>
.city-main {
  padding-top: 10px;
  .search-form {
    background-color: @theme-bgc;
    padding-bottom: 10px;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
  }

  .city-search-history {
    .history-city-title {
      padding: 4px 6px;
      font-size: @font-size-12;
    }

    .history-cont {
      border-top: 1px solid #e4e4e4;
      background-color: @theme-bgc;
      .history-city-list {
        li {
          display: flex;
          flex-direction: column;
          padding: 10px 20px;
          border-bottom: 1px solid #e4e4e4;

          .city-list-title {
            margin-bottom: 6px;
          }

          .city-list-desc {
            .sc(@font-size-12, #999);
          }
        }
      }

      .clear-btn {
        text-align: center;
        padding: 10px 0px;
        color: #666;
      }
    }
  }
}
</style>
