<template>
  <!-- 头部 -->
  <van-nav-bar
    title="我的"
    left-arrow
    @click-left="router.go(-1)"
  ></van-nav-bar>

  <!-- 我的信息 -->
  <div class="my-info">
    <div class="user-info">
      <div class="avatar">
        <svg>
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#avatar-default"
          ></use>
        </svg>
      </div>
      <div class="other-info">
        <div class="nick-name">{{ userName }}</div>
        <div class="phone-number">
          <span class="icon-mobile">
            <svg fill="#fff">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#mobile"
              ></use>
            </svg>
          </span>
          <span class="phone-text">{{ phoneNumber }}</span>
        </div>
      </div>
      <div class="arrow-icon">
        <van-icon name="arrow" color="#fff" />
      </div>
    </div>
    <div class="account-info">
      <van-row>
        <van-col span="8">
          <div class="account-item">
            <div class="account-top"></div>
            <div class="account-bottom"></div>
          </div>
        </van-col>
        <van-col span="8">span: 8</van-col>
        <van-col span="8">span: 8</van-col>
      </van-row>
    </div>
  </div>

  <!-- 订单、积分、会员卡 -->

  <!-- 服务中心、下载饿了么APP -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
// 用户信息 start
const userName = ref('登录/注册') // 用户名
const phoneNumber = ref('暂无绑定手机号') // 电话号码
// 用户信息 end
</script>

<style lang="less" scoped>
.my-info {
  .user-info {
    padding: 16px 14px;
    display: flex;
    align-items: center;
    background-color: @theme-color;

    .avatar {
      width: 58px;
      height: 58px;
      border-radius: 50%;

      svg {
        background-color: #fff;
        height: 100%;
        width: 100%;
        border-radius: 50%;
      }
    }

    .other-info {
      flex-grow: 1;
      margin-left: 10px;
      color: #fff;

      .nick-name {
        font-size: 18px;
        font-weight: 700;
      }

      .phone-number {
        .icon-mobile {
          display: inline-block;
          width: 10px;
          height: 18px;
          margin-right: 4px;
          svg {
            height: 100%;
            width: 100%;
            vertical-align: middle;
          }
        }

        .phone-text {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
  .account-info {
  }
}
</style>
