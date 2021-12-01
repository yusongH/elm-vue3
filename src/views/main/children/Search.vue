<template>
  <!-- 头部 -->
  <van-nav-bar
    title="搜索"
    left-arrow
    @click-left="router.go(-1)"
  ></van-nav-bar>

  <!-- 搜索 -->
  <van-search
    v-model="searchValue"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
  >
    <template #action>
      <div @click="onSearch">搜索</div>
    </template>
  </van-search>

  <!-- 搜索历史 -->
  <div v-if="isShowHistory" class="search-history">
    <div class="search-history-title">搜索历史</div>
    <div class="search-history-content">
      <div class="cont-list">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in searchList"
            :key="item"
            :title="item"
          >
            <template #right-icon>
              <van-icon @click="deleteSerchItem(index)" name="cross" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div
        v-if="searchList && searchList.length > 0"
        @click="clearAll"
        class="clear-all-btn"
      >
        清空搜索记录
      </div>
    </div>
  </div>

  <!-- 搜素列表 -->
  <div v-else class="search-list">
    <div class="search-list-title">商家</div>
    <div class="search-list-content">
      <ul v-if="resultList && resultList.length > 0">
        <li v-for="item in resultList" :key="item.id" class="search-list-item">
          <div class="pic">
            <van-image
              width="100%"
              height="100%"
              :src="`${imageBaseUrl}${item.image_path}`"
            />
          </div>
          <div class="desc">
            <div class="title">
              <span>{{ item.name }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="24"
                height="14"
                class="pay_icon"
              >
                <polygon
                  points="0,14 4,0 24,0 20,14"
                  style="fill: none; stroke: #ff6000; stroke-width: 1"
                />
                <line
                  x1="1.5"
                  y1="12"
                  x2="20"
                  y2="12"
                  style="stroke: #ff6000; stroke-width: 1.5"
                />
                <text
                  x="3.5"
                  y="9"
                  style="fill: #ff6000; font-size: 9; font-weight: bold"
                >
                  支付
                </text>
              </svg>
            </div>
            <div class="sale-num">
              月售
              {{ item.month_sales || item.recent_order_num }}
              单
            </div>
            <div>
              {{ item.delivery_fee || item.float_minimum_order_amount }}元起送 /
              距离{{ item.distance }}公里
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="no-data">很抱歉！无搜索结果</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getSearchRestaurant } from 'api'
import { setStorage, getStorage, removeStorage } from 'utils/common'
const router = useRouter()
const route = useRoute()

// 页面初始化 start
const geohash = ref('')
// imageBaseUrl
const imageBaseUrl = ref('')
// 搜索记录列表
const searchList = ref([])

onMounted(() => {
  imageBaseUrl.value = import.meta.env.VITE_IMAGEBASEURL
  // 获取geohash
  geohash.value = route.params.geohash
  // 获取缓存中的搜索记录
  const storage = getStorage('shopSearchHistory')
  if (storage) {
    searchList.value = JSON.parse(storage)
  }
})
// 页面初始化 end

// 历史记录 start
/**
 * 清空历史记录
 */
const clearAll = () => {
  searchList.value = []
  // 清除缓存
  removeStorage('shopSearchHistory')
}
// 历史记录 end

// 搜索 start
const searchValue = ref('') // 搜索关键字
const resultList = ref([]) // 搜索结果列表
const isShowHistory = ref(true) // 是否显示搜索历史

/**
 * 搜索回调
 */
const onSearch = async () => {
  // 非空判断
  if ((searchValue.value ?? '') === '') return

  const res = await getSearchRestaurant(geohash.value, searchValue.value)
  resultList.value = res
  // 隐藏搜索历史
  isShowHistory.value = false
  // 缓存搜索结果
  const storage = getStorage('shopSearchHistory')

  if (storage) {
    const searchHistory = JSON.parse(storage)

    // 没有历史记录就添加
    if (!searchHistory.includes(searchValue.value)) {
      searchHistory.push(searchValue.value)
    }
    searchList.value = searchHistory
  } else {
    searchList.value.push(searchValue.value)
  }
  // 缓存
  setStorage('shopSearchHistory', JSON.stringify(searchList.value))
}

// 侦听输入框
watch(
  () => {
    return searchValue.value
  },
  val => {
    // 如果为空则显示历史搜索记录
    if (val === '') {
      isShowHistory.value = true
      resultList.value = []
    }
  }
)

/**
 * 删除搜索记录列表项
 */
const deleteSerchItem = index => {
  searchList.value.splice(index, 1)
}

// 搜索 end
</script>

<style lang="less" scoped>
.search-history {
  .search-history-title {
    height: 44px;
    line-height: 46px;
    padding: 0 10px;
  }

  .search-history-content {
    .cont-list {
      .van-icon-cross {
        line-height: 24px;
      }
    }
    .clear-all-btn {
      height: 44px;
      line-height: 44px;
      text-align: center;
      color: @theme-color;
      font-weight: 700;
    }
  }
}

.search-list {
  .search-list-title {
    height: 44px;
    line-height: 46px;
    padding: 0 10px;
  }

  .search-list-content {
    color: rgb(51, 51, 51);
    .search-list-item {
      background-color: @theme-bgc;
      padding: 12px;
      display: flex;
      border-bottom: 0.025rem solid #e4e4e4;
      .pic {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }

      .desc {
        .title {
          span {
            margin-right: 6px;
          }

          svg {
            vertical-align: middle;
          }
        }
      }
    }

    .no-data {
      height: 44px;
      line-height: 44px;
      text-align: center;
      background-color: @theme-bgc;
    }
  }
}
</style>
