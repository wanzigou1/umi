import { request } from '@umijs/max';
import type { HotListResponse } from './../types/index';
export const getHotList = () =>
  request<HotListResponse>('/api/hot/list', {
    method: 'POST',
  });
