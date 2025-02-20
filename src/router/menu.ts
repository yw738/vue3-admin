export const Layout = () => import('@/layout/index.vue');
export const menuRoutes: Array<any> = [
  // 公海客户
  {
    path: '/sea',
    component: Layout,
    redirect: '/sea/publicClues',
    meta: {
      title: '公海数据',
      icon: 'security',
      hidden: false,
      alwaysShow: true
    },
    children: [
      {
        path: 'publicClues',
        component: () => import('@/views/customerManage/publicClues/index.vue'),
        name: 'publicClues',
        //roleId: 'crm:clue',
        meta: { title: '公海线索' }
      }
    ]
  },
];
