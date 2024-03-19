<template>
    <div class="list-common-table">
      <t-form
        ref="form"
        :data="formData"
        :label-width="80"
        colon
        @reset="onReset"
        @submit="onSubmit"
        :style="{ marginBottom: '8px' }"
      >
        <t-row>
          <t-col :span="10">
            <t-row :gutter="[16, 24]">
              <t-col>
                <t-form-item label="就诊信息ID" name="status">
                  <t-input v-model="formData.id" class="form-item-content`" type="search" placeholder="就诊信息ID" />
                </t-form-item>
              </t-col>
              <t-col>
                <t-form-item label="用户ID" name="username">
                  <t-input
                    v-model="formData.username"
                    class="form-item-content"
                    type="search"
                    placeholder="请输入ID"
                    :style="{ minWidth: '134px' }"
                  />
                </t-form-item>
              </t-col>
            </t-row>
          </t-col>
  
          <t-col :span="2" class="operation-container">
            <t-button theme="primary" type="submit" :style="{ marginLeft: '8px' }" @click="query"> 查询 </t-button>
            <t-button type="reset" variant="base" theme="default"> 重置 </t-button>
          </t-col>
        </t-row>
      </t-form>
      <div class="table-container">
        <t-table
          :data="data"
          :columns="columns"
          :rowKey="rowKey"
          :verticalAlign="verticalAlign"
          :hover="hover"
          :pagination="pagination"
          @page-change="rehandlePageChange"
          @change="rehandleChange"
          :loading="dataLoading"
          :headerAffixedTop="true"
        >
          <template #prescription_link="{ row }">
            <t-image :src="row.prescription_link" fit="cover" :style="{ width: '200px', height: '200px' }" />
          </template>
          <template #op="slotProps">
            <a class="t-button-link" @click="rehandleClickOp(slotProps)">编辑</a>
            <a class="t-button-link" @click="handleClickDelete(slotProps)">删除</a>
          </template>
        </t-table>
        <t-dialog
          header="确认删除当前所选合同？"
          :body="confirmBody"
          :visible.sync="confirmVisible"
          @confirm="onConfirmDelete"
          :onCancel="onCancel"
        >
        </t-dialog>
      </div>
    </div>
  </template>
  <script>
  import { prefix } from '@/config/global';
  import Trend from '@/components/trend/index.vue';
  
  import {
    CONTRACT_STATUS,
    CONTRACT_STATUS_OPTIONS,
    CONTRACT_TYPES,
    CONTRACT_TYPE_OPTIONS,
    CONTRACT_PAYMENT_TYPES,
  } from '@/constants';
  
  export default {
    name: 'list-table',
    components: {
      Trend,
    },
    data() {
      return {
        CONTRACT_STATUS,
        CONTRACT_STATUS_OPTIONS,
        CONTRACT_TYPES,
        CONTRACT_TYPE_OPTIONS,
        CONTRACT_PAYMENT_TYPES,
        prefix,
        formData: {
          // name: '',
          // no: undefined,
          // status: undefined,
        },
        data: [],
        dataLoading: false,
        value: 'first',
        columns: [
          {
            title: '就诊信息ID',
            fixed: 'left',
            width: 50,
            align: 'center',
            ellipsis: true,
            colKey: 'medical_info_id',
          },
          {
            title: '用户ID',
            fixed: 'left',
            width: 50,
            align: 'center',
            ellipsis: true,
            colKey: 'user.user_id',
          },
          {
            title: '就诊人名称',
            width: 100,
            ellipsis: true,
            colKey: 'name',
          },
          {
            title: '就诊卡号',
            width: 100,
            ellipsis: true,
            colKey: 'id_card',
          },
          {
            title: '电话号码',
            width: 100,
            ellipsis: true,
            colKey: 'medical_card_number',
          },
        ],
        rowKey: 'index',
        tableLayout: 'auto',
        verticalAlign: 'top',
        bordered: true,
        hover: true,
        rowClassName: (rowKey) => `${rowKey}-class`,
        // 与pagination对齐
        pagination: {
          defaultPageSize: 20,
          total: 100,
          defaultCurrent: 1,
        },
        confirmVisible: false,
        deleteIdx: -1,
      };
    },
    computed: {
      confirmBody() {
        if (this.deleteIdx > -1) {
          // const { username } = this.data?.[this.deleteIdx];
          return `删除后，所有信息将被清空，且无法恢复`;
        }
        return '';
      },
      offsetTop() {
        return this.$store.state.setting.isUseTabsRouter ? 48 : 0;
      },
    },
    mounted() {
      this.dataLoading = true;
      this.initData();
    },
    methods: {
      initData() {
        this.$request
          .get('medical-info')
          .then((res) => {
            this.data = res;
            this.pagination = {
              ...this.pagination,
              total: this.data.length,
            };
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            this.dataLoading = false;
          });
      },
      getContainer() {
        return document.querySelector('.tdesign-starter-layout');
      },
      onReset(data) {
        console.log(data);
      },
      onSubmit(data) {
        console.log(data);
      },
      rehandlePageChange(curr, pageInfo) {
        console.log('分页变化', curr, pageInfo);
      },
      rehandleChange(changeParams, triggerAndData) {
        console.log('统一Change', changeParams, triggerAndData);
      },
      rehandleClickOp({ text, row }) {
        this.$router.push({ path: '/user/formEdit', query: { data: row, operate: '修改' } });
      },
      handleClickDelete(row) {
        this.deleteIdx = row.row.user_id;
        this.confirmVisible = true;
      },
      onConfirmDelete() {
        this.$request
          .delete('/user/' + this.deleteIdx)
          .then((res) => {
            this.initData();
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            this.dataLoading = false;
          });
  
        this.pagination.total = this.data.length;
        this.confirmVisible = false;
        this.$message.success('删除成功');
        // this.resetIdx();
      },
      onCancel() {
        this.resetIdx();
      },
      resetIdx() {
        this.deleteIdx = -1;
      },
      query() {
        this.$request.get('/prescription/getPrescriptionById?id=' + this.formData.id).then((res) => {
          this.data = res;
          this.pagination = {
            ...this.pagination,
            total: this.data.length,
          };
        });
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
  @import '@/style/variables.less';
  
  .list-common-table {
    background-color: var(--td-bg-color-container);
    padding: 30px 32px;
    border-radius: var(--td-radius-default);
  }
  
  .form-item-content {
    width: 100%;
  }
  
  .operation-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  
  .payment-col {
    display: flex;
  
    .trend-container {
      display: flex;
      align-items: center;
      margin-left: 8px;
    }
  }
  .t-button + .t-button {
    margin-left: var(--td-comp-margin-s);
  }
  </style>
  