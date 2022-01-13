<template>
  <div class="shop-content">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <div class="shop-item" v-for="item in shopList" :key="item.id">
        <div class="image">
          <van-image
            width="100%"
            height="100%"
            src="http://elm.cangdu.org/img/164ad0b6a3917599.jpg"
          />
        </div>
        <div class="detail">
          <div>
            <div class="top-left ellipsis">
              <span class="top-left-tag" v-if="item.is_premium">品牌</span>
              <span>{{ item.name }}</span>
            </div>
            <div class="top-right">
              <span v-for="subItem in item.supports" :key="subItem.id">
                {{ subItem.icon_name }}
              </span>
            </div>
          </div>
          <div class="detail-middle">
            <div class="middle-left">
              <van-rate
                v-model="item.rating"
                readonly
                allow-half
                size="0.26667rem"
                color="#ff9a0d"
              />
              <span class="nmber">{{ item.rating }}</span>
              <span class="monthly-sale">
                月售{{ item.recent_order_num }}单
              </span>
            </div>
            <div class="middle-right">
              <span v-if="item.delivery_mode" class="middle-right-send">{{
                item.delivery_mode.text
              }}</span>
              <span
                v-if="onTimeStatus(item.supports)"
                class="middle-right-arrive"
                >准时达</span
              >
            </div>
          </div>
          <div>
            <div class="bottom-left">
              <span class="bottom-left-inner"
                >￥{{ item.float_minimum_order_amount }}起送</span
              >
              <span class="bottom-left-inner">/</span>
              <span class="bottom-left-inner">{{
                item.piecewise_agent_fee.tips
              }}</span>
            </div>
            <div class="bottom-right">
              <span class="bottom-right-inner">{{ item.distance }}</span>
              <span class="bottom-right-inner">/</span>
              <span class="bottom-right-inner blue">{{
                item.order_lead_time
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, reactive, toRefs, defineExpose } from 'vue'
import { getShopList } from 'api'

// 声明props start
const props = defineProps({
  geohash: {
    type: String,
    default: ''
  },
  longitude: {
    type: String,
    default: ''
  },
  latitude: {
    type: String,
    default: ''
  },
  restaurantCategoryId: {
    type: [Number, String],
    default: ''
  },
  screenTypeId: {
    type: [Number, String],
    default: ''
  },
  sortType: {
    type: Number,
    default: 0
  },
  deliveryId: {
    type: String,
    default: ''
  },
  supportIds: {
    type: Array,
    default: () => []
  }
})

const {
  latitude,
  longitude,
  restaurantCategoryId,
  screenTypeId,
  sortType,
  deliveryId,
  supportIds
} = toRefs(props)
// 声明props end

// 获取店铺列表 start
const loading = ref(false) // 加载列表的loading
const finished = ref(false) // 是否全部加载完毕
const offset = ref(0) // 每次加载的其实页下标
const shopList = reactive([]) // 商店列表

// 侦听，重新获取数据
watch([latitude, screenTypeId, sortType], () => {
  // 获取商店数据
  initData()
})
/**
 * 商店列表初始获取数据方法
 */
const initData = async () => {
  // 显示loading
  loading.value = true

  // 每次请求20条
  offset.value = 0

  const res = await getShopList(
    latitude.value,
    longitude.value,
    offset.value,
    restaurantCategoryId.value,
    screenTypeId.value,
    sortType.value,
    deliveryId.value,
    supportIds.value
  )
  if (res.status !== 0) {
    // 隐藏loading
    loading.value = false
    // 追加数据
    shopList.push(...res)
    // 是否加载完全部数据
    if (res.length < 20) {
      finished.value = true
    }
  }
}

/**
 * 商店列表下拉加载方法
 */
const onLoad = async () => {
  // 显示loading
  loading.value = true

  // 每次请求20条
  offset.value += 20

  const res = await getShopList(
    latitude.value,
    longitude.value,
    offset.value,
    restaurantCategoryId.value,
    screenTypeId.value,
    sortType.value,
    deliveryId.value,
    supportIds.value
  )
  if (res.status !== 0) {
    // 隐藏loading
    loading.value = false
    // 追加数据
    shopList.push(...res)
    // 是否加载完全部数据
    if (res.length < 20) {
      finished.value = true
    }
  }
}

// 是否准时
const onTimeStatus = supports => {
  let status = false
  if (supports instanceof Array && supports.length) {
    supports.forEach(item => {
      if (item.icon_name === '准') {
        status = true
      }
    })
  }
  return status
}

// 获取店铺列表 end

// 暴露组件方法和属性
defineExpose({
  initData
})
</script>

<style lang="less" scoped>
.shop-content {
  height: 100%;
  .shop-item {
    padding: 16px 10px;
    display: flex;
    border: 1px solid #f1f1f1;
    .image {
      width: 64px;
      height: 64px;
    }

    .detail {
      flex: 1;
      padding: 0 6px;
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: @font-size-12;

        .top-left {
          font-weight: 700;
          width: 200px;
          .top-left-tag {
            padding: 0 4px;
            margin-right: 4px;
            background-color: #ffd930;
          }
        }

        .top-right {
          transform: scale(0.8);
          display: flex;
          margin-right: -6px;
          span {
            color: #999;
            border: 1px solid #f1f1f1;
            padding: 0 2px;
            border-radius: 2px;
            margin-left: 2px;
          }
        }

        &.detail-middle {
          margin: 10px 0px;
          .middle-left {
            .nmber {
              color: #ff6000;
              margin: 0 6px;
            }
            .monthly-sale {
              display: inline-block;
              transform: scale(0.8);
              color: #666;
            }
          }

          .middle-right {
            transform: scale(0.8);
            margin-right: -8px;
            .middle-right-send {
              color: #fff;
              background-color: @theme-color;
              border: 1px solid @theme-color;
              padding: 0 2px;
            }

            .middle-right-arrive {
              color: @theme-color;
              border: 1px solid @theme-color;
              padding: 0 2px;
            }
          }
        }

        .bottom-left {
          margin-left: -4px;
          .bottom-left-inner {
            display: inline-block;
            transform: scale(0.8);
            color: #666;
          }
        }

        .bottom-right {
          margin-right: -4px;
          .bottom-right-inner {
            display: inline-block;
            transform: scale(0.8);
            color: #666;
            &.blue {
              color: @theme-color;
            }
          }
        }
      }
    }
  }
}
</style>
