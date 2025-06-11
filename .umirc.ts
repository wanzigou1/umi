import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    theme: {
      token: {
        colorPrimary: '#5B8FF9',
        colorSuccess: '#6DC8A4',
        colorWarning: '#FFD666',
        colorError: '#FF7875',
        colorInfo: '#9270CA',
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
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
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '热榜',
      path: '/hotList',
      component: './HotList',
    },
  ],
  npmClient: 'pnpm',
});
