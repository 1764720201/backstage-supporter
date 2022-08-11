export interface ListInt {
  userId: number;
  id: number;
  title: string;
  introduce: string;
}
interface SelectDataInt {
  title: string;
  introduce: string;
  page: number;
  count: number;
  pageSize: number;
}
export class InitData {
  selectData: SelectDataInt = {
    title: "",
    introduce: "",
    page: 1,
    count: 0,
    pageSize: 5,
  };
  list: ListInt[] = [];
}
