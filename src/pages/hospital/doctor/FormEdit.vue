<template>
    <t-card :bordered="false">
      <t-form
        ref="form"
        :data="formData"
        :rules="FORM_RULES"
        label-align="top"
        :label-width="100"
        @reset="onReset"
        @submit="onSubmit"
      >
        <div class="form-basic-container">
          <div class="form-basic-item">
            <div class="form-basic-container-title"></div>
            <!-- 表单内容 -->
  
            <!-- 合同名称,合同类型 -->
            <t-row class="row-gap" :gutter="[16, 24]">  
              <t-col :span="8">
                <t-form-item label="账号" name="account">
                  <t-input v-model="formData.account" :style="{ width: '322px' }" placeholder="请输入账号"></t-input>
                </t-form-item>
              </t-col>
              <t-col :span="8">
                <t-form-item label="密码" name="password">
                  <t-input v-model="formData.password" :style="{ width: '322px' }" placeholder="请输入密码"></t-input>
                </t-form-item>
              </t-col>
              <t-col :span="8">
                <t-form-item label="用户头像" name="avatar">
                  <t-upload
                    ref="uploadRef2"
                    :action="'http://localhost:3000/multer/upload?userId=' + userId"
                    theme="image"
                    accept="image/*"
                    :draggable="true"
                    @success="onSuccess"
                  ></t-upload>
                </t-form-item>
              </t-col>
              <t-col :span="8">
                <t-form-item label="用户名" name="username">
                  <t-input v-model="formData.username" :style="{ width: '322px' }" placeholder="请输入用户名"></t-input>
                </t-form-item>
              </t-col>
              <t-col :span="8">
                <t-form-item label="职称" name="title">
                  <t-input v-model="formData.title" :style="{ width: '322px' }" placeholder="请输入职称"></t-input>
                </t-form-item>
              </t-col>
              <t-col :span="8">
                <t-form-item label="擅长项" name="expertise">
                  <t-input v-model="formData.expertise" :style="{ width: '322px' }" placeholder="请输入擅长项"></t-input>
                </t-form-item>
              </t-col>
              <t-col :span="8">
                <t-form-item label="挂号费" name="registration_fee">
                  <t-input v-model="formData.registration_fee" :style="{ width: '322px' }" placeholder="请输入挂号费"></t-input>
                </t-form-item>
              </t-col>
            </t-row>
          </div>
        </div>
  
        <div class="form-submit-container">
          <div class="form-submit-sub">
            <div class="form-submit-left">
              <t-button theme="primary" class="form-submit-confirm" type="submit"> 提交 </t-button>
              <t-button type="reset" class="form-submit-cancel" theme="default" variant="base"> 取消 </t-button>
            </div>
          </div>
        </div>
      </t-form>
    </t-card>
  </template>
  
  <script>
  import { prefix } from '@/config/global';
  
  const FORM_RULES = {
    user_type: [{ required: true, message: '请选择用户类型', type: 'error' }],
    username: [{ required: true, message: '请输入用户名', type: 'error' }],
    password: [{ required: true, message: '请输入密码', type: 'error' }],
    account: [{ required: true, message: '请输入账号', type: 'error' }],
  };
  
  export default {
    name: 'FormEdit',
    data() {
      return {
        prefix,
        stepSuccess: true,
        formData: {},
        FORM_RULES,
        userId: null,
      };
    },
    mounted() {
      if (this.$route.query.data != undefined) {
        this.formData = this.$route.query.data;
      }
      this.userId = this.$store.state.user.userInfo.user_id;
    },
    methods: {
      onReset() {
        this.$message.warning('取消新建');
      },
      onSubmit({ validateResult }) {
        if (validateResult === true) {
          if (this.$route.query.operate == '修改') {
            console.log('修改');
            this.$request
              .patch(`/user/${this.formData.user_id}`, this.formData)
              .then((res) => {
                console.log(res);
                this.$message.success('修改成功');
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            console.log('添加');
            this.formData.user_type = '1'
            this.$request
              .post('/user', this.formData)
              .then((res) => {
                this.$message.success('添加成功');
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      },
      onSuccess(params) {
        this.formData.avatar = params.response.data.url;
      },
    },
  };
  </script>
  <style lang="less" scoped>
  @import '@/style/variables.less';
  
  .form-basic-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--td-bg-color-container);
    padding: 0 32px 134px;
  
    @media (max-width: @screen-sm-max) {
      padding: 0 32px 67px;
  
      .form-basic-container-title {
        margin: 32px 0 32px;
      }
    }
  
    .form-basic-item {
      width: 676px;
  
      .form-basic-container-title {
        font-size: 20px;
        line-height: 24px;
        color: var(--td-text-color-primary);
        margin: var(--td-comp-size-xxxl) 0 32px;
      }
    }
  }
  
  .form-submit-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 28px;
    background-color: var(--td-bg-color-component);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  
    .form-submit-sub {
      width: 676px;
      display: flex;
      align-items: center;
      justify-content: space-between;
  
      .form-submit-left {
        .form-submit-upload-span {
          font-size: 14px;
          line-height: 22px;
          color: var(--td-text-color-placeholder);
          padding-top: 8px;
          display: inline-block;
        }
      }
    }
  }
  </style>
  