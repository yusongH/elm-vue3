<template>
  <!-- 头部 -->
  <van-nav-bar title="登录">
    <template #left>
      <van-icon name="search" size="18" />
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
      <van-swipe-item>
        <van-grid :border="false">
          <!-- <van-grid-item v-for="item in 8">
            <van-image
              width="1.12rem"
              height="1.12rem"
              src="https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg"
            />
            <span class="desc">甜品饮料</span>
          </van-grid-item> -->
        </van-grid>
      </van-swipe-item>
      <van-swipe-item>
        <van-grid :border="false">
          <!-- <van-grid-item v-for="item in 8">
            <van-image
              width="1.12rem"
              height="1.12rem"
              src="https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg"
            />
            <span class="desc">甜品饮料</span>
          </van-grid-item> -->
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
    <div class="content">
      <ul>
        <li>
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
                <span class="top-left-tag">品牌</span>
                <span>效果演示</span>
              </div>
              <div class="top-right">
                <span>保</span>
                <span>准</span>
                <span>票</span>
              </div>
            </div>
            <div class="detail-middle">
              <div class="middle-left">
                <van-rate
                  v-model="rate"
                  readonly
                  size="0.26667rem"
                  color="#ff9a0d"
                />
                <span class="nmber">4.6</span>
                <span class="monthly-sale">月售199单</span>
              </div>
              <div class="middle-right">
                <span class="middle-right-send">蜂鸟转送</span>
                <span class="middle-right-arrive">准时达</span>
              </div>
            </div>
            <div>
              <div class="bottom-left">
                <span class="bottom-left-inner">￥20起送</span>
                <span class="bottom-left-inner">/</span>
                <span class="bottom-left-inner">配送费约5￥</span>
              </div>
              <div class="bottom-right">
                <span class="bottom-right-inner">10公里</span>
                <span class="bottom-right-inner">/</span>
                <span class="bottom-right-inner blue">40分钟</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const rate = ref(1)
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

  .content {
    li {
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
}
</style>
