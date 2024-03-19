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
              <t-form-item label="医院ID" name="status">
                <t-input
                  v-model="formData.userId"
                  class="form-item-content`"
                  type="search"
                  placeholder="请输入医院ID"
                />
              </t-form-item>
            </t-col>
            <t-col>
              <t-form-item label="医院名称" name="username">
                <t-input
                  v-model="formData.username"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入医院名称"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>

        <t-col :span="2" class="operation-container">
          <t-button theme="primary" @click="addUser">添加</t-button>
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
        <template #hospital_image="{ row }">
          <t-image :src="row.hospital_image" fit="cover" :style="{ width: '60px', height: '60px' }" />
        </template>
        <template #op="slotProps">
          <a class="t-button-link" @click="rehandleClickOp(slotProps)">编辑</a>
          <a
            class="t-button-link"
            @click="handleClickPower(slotProps)"
            v-if="roles.includes('Permission') || roles.includes('ALL_ROUTERS')"
            >权限</a
          >
          <a class="t-button-link" @click="handleClickDelete(slotProps)">删除</a>
        </template>
      </t-table>
      <t-dialog
        header="确认删除当前所选项？"
        :body="confirmBody"
        :visible.sync="confirmVisible"
        @confirm="onConfirmDelete"
        :onCancel="onCancel"
      >
      </t-dialog>
    </div>

    <!-- 权限选择 -->
    <t-dialog :visible.sync="visible" width="550px" header="权限配置" @confirm="confirm">
      <t-transfer :data="list" v-model="targetValue" />
    </t-dialog>
  </div>
</template>
<script>
import { prefix } from '@/config/global';
import Trend from '@/components/trend/index.vue';
import { deleteHospital } from '@/api/home';

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

      // 表格数据
      data: [],
      dataLoading: false,
      value: 'first',

      // 表格头
      columns: [
        {
          title: '医院ID',
          fixed: 'left',
          width: 150,
          align: 'center',
          ellipsis: true,
          colKey: 'hospital_id',
        },
        {
          title: '医院名称',
          width: 200,
          ellipsis: true,
          colKey: 'hospital_name',
        },
        {
          title: '城市',
          width: 150,
          ellipsis: true,
          colKey: 'hospital_city',
        },
        {
          title: '地址',
          width: 200,
          ellipsis: true,
          colKey: 'hospital_address',
        },
        {
          title: '图片',
          width: 200,
          ellipsis: true,
          colKey: 'hospital_image',
        },
        {
          title: '级别',
          width: 200,
          ellipsis: true,
          colKey: 'hospital_level',
        },
        {
          align: 'left',
          fixed: 'right',
          width: 200,
          colKey: 'op',
          title: '操作',
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
      list: [],
      targetValue: [],
      visible: false,
      selectUserId: null,
      roles: [],
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
    this.roles = this.$store.getters['user/roles'];
  },
  methods: {
    /**
     * 获取列表数据
     */
    initData() {
      this.$request
        .get('/hospital')
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
      this.$router.push({ path: '/hospital/formEdit', query: { data: row, operate: '修改' } });
    },
    handleClickDelete(row) {
      this.deleteIdx = row.row.hospital_id;
      this.confirmVisible = true;
    },
    onConfirmDelete() {
      deleteHospital(this.deleteIdx).then((res) => {
        this.pagination.total = this.data.length;
        this.initData();
        this.confirmVisible = false;
        this.$message.success('删除成功');
      });
    },
    onCancel() {
      this.resetIdx();
    },
    resetIdx() {
      this.deleteIdx = -1;
    },
    query() {
      this.dataLoading = true;
      this.$request
        .get('user/' + this.formData.userId)
        .then((res) => {
          this.data = [];
          this.data.push(res);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.dataLoading = false;
        });
    },
    addUser() {
      this.$router.push('/hospital/formEdit');
    },

    /**
     * 点击权限按钮
     */
    async handleClickPower(item) {
      this.visible = true;
      const allPermission = await this.$request.get('/permission');
      const owerPermission = await this.$request.get('/permission/getPermissionByUserId?userId=' + item.row.user_id);

      this.selectUserId = item.row.user_id;

      this.list = [];
      for (let item of allPermission) {
        this.list.push({
          label: item.describe,
          value: item.name,
        });
      }

      this.targetValue = [];
      for (let item of owerPermission) {
        this.targetValue.push(item.name);
      }
    },

    /**
     * 确定选择权限（修改用户权限）
     */
    async confirm() {
      const res = await this.$request.patch('/permission/' + this.selectUserId, {
        list: this.targetValue,
      });
      if (res == '修改成功') {
        this.$message.success('修改成功');
        this.visible = false;
      }
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
