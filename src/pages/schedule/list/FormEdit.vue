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
              <t-form-item label="请选择医生" name="name">
                <t-select
                  v-model="formData.doctorId"
                  :style="{ width: '322px' }"
                  placeholder="请选择医生类型"
                  class="demo-select-base"
                  clearable
                >
                  <t-option :value="item.user_id" :label="item.username" v-for="(item, i) in doctorList" :key="i">{{
                    item.username
                  }}</t-option>
                </t-select>
              </t-form-item>
            </t-col>
            <t-col :span="8">
              <t-form-item label="日期" name="data">
                <t-date-picker v-model="formData.date"></t-date-picker>
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
import { getUserInfoByType, addScheduleList } from '@/api/home';

const FORM_RULES = {
  name: [{ required: false, message: '请输入医院名称', type: 'error' }],
  level: [{ required: false, message: '请输入医院等级', type: 'error' }],
  city: [{ required: false, message: '请输入所在城市', type: 'error' }],
  image: [{ required: false, message: '请上传医院图片', type: 'error' }],
  address: [{ required: false, message: '请输入医院地址', type: 'error' }],
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
      doctorList: [],
    };
  },
  mounted() {
    getUserInfoByType({
      type: 1,
    }).then((res) => {
      this.doctorList = res;
    });

    this.userId = this.$store.state.user.userInfo.user_id;
  },
  methods: {
    onReset() {
      this.$message.warning('取消新建');
    },
    onSubmit({ validateResult }) {
      if (validateResult === true) {
        if (this.$route.query.operate == '修改') {
          updataHospital(this.formData.id, this.formData).then((res) => {
            console.log(res);
            this.$message.success('修改成功');
          });
        } else {
          addScheduleList(this.formData).then((res) => {
            this.$message.success('添加成功');
          });
        }
      }
    },

    // OSS上传成功回调函数
    onSuccess(params) {
      this.formData.image = params.response.data.url;
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
