<template>
  <t-card :bordered="false">
    <div class="table-tree-container">
      <div class="list-tree-wrapper">
        <div class="list-tree-operator">
          <t-input v-model="filterText" @input="onInput" placeholder="请输入关键词">
            <search-icon slot="suffix-icon" size="20px" />
          </t-input>
          <t-tree :data="items" hover expand-on-click-node :default-expanded="expanded" :filter="filterByText" />
        </div>
        <div class="list-tree-content">
          <common-table />
        </div>
      </div>
    </div>
  </t-card>
</template>

<script>
import { SearchIcon } from 'tdesign-icons-vue';
import CommonTable from '../components/CommonTable.vue';
import { get } from 'lodash';

export default {
  name: 'ListTree',
  components: {
    SearchIcon,
    CommonTable,
  },
  data() {
    return {
      data: [],
      filterText: '',
      filterByText: null,
      options: [
        {
          label: '一级操作',
          value: '1',
        },
        {
          label: '二级操作',
          value: '2',
        },
      ],
      value: 'first',
      expanded: ['0', '0-0', '0-1', '0-2', '0-3', '0-4'],
      items: [],
    };
  },
  mounted(){
    // 获取所有医院
    this.$request.get('/hospital').then(res=>{
      for(const item of res){
        this.items.push({
          label:item.hospital_name
        })
      }
    })
  },
  methods: {
    onInput() {
      this.filterByText = (node) => {
        const rs = node.label.indexOf(this.filterText) >= 0;
        return rs;
      };
    },
    rehandleClickOp({ text, row }) {
      console.log(text, row);
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.table-tree-container {
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-default);

  .t-tree {
    margin-top: 24px;
  }
}

.list-tree-wrapper {
  overflow-y: hidden;
}

.list-tree-operator {
  width: 200px;
  float: left;
  padding: 30px 32px;
}

.list-tree-content {
  border-left: 1px solid var(--td-component-border);
  overflow: auto;
}
</style>
