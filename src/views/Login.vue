<template>
  <van-nav-bar
    title="登录"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  ></van-nav-bar>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      >
      </van-field>
      <van-field
        v-model="password"
        :type="passwordType"
        name="password"
        label="密码"
        placeholder="密码"
        :password="isShowPassword"
        :right-icon="isShowPassword ? 'eye-o' : 'closed-eye'"
        @click-right-icon="clickPasswordIcon"
        :rules="[{ required: true, message: '请填写密码' }]"
      ></van-field>
      <van-field
        v-model="captchasCode"
        type="text"
        name="captchasCode"
        label="验证码"
        placeholder="验证码"
        @click-right-icon="clickCaptchasCodeIcon"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #right-icon>
          <div v-if="captchasBase64" class="captchas-box">
            <img class="captchas-img" :src="captchasBase64" />
          </div>
        </template>
      </van-field>
    </van-cell-group>
    <p class="login-tips">温馨提示：未注册过的账号，登录时将自动注册</p>
    <p class="login-tips">注册过的用户可凭账号密码登录</p>
    <div class="submit-box">
      <van-button round block type="primary" native-type="submit"
        >提交</van-button
      >
    </div>
  </van-form>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getCaptchas, accountLogin } from 'api'
import { Toast } from 'vant'

export default defineComponent({
  name: 'Login',
  setup() {
    // 获取router实例
    const router = useRouter()
    // 返回上一页
    const onClickLeft = () => {
      router.back()
    }

    // 获取vuex实例
    const store = useStore()

    // 是否显示密码
    const isShowPassword = ref(false)
    // 由于vant没有该配置，通过修改field的type来显示和隐藏密码
    const passwordType = computed(() =>
      isShowPassword.value ? 'text' : 'password'
    )
    /**
     * 点击是否显示密码
     */
    const clickPasswordIcon = () => {
      isShowPassword.value = !isShowPassword.value
    }

    // 获取验证码
    const captchasBase64 = ref('')
    const getCaptchasBase64 = async () => {
      const res = await getCaptchas()
      if (res.status === 1) {
        captchasBase64.value = res.code
      }
    }
    getCaptchasBase64()
    /**
     * 点击验证码重新获取验证码
     */
    const clickCaptchasCodeIcon = () => {
      getCaptchasBase64()
    }

    // 用户信息
    const userInfo = reactive({
      username: '', // 账号
      password: '', // 密码
      captchasCode: '' // 验证码
    })

    /**
     * 提交登录
     */
    const onSubmit = async value => {
      const { username, password, captchasCode } = value
      // 检验用户名、密码、验证码
      const res = await accountLogin(username, password, captchasCode)
      console.log('===', res)
      if (res.status === 0) {
        // 登录失败，重新获取验证码
        getCaptchasBase64()
        // 清空验证码
        userInfo.captchasCode = ''
        // 提示
        Toast.fail(res.message)
      } else {
        // 登录成功，保存用户信息
        store.commit('user/saveUserInfo', res)
      }
    }

    return {
      ...toRefs(userInfo),
      captchasBase64,
      onSubmit,
      onClickLeft,
      isShowPassword,
      passwordType,
      clickPasswordIcon,
      clickCaptchasCodeIcon
    }
  }
})
</script>

<style lang="less" scoped>
.captchas-box {
  .captchas-img {
    height: 24px;
    vertical-align: middle;
  }
}

.login-tips {
  padding: 0 20px;
  font-size: 14px;
  color: @font-color;
}

.submit-box {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
