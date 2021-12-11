<template>
  <!-- 头部 -->
  <van-nav-bar
    :title="headTitle"
    left-arrow
    @click-left="router.go(-1)"
  ></van-nav-bar>

  <!-- 分类下拉菜单 -->
  <van-dropdown-menu active-color="#3190e8">
    <van-dropdown-item ref="droItemCateRef" class="classify" title="分类">
      <div class="class-left">
        <ul>
          <li
            v-for="(item, index) in categoryList"
            :key="item.id"
            :class="{ 'cate-active': item.id == restaurantCategoryId }"
            @click="clickCate(item.id, index)"
          >
            <div class="class-left-item">
              <van-image
                v-if="index"
                class="cate-id"
                :src="getImgPath(item.image_url)"
                height="0.4rem"
                width="0.4rem"
              ></van-image>
              <span>{{ item.name }}</span>
            </div>
            <div class="class-left-item">
              <span class="icon-num">{{ item.count }}</span>
              <van-icon name="arrow" size="0.24rem" />
            </div>
          </li>
        </ul>
      </div>
      <div class="class-right">
        <ul>
          <li
            v-for="item in screenTypeList"
            :key="item.id"
            @click="screenTypeClick(item.id, item.name)"
          >
            <div>{{ item.name }}</div>
            <div>{{ item.count }}</div>
          </li>
        </ul>
      </div>
    </van-dropdown-item>
    <van-dropdown-item title="排序" v-model="value2" :options="sortOptions" />
    <van-dropdown-item class="screening" title="筛选" v-model="value2">
      <div>
        <div class="screening-title">配送方式</div>
        <div class="screening-cont">
          <tick-button @click="tickBtnClick">
            <template #icon>
              <svg>
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="#fengniao"
                ></use>
              </svg>
            </template>
            蜂鸟专送
          </tick-button>
        </div>
      </div>
      <div>
        <div class="screening-title">商家属性（可以多选）</div>
        <div class="screening-cont">
          <tick-button svgId="fengniao"></tick-button>
        </div>
      </div>
      <!-- 确认操作区 -->
      <div class="operate-area">
        <van-button size="small" plain type="primary">清空</van-button>
        <van-button size="small" type="primary">确定</van-button>
      </div>
    </van-dropdown-item>
  </van-dropdown-menu>

  <!-- 商店列表 -->
  <shop-list></shop-list>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ShopList from '@/components/ShopList.vue'
import TickButton from '@/components/TickButton.vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getAddress, getFoodCategory } from 'api'
import { SAVE_ADDRESS } from '@/store/mutation-types.js'
import { getImgPath } from 'utils/get-img-path'

const router = useRouter()
const route = useRoute()
const { state, commit } = useStore()

// 全局需要使用的数据 start
const curGeohash = ref('') // geohash
const foodTitle = ref('') // 分类下拉显示的标题
const restaurantCategoryId = ref('') // 分类id
const screenTypeId = ref('') // 筛选类型id
// 全局需要使用的数据 end

// 头部 start
const headTitle = ref('')
// 头部 end

// 下拉菜单 start
// 分类下拉 start
const categoryList = ref([]) // category分类左侧数据
const screenTypeList = ref([]) // category分类右侧数据
const droItemCateRef = ref('droItemCateRef') // 分类下拉组件

/**
 * 分类左侧点击，右侧渲染相应的sub_categories列表
 * @param {number} id 分类id
 * @param {number} index 下标
 */
const clickCate = (id, index) => {
  // 第一个选项 -- 全部商家 因为没有自己的列表，所以点击则默认获取选所有数据
  if (index === 0) {
    screenTypeId.value = null
    // 收起下拉
    droItemCateRef.value?.toggle()
  } else {
    // 不是第一个选项时，右侧展示其子级sub_categories的列表
    restaurantCategoryId.value = id
    screenTypeList.value = categoryList.value[index].sub_categories
  }
}

/**
 * 选中Category右侧列表的某个选项时，进行筛选，重新获取数据并渲染
 * @param {number} id 分类筛选id
 * @param {number} name 分类筛选name
 */
const screenTypeClick = (id, name) => {
  screenTypeId.value = id
  headTitle.value = name
}

// 分类下拉 end

// 排序 start
const value2 = ref('a')
const sortOptions = [
  { text: '智能排序', value: 0 },
  { text: '距离最近', value: 5 },
  { text: '销量最高', value: 6 },
  { text: '起送价最低', value: 1 },
  { text: '配送速度最快', value: 2 },
  { text: '评分最高', value: 3 }
]
// 排序 end

// 筛选 start
/**
 * 筛选的勾选按钮点击
 */
const tickBtnClick = () => {
  console.log('---=-=-=')
}
// 筛选 end

// 下拉菜单 end

// 初始化 start
/**
 * 初始化
 */
const initData = async () => {
  // 获取从home也带过来的参数
  const { title, geohash, resCategoryId } = route.query
  headTitle.value = title // 头部title
  curGeohash.value = geohash // geohash
  foodTitle.value = title // 分类下拉显示的标题
  restaurantCategoryId.value = resCategoryId // 分类id

  // 防止页面刷新vuex中的经度（latitude）丢失
  const { latitude, longitude } = state.home
  if (!latitude) {
    const res = await getAddress(curGeohash.value)
    // 保存地址信息
    commit(`home/${SAVE_ADDRESS}`, res)
  }

  // 获取category分类左侧数据
  categoryList.value = await getFoodCategory(latitude, longitude)
  // 初始化时定位当前category分类左侧默认选择项，在右侧展示出其sub_categories列表
  categoryList.value.forEach(item => {
    if (
      item.id !== undefined &&
      item.id !== null &&
      restaurantCategoryId.value === item.id.toString()
    ) {
      screenTypeList.value = item.sub_categories
    }
  })
}

// 初始化
onMounted(() => {
  initData()
})
// 初始化 end
</script>

<style lang="less" scoped>
.classify {
  :deep(.van-dropdown-item__content) {
    display: flex;
    .class-left,
    .class-right {
      flex: 1;
      max-height: 100%;
      overflow-y: auto;
    }
  }

  .class-left {
    background-color: #f1f1f1;
    li {
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      .sc(12px, #666);
      &.cate-active {
        background-color: #fff;
      }
      .class-left-item {
        height: 42px;
        line-height: 42px;
        .cate-id {
          margin-right: 6px;
          vertical-align: middle;
        }

        .icon-num {
          background-color: #ccc;
          color: #fff;
          padding: 0 4px;
          border-radius: 10px;
          margin-right: 4px;
        }
      }
    }
  }

  .class-right {
    background-color: #fff;
    li {
      height: 42px;
      line-height: 42px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      .sc(12px, #666);
      border-bottom: 1px solid #e4e4e4;
    }
  }
}

.screening {
  .sc(12px, #333);
  background-color: @theme-bgc;
  :deep(.van-dropdown-item__content) {
    padding-bottom: 10px;
  }

  .screening-title {
    height: 35px;
    line-height: 35px;
    padding-left: 10px;
  }

  .screening-cont {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    :deep(svg) {
      width: 18px;
      height: 18px;
      margin-right: 4px;
    }
  }
  .operate-area {
    padding: 6px 6px 0px;
    display: flex;
    justify-content: space-between;
    button {
      width: 48%;
    }
  }
}
</style>
