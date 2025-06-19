import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    theme: {
      token: {
        colorPrimary: '#FF9494',
        // colorSuccess: '#6DC8A4',
        // colorWarning: '#FFD666',
        // colorError: '#FF7875',
        // colorInfo: '#9270CA',
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'max',
  },
  proxy: {
    '/api': {
      target: 'https://api.yucoder.cn',
      changeOrigin: true,
    },
  },
  routes: [
    {
      path: '/',
      redirect: '/HotList',
    },
    {
      name: '热榜',
      path: '/hotList',
      icon: 'FireOutlined',
      component: './HotList',
    },
    {
      name: '待办',
      path: '/Todo',
      icon: 'CarryOutOutlined',
      component: './Todo',
    },
    {
      name: '权限演示',
      path: '/access',
      icon: 'DeleteOutlined',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      icon: 'DeleteOutlined',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
});
