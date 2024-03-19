<template>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'password'">
      <t-form-item name="account">
        <t-input v-model="formData.account" size="large" placeholder="请输入账号">
          <template #prefix-icon>
            <user-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          key="password"
          placeholder="请输入登录密码"
        >
          <template #prefix-icon>
            <lock-on-icon />
          </template>
          <template #suffix-icon>
            <browse-icon v-if="showPsw" @click="showPsw = !showPsw" key="browse" />
            <browse-off-icon v-else @click="showPsw = !showPsw" key="browse-off" />
          </template>
        </t-input>
      </t-form-item>

      <div class="check-container remember-pwd">
        <t-checkbox :checked="isSaveAccount" @change="isSaveAccount = !isSaveAccount">记住账号</t-checkbox>
      </div>
    </template>

    <t-form-item v-if="type !== 'qrcode'" class="btn-container">
      <t-button block size="large" type="submit"> 登录 </t-button>
    </t-form-item>
  </t-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { login } from '@/api/home';
import QrcodeVue from 'qrcode.vue';
import { UserIcon, LockOnIcon, BrowseOffIcon, BrowseIcon, RefreshIcon } from 'tdesign-icons-vue';
import { onMounted } from 'tdesign-vue/es/tree/adapt';
import { getSelftItemList } from '@/pages/dashboard/base';
import store from '@/store/index';
import { USER_INFO_LIST } from '@/service/service-user';

const INITIAL_DATA = {
  phone: '',
  account: '',
  password: '',
  verifyCode: '',
  checked: false,
};

const FORM_RULES = {
  phone: [{ required: true, message: '手机号必填', type: 'error' }],
  account: [{ required: true, message: '账号必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
  verifyCode: [{ required: true, message: '验证码必填', type: 'error' }],
};

/** 高级详情 */
export default Vue.extend({
  name: 'Login',
  components: {
    QrcodeVue,
    UserIcon,
    LockOnIcon,
    BrowseOffIcon,
    BrowseIcon,
    RefreshIcon,
  },
  data() {
    return {
      FORM_RULES,
      type: 'password',
      formData: { ...INITIAL_DATA },
      showPsw: false,
      countDown: 0,
      intervalTimer: null,
      isSaveAccount: false,
    };
  },
  beforeDestroy() {
    clearInterval(this.intervalTimer);
  },
  mounted() {
    if (localStorage.getItem('isSaveAccount') === 'true') {
      this.formData.account = localStorage.getItem('username');
      this.formData.password = atob(localStorage.getItem('password'));
      this.isSaveAccount = true;
    }
  },
  methods: {
    switchType(val) {
      this.type = val;
      this.$refs.form.reset();
    },

    /**
     * 点击登录按钮
     */
    async onSubmit({ validateResult }) {
      if (validateResult === true) {
        const res = await login(this.formData);

        // 记住密码
        localStorage.setItem('isSaveAccount', this.isSaveAccount);
        if (this.isSaveAccount) {
          localStorage.setItem('username', this.formData.account);
          localStorage.setItem('password', btoa(this.formData.password));
        }

        this.$message.success('登录成功');
        this.$store.commit('user/setToken', res.authorization);
        this.$router.replace('/dashboard/base').catch(() => '');
      }
    },
    handleCounter() {
      this.countDown = 60;
      this.intervalTimer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown -= 1;
        } else {
          clearInterval(this.intervalTimer);
          this.countDown = 0;
        }
      }, 1000);
    },
  },
});
</script>
