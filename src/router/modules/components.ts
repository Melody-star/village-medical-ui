import { ViewModuleIcon, Edit1Icon, LayersIcon } from 'tdesign-icons-vue';
import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/base',
    meta: { title: '用户', icon: ViewModuleIcon },
    children: [
      {
        path: 'filter',
        name: 'ListFilter',
        component: () => import('@/pages/list/filter/index.vue'),
        meta: { title: '用户列表' },
      },
      {
        path: 'formEdit',
        name: 'ListFormEdit',
        component: () => import('@/pages/list/components/FormEdit.vue'),
      },
      {
        path: 'Prescription',
        name: 'ListPrescription',
        component: () => import('@/pages/list/components/Prescription.vue'),
        meta: { title: '处方管理' },
      },
      {
        path: 'visitinformation',
        name: 'visitInformation',
        component: () => import('@/pages/list/components/visitinformation.vue'),
        meta: { title: '就诊信息' },
      },
    ],
  },
  {
    path:'/schedule',
    name:'schedule',
    component:Layout,
    meta: { title: '排班', icon: Edit1Icon },
    children:[
      {
        path:'list',
        name:'scheduleList',
        component: () => import('@/pages/schedule/list/index.vue'),
        meta: { title: '排班列表' },
      },
      {
        path:'formEdit',
        name:'scheduleformEdit',
        component: () => import('@/pages/schedule/list/FormEdit.vue')
      }
    ]
  },
  {
    path: '/hospital',
    name: 'hospital',
    component: Layout,
    meta: { title: '医院', icon: Edit1Icon },
    children: [
      {
        path: 'list',
        name: 'hospitalList',
        component: () => import('@/pages/hospital/list/index.vue'),
        meta: { title: '医院列表' },
      },
      {
        path:'formEdit',
        name:'hospitalformEdit',
        component: () => import('@/pages/hospital/list/FormEdit.vue')
      },
      {
        path: 'doctor',
        name: 'hospitalDoctor',
        component: () => import('@/pages/hospital/doctor/index.vue'),
        meta: { title: '医生列表' },
      },
      {
        path: 'formEdit2',
        name: 'doctorFormEdit',
        component: () => import('@/pages/hospital/doctor/FormEdit.vue'),
      },
      {
        path: 'department',
        name: 'hospitalDepartment',
        component: () => import('@/pages/hospital/department/index.vue'),
        meta: { title: '科室列表' },
      },
      // {
      //   path: 'tag',
      //   name: 'hospitalTag',
      //   component: () => import('@/pages/hospital/tag/index.vue'),
      //   meta: { title: '标签管理' },
      // },
    ],
  },
  // {
  //   path: '/form',
  //   name: 'form',
  //   component: Layout,
  //   redirect: '/form/base',
  //   meta: { title: '表单页', icon: Edit1Icon },
  //   children: [
  //     {
  //       path: 'base',
  //       name: 'FormBase',
  //       component: () => import('@/pages/form/base/index.vue'),
  //       meta: { title: '基础表单页' },
  //     },
  //     {
  //       path: 'step',
  //       name: 'FormStep',
  //       component: () => import('@/pages/form/step/index.vue'),
  //       meta: { title: '分步表单页' },
  //     },
  //   ],
  // },
  // {
  //   path: '/detail',
  //   name: 'detail',
  //   component: Layout,
  //   redirect: '/detail/base',
  //   meta: { title: '详情页', icon: LayersIcon },
  //   children: [
  //     {
  //       path: 'base',
  //       name: 'DetailBase',
  //       component: () => import('@/pages/detail/base/index.vue'),
  //       meta: { title: '基础详情页' },
  //     },
  //     {
  //       path: 'advanced',
  //       name: 'DetailAdvanced',
  //       component: () => import('@/pages/detail/advanced/index.vue'),
  //       meta: { title: '多卡片详情页' },
  //     },
  //     {
  //       path: 'deploy',
  //       name: 'DetailDeploy',
  //       component: () => import('@/pages/detail/deploy/index.vue'),
  //       meta: { title: '数据详情页' },
  //     },
  //     {
  //       path: 'secondary',
  //       name: 'DetailSecondary',
  //       component: () => import('@/pages/detail/secondary/index.vue'),
  //       meta: { title: '二级详情页' },
  //     },
  //   ],
  // },
  // {
  //   path: '/frame',
  //   name: 'frame',
  //   component: Layout,
  //   redirect: '/frame/doc',
  //   meta: { title: '外部页面', icon: 'internet' },
  //   children: [
  //     {
  //       path: 'doc',
  //       name: 'Doc',
  //       component: () => import('@/pages/frame/doc/index.vue'),
  //       meta: { title: '使用文档（内嵌）' },
  //     },
  //     {
  //       path: 'TDesign',
  //       name: 'TDesign',
  //       component: () => import('@/pages/frame/tdesign/index.vue'),
  //       meta: { title: 'TDesign 文档（内嵌）' },
  //     },
  //     {
  //       path: 'https://tdesign.tencent.com/vue-next/getting-started',
  //       name: 'TDesign2',
  //       meta: { title: 'TDesign 文档（外链）' },
  //     },
  //   ],
  // },
  // {
  //   path: '/result',
  //   name: 'result',
  //   component: Layout,
  //   redirect: '/result/success',
  //   meta: { title: '结果页', icon: 'check-circle' },
  //   children: [
  //     {
  //       path: 'success',
  //       name: 'ResultSuccess',
  //       component: () => import('@/pages/result/success/index.vue'),
  //       meta: { title: '成功页' },
  //     },
  //     {
  //       path: 'fail',
  //       name: 'ResultFail',
  //       component: () => import('@/pages/result/fail/index.vue'),
  //       meta: { title: '失败页' },
  //     },
  //     {
  //       path: 'network-error',
  //       name: 'ResultNetworkError',
  //       component: () => import('@/pages/result/network-error/index.vue'),
  //       meta: { title: '网络异常' },
  //     },
  //     {
  //       path: '403',
  //       name: 'Result403',
  //       component: () => import('@/pages/result/403/index.vue'),
  //       meta: { title: '无权限' },
  //     },
  //     {
  //       path: '404',
  //       name: 'Result404',
  //       component: () => import('@/pages/result/404/index.vue'),
  //       meta: { title: '访问页面不存在页' },
  //     },
  //     {
  //       path: '500',
  //       name: 'Result500',
  //       component: () => import('@/pages/result/500/index.vue'),
  //       meta: { title: '服务器出错页' },
  //     },
  //     {
  //       path: 'browser-incompatible',
  //       name: 'ResultBrowserIncompatible',
  //       component: () => import('@/pages/result/browser-incompatible/index.vue'),
  //       meta: { title: '浏览器不兼容页' },
  //     },
  //     {
  //       path: 'maintenance',
  //       name: 'ResultMaintenance',
  //       component: () => import('@/pages/result/maintenance/index.vue'),
  //       meta: { title: '系统维护页' },
  //     },
  //   ],
  // },
];
