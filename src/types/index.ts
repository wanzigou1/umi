export interface HotItem {
  title: string;
  followerCount: number;
  url: string;
}

export interface HotList {
  id: string;
  name: string;
  type: string;
  typeName: string;
  iconUrl: string;
  updateTime: string; // ISO 时间字符串
  category: number;
  categoryName: string;
  data: HotItem[];
}

// export type HotListResponse = HotList[];
export type HotListResponse = {
  code?: number;
  data?: HotList[];
  message?: string;
};
