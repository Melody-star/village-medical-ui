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
              <t-form-item label="医院名称" name="name">
                <t-input v-model="formData.name" :style="{ width: '322px' }" placeholder="请输入医院名称"></t-input>
              </t-form-item>
            </t-col>
            <t-col :span="8">
              <t-form-item label="级别" name="level">
                <t-input v-model="formData.level" :style="{ width: '322px' }" placeholder="请输入医院级别"></t-input>
              </t-form-item>
            </t-col>
            <t-col :span="8">
              <t-form-item label="城市" name="city">
                <t-input v-model="formData.city" :style="{ width: '322px' }" placeholder="请输入所在城市"></t-input>
              </t-form-item>
            </t-col>
            <t-col :span="8">
              <t-form-item label="医院图片" name="image">
                <t-upload
                  ref="uploadRef2"
                  W
                  :action="'http://localhost:3000/multer/upload'"
                  theme="image"
                  accept="image/*"
                  :draggable="true"
                  @success="onSuccess"
                ></t-upload>
              </t-form-item>
            </t-col>
            <t-col :span="8">
              <t-form-item label="医院地址" name="address">
                <t-input v-model="formData.address" :style="{ width: '322px' }" placeholder="请输入医院地址"></t-input>
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
import { addHospital, updataHospital } from '@/api/home';

const FORM_RULES = {
  name: [{ required: true, message: '请输入医院名称', type: 'error' }],
  level: [{ required: true, message: '请输入医院等级', type: 'error' }],
  city: [{ required: true, message: '请输入所在城市', type: 'error' }],
  image: [{ required: false, message: '请上传医院图片', type: 'error' }],
  address: [{ required: true, message: '请输入医院地址', type: 'error' }],
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
      this.formData = {
        id: this.$route.query.data.hospital_id,
        name: this.$route.query.data.hospital_name,
        level: this.$route.query.data.hospital_level,
        city: this.$route.query.data.hospital_city,
        image: this.$route.query.data.hospital_image,
        address: this.$route.query.data.hospital_address,
      };
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
          updataHospital(this.formData.id, this.formData).then((res) => {
            console.log(res);
            this.$message.success('修改成功');
          });
        } else {
          addHospital(this.formData).then((res) => {
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
